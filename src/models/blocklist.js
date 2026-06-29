const mongoose = require('mongoose')

const blocklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[  true,"token is required"]
    }
},{timestamps:true})

const blocklistmodel = mongoose.model('blocklist',blocklistSchema)

module.exports = blocklistmodel
