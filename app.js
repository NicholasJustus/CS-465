
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var passport = require('passport');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');

// Database connection
require('./app_api/models/db');

// Authentication configuration
require('./app_api/config/passport');

// API routes
var apiRouter = require('./app_api/routes/index');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(
    path.join(__dirname, 'app_server', 'views', 'partials')
);

// CORS configuration
app.use(cors({
    origin: 'http://localhost:4200',
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Passport authentication
app.use(passport.initialize());

// Public website routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', travelRouter);

// API routes
app.use('/api', apiRouter);

// Catch unauthorized JWT errors
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: err.name + ': ' + err.message
        });
    }

    next(err);
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error =
        req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
