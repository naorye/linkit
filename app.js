var express = require('express'),
    fs = require('fs'),
    passport = require('passport');

// Load configurations
var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    auth = require('./config/middlewares/authorization'),
    mongoose = require('mongoose');

mongoose.connect(config.db);

// Require models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file) {
    require(models_path + '/' + file);
});

// Passport configurations
require('./config/passport')(passport, config);

// Create express application
var app = express();


// Express configurations
require('./config/express')(app, config, passport);

// Require routes
require('./config/routes')(app, passport, auth);

// Start application
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port ' + port);

// Expose app
exports = module.exports = app;