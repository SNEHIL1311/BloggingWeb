const express = require('express')
const router = express.Router()

const db = require('../models/db')
const Register = require('../models/register')

const bcrypt = require('bcrypt') 

router.get("/",(req,res)=>{
    res.render("register",{msg:""})
})

router.post("/user",async(req,res)=>{
    console.log(req.body)
    try{
        const {name, email, pass} = req.body;
        const hashedPass = await bcrypt.hash(pass,10)
        const register = new Register({name,email, pass: hashedPass})
        await register.save()
        res.render("login",{msg : "Registration Successful"})
        
    }catch (error) {
       res.render("login",{msg : "Registration  failed"})
    }
})

module.exports = router