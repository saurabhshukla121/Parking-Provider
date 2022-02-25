const User = require("../models/user");
const Slots = require('../models/slots');
const Parking = require('../models/parking');

exports.bookSlot = async (res, req) => {
    try {
        //making, updating and saving slot
        const slot = await Slots.findOne({ _id: req.parkingId, time: req.time });
        if (slot && slot[req.vehicleType] == 0) {
            throw ('All Space FUll');
        }
        if (!slot) {
            const parking = await Parking.findOne({ _id: req.parkingId });
            const slotObject = {
                parkingId: req.parkingId,
                carSpace: parking[carSpace],
                bikeSpace: parking[bikeSpace],
                time: req.time,
            }
            const newSlot = new Slot(slotObject);
            await newSlot.save();
        }
        else {
            slot[req.vehicleType]--;
            await slot.save();
        }

        //saving inside user database
        const user = await User.findById(req.userId);
        const userObject = {
            parkingId: req.parkingId,
            time: req.time,
        }
        user[bookedParking].push_back(userObject);
        await user.save();

        res.status(200).send('Successfully Booked!!');
    }
    catch (e) {
        res.status(401).send();
    }
};

exports.allParkings = async (req,res) => {

    try {
        const user = await User.findById(req.params.userId)

        if(!user){
            res.status(404).send()
        }
        
        res.status(200).send(user.bookedParkings)

    } catch (err) {
        res.status(500).send(err)
    }

}