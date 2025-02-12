const express = require('express')
const router = express.Router()
const Article = require('../models/articles')
router.get("/",async(req,res)=>{
    const name=req.session.name;
        const data = await Article.find();
        res.render("home",{name:name, data: data})
})

module.exports = router