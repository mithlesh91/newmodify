const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:[  true,"required a username"],
        unique:[true,"required a unique username"]
    },
    email:{
        type:String,
        required:[  true,"required an email"],
        unique:[true,"required a unique email"]
    },
    password:{
        type:String,
        select:false,   
    }
})

const usermodel = mongoose.model("user",userSchema)
module.exports = usermodel 