const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /api/trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET: /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            code: req.params.tripCode
        });

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST: /api/trips
const tripsAddTrip = async (req, res) => {
    try {
        const trip = new Trip(req.body);
        const savedTrip = await trip.save();

        res.status(201).json(savedTrip);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT: /api/trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTrip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json(updatedTrip);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE: /api/trips/:tripCode
const tripsDeleteTrip = async (req, res) => {
    try {
        const deletedTrip = await Trip.findOneAndDelete({
            code: req.params.tripCode
        });

        if (!deletedTrip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json({
            message: 'Trip deleted successfully',
            trip: deletedTrip
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};