const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name: String,
    email: {
        type : String,
        unique : true,
    },
    pass: String,
})

module.exports = mongoose.model('Register', registerSchema);