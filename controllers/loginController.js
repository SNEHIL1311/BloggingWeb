const express = require('express')
const router = express.Router()
const db = require('../models/db')
const Register = require('../models/register')
const articles = require('../models/articles')

const bcrypt = require('bcrypt')



router.get("/", (req, res) => {
    res.render("login",{msg:""})
})

router.get("/view", async (req, res) => {
    const name = req.session.name;
    const data = await articles.find();
    const id = articles._id;
    const email = req.session.email;
    console.log("abc=" + email)
    res.render("view", { name: name, data: data, email: email, })
})

router.get("/create", (req, res) => {
    const name = req.session.name;

    const email = req.session.email;
    // console.log(email,name)
    res.render("create", { name: name, email: email, msg: "" })
})

router.get("/edit/:id", async(req, res) => {

    const { id } = req.params;
    try {
        const article = await articles.findById(id);
        if (!article) {
            return res.status(404).send('Article not found');
        }

        res.render('edit', {
            title: article.title,
            content: article.content,
            name: article.author,
            email: article.email,
            id:article._id
        });
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).send('Server error');
    }

})

router.post('/edit/edit', async (req, res) => {
    const { id, title, content } = req.body;
    try {
        await articles.updateOne({ _id: id }, { $set: { title, content } });
        //res.status(200).send({ message: 'Article updated successfully' });
        res.redirect("http://localhost:3000/login/view")
    } catch (error) {
        res.status(500).send('Server error');
    }
});


router.get('/delete/:id',async(req,res)=>{
    const { id } = req.params;
    await articles.findByIdAndDelete(id)
    res.redirect("http://localhost:3000/login/view")
})

router.post("/auth", async (req, res) => {
    console.log(req.body)
    try {
        const { email, pass } = req.body;
        req.session.email = email

        const user = await Register.findOne({ email });
        req.session.name = user.name;
        if (!user) {
            // return res.status(401).json({ error: 'Authentication failed' });
            return res.render("login",{msg : "Authentication failed"})
        }
        const passMatch = await bcrypt.compare(pass, user.pass);
        if (!passMatch) {
            // return res.status(401).json({ error: 'Authentication failed' });
            return res.render("login",{msg : "Authentication failed"})
        }

        res.redirect("./view")
    } catch (error) {
        console.log(error)
        // res.status(500).json({ error: 'Login failed' });
        return res.render("login",{msg : "Login failed"})
    }
})



module.exports = router