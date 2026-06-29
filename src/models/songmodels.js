
const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    songurl: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:['happy','sad','surprise']
    }
})
const songmodel = mongoose.model('songs',songSchema)
module.exports=songmodel