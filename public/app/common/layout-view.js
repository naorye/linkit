define([
    'lodash',
    'backbone',
    'app',
    'modules/account/views/navbar'
], function(_, Backbone, app, NavbarView) {
    var LayoutView = Backbone.View.extend({
        el: '#main',
        template: 'layout',
        setContent: function(view) {
            return this.setView('.content-placeholder', view);
        },
        beforeRender: function() {
            var navbar = new NavbarView();
            this.setView('.navbar-placeholder', navbar);
        }
    });

    return LayoutView;
});