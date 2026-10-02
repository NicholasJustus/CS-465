const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /api/trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({});

        if (!trips) {
            return res.status(404).json({
                message: 'Trips not found'
            });
        }

        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json(err);
    }
};

// GET: /api/trips/:tripCode
const tripsFindByCode = async (req, res) => {
    try {
        const trips = await Trip.find({
            code: req.params.tripCode
        });

        if (!trips || trips.length === 0) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};