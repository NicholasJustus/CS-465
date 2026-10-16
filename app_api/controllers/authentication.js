
const passport = require('passport');
const User = require('../models/user');

const register = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'Name, email, and password are required.'
            });
        }

        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'An account with this email already exists.'
            });
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email
        });

        user.setPassword(req.body.password);
        await user.save();

        return res.status(201).json({
            token: user.generateJWT()
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            message: 'Unable to register user.'
        });
    }
};

const login = (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            return next(error);
        }

        if (!user) {
            return res.status(401).json({
                message: info?.message || 'Invalid email or password.'
            });
        }

        return res.status(200).json({
            token: user.generateJWT()
        });
    })(req, res, next);
};

module.exports = {
    register,
    login
};
