const express = require('express')
const router=express.Router();

const {allParkings, addParking} = require('../controllers/parkingController');

router.get('/parkings/',allParkings);

router.post('/addParking',addParking);

module.exports = router;