const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override")
uuidv4();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"@muskangupta",
        content:"i am a webdeveloper"
    },
    {
        id:uuidv4(),
        username:"@ronakgupta",
        content:"i am a webdeveloper"
    },
    {
        id:uuidv4(),
        username:"@rashigupta",
        content:"i am a webdeveloper"
    },
];

app.get("/home",(req,res)=>{
   res.render("layout.ejs",{posts});
});

app.get("/newpost",(req,res)=>{
   res.render("newpost.ejs",{posts});
});

app.post("/home",(req,res)=>{
   let {username,content}=req.body;
   let id=uuidv4();

   posts.push({id,username,content});
   res.redirect("/home")
});

app.get("/show/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);

    console.log(post);
    console.log(id)

   res.render("show.ejs",{post});
});

app.patch("/show/:id",(req,res)=>{
    let{id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);

    post.content=newcontent;
    console.log(post);
    res.redirect("/show")
})

app.get("/show/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);

    res.render("edit.ejs",{post});
})

app.delete("/show/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/home");
})

app.listen(port,(req,res)=>{
    console.log(`listening to port ${port}`);
});