var Utils = require('../utils'),
    _ = require('underscore');

var Controller = function() {
};
_.extend(Controller.prototype, {
    // Method to override
    initialize: function() {
    }
});

Controller.extend = function(methods) {
    return Utils.extend(Controller, methods);
};

module.exports = Controller;