const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    }

})

const Provider = mongoose.model('provider',providerSchema)

module.exports = Provider