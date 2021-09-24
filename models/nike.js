const mongoose = require('mongoose')

const nikeSchema = new mongoose.Schema({
    name: {type:String, required: true},
    description: {type:String, required: true},
    img: String,
    price: {type: Number, required:true},
    quantity:{type: Number, required:true}
})

const Nike = mongoose.model('Nike', nikeSchema)

module.exports = Nike