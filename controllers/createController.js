const express = require('express')
const articles = require('../models/articles')
const router = express.Router()

router.get("/",(req,res)=>{
    res.render("create",{email:req.session.email,msg:""})
})

router.get("/view",async(req,res)=>{
    const data = await Article.find(); 
            
            const name = req.session.name;
            const email = req.session.email;
            
            res.render('view', {name:name,data:data,email:email}); 
})

router.post("/new", async(req,res)=>{
    console.log(req.body)
    const {title,content,author,date,email} = req.body;
    const article = new articles({title,content,author,date,email})
    article.save();
    console.log('Article Submitted Sucessfully')
    // alert("Hello! I am an alert box!!");
    const name = req.session.name;
    const email1 = req.session.email;
    res.render("create",{name: name,email:email1, msg : "Article Submitted Sucessfully"})
   
})
module.exports = router