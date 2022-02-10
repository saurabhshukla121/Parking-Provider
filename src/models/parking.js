const mongoose = require('mongoose')

const parkingSchema = new mongoose.Schema({
    providerID : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    pricePerHour : {
        type : String,
        required : true
    },
    carSpace : {
        type : Number
    },
    bikeSpace : {
        type : Number
    },
    startTime : {
        type : String,
        required : true
    },
    endTime : {
        type : String,
        required : true
    }
})

const Parking = mongoose.model('parking',parkingSchema)

module.exports = Parking