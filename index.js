const express = require('express')

const app = express();
app.set('view engine','ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}));
const session = require('express-session')
app.use(session({
    secret: "magic",
    saveUninitialized: true,
    resave: true
    //cookie: { maxAge: 600000000 }
}));

const registerController = require('./controllers/registerController')
const loginController = require('./controllers/loginController')
const createController = require('./controllers/createController')
const viewController = require('./controllers/viewController')
const homeController = require('./controllers/homeController')
const editController = require('./controllers/editController')
const aboutController = require('./controllers/aboutController')
const contactController = require('./controllers/contactController')
const logoutController = require('./controllers/logoutController')

app.use("/",homeController)
app.use("/register",registerController)
app.use("/login",loginController)
app.use("/create", createController)
app.use("/view",viewController)
app.use("/edit", editController)
app.use("/about",aboutController)
app.use("/contact",contactController)
app.use("/logout",logoutController)

app.listen(3000, ()=>{
    console.log("Server is Started !!")
})