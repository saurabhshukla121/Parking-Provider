const express = require('express')
const router = express.Router();

const { allParkings, addParking } = require('../controllers/parkingController');

router.get('/parking/parkings/', allParkings);

router.post('/parking/addParking', addParking);

module.exports = router;