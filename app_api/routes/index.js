
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const ctrlTrips = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Verify JWT before allowing protected operations
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authentication token required.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        req.auth = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired authentication token.'
        });
    }
}

// Authentication endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);

// Read trips without requiring login
router.route('/trips')
    .get(ctrlTrips.tripsList)
    .post(authenticateJWT, ctrlTrips.tripsAddTrip);

// Read trips without login; require authentication to modify
router.route('/trips/:tripCode')
    .get(ctrlTrips.tripsFindByCode)
    .put(authenticateJWT, ctrlTrips.tripsUpdateTrip)
    .delete(authenticateJWT, ctrlTrips.tripsDeleteTrip);

module.exports = router;
