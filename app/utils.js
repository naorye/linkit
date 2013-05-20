var _ = require('underscore');

module.exports = {
    extend: function(base, methods) {
        var sub = function() {
            base.apply(this, arguments); // Call base class constructor

            // Call sub class initialize method that will act like a constructor
            this.initialize.apply(this, arguments);
        };
        sub.prototype = Object.create(base.prototype);
        _.extend(sub.prototype, methods);
        return sub;
    }
};