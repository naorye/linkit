define([
    'lodash',
    'backbone',
    'app'
], function(_, Backbone, app) {

    var NavbarView = Backbone.View.extend({
        className: 'navbar-view',
        template: 'account/navbar',
        initialize: function() {

        },
        cleanup: function() {

        },
        afterRender: function() {
        }
    });

    return NavbarView;
});