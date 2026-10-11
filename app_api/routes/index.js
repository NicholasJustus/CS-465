const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');

// GET all trips
router.route('/trips')
    .get(ctrlTrips.tripsList)
    .post(ctrlTrips.tripsAddTrip);

// GET, UPDATE, or DELETE a trip by code
router.route('/trips/:tripCode')
    .get(ctrlTrips.tripsFindByCode)
    .put(ctrlTrips.tripsUpdateTrip)
    .delete(ctrlTrips.tripsDeleteTrip);

module.exports = router;