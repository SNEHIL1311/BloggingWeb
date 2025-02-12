const express = require('express')
const router = express.Router()
const Article = require('../models/articles')

// router.get("/",(req,res)=>{
//     res.render("view")
// })

router.get('/', async (req, res) => {
    try {
        const data = await Article.find(); 
        console.log(articles)
        const name = req.session.name;
        const email = req.session.email;
        console.log(email,name,+"Hello world !!")
        res.render('view', {name:name,data:data,email:email}); 
    } catch (err) {
        res.status(500).send('Error fetching articles');
    }
});

module.exports = router