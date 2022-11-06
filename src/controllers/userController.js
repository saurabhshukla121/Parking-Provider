const User = require("../models/user");
const Slots = require('../models/slots');
const Parking = require('../models/parking');

exports.bookSlot = async (res, req) => {
    try {
        //making, updating and saving slot
        const slot = await Slots.findOne({ _id: req.parkingId, time: req.body.time });
        if (slot && slot[req.body.vehicleType] == 0) {
            throw ('All Space FUll');
        }
        if (!slot) {
            const parking = await Parking.findOne({ _id: req.body.parkingId });
            const slotObject = {
                parkingId: req.parkingId,
                carSpace: parking.carSpace,
                bikeSpace: parking.bikeSpace,
                time: req.body.time,
            }
            const newSlot = new Slot(slotObject);
            await newSlot.save();
        }
        else {
            slot[req.body.vehicleType]--;
            await slot.save();
        }

        //saving inside user database
        const user = await User.findById(req.body.userId);
        const userObject = {
            parkingId: req.body.parkingId,
            time: req.body.time,
        }
        user.bookedParking.push_back(userObject);
        await user.save();

        res.status(200).send('Successfully Booked!!');
    }
    catch (e) {
        res.status(401).send();
    }
};

exports.allParkings = async (req, res) => {

    try {
        const user = await User.findById(req.params.userId)

        if (!user) {
            res.status(404).send()
        }

        res.status(200).send(user.bookedParkings)

    } catch (err) {
        res.status(500).send(err)
    }

}