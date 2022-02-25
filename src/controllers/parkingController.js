const Parking = require('../models/parking');

exports.allParkings = async (req,res) => {

    try {
        const parkings = Parking.find({providerID : req.body.providerId})
        res.status(200).send(parkings)

    } catch (err) {
        res.status(500).send(err)
    }

}

exports.addParking = async (req,res) => {

    const parking = new Parking(req.body)
    try {
        await parking.save()
        res.status(201).send(parking)

    } catch (err) {
        res.status(400).send(err)
    }
}