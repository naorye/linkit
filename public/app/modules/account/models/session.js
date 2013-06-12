define([
    'jquery',
    'backbone',
    'common/event-aggregator'
], function ($, Backbone, vent) {

    var SessionModel = Backbone.Model.extend({
        defaults: {
            isLoggedIn: false,
            user: null
        },
        initialize: function () {
            if (window.user && window.user.isLoggedIn) {
                this.set({
                    user: window.user,
                    isLoggedIn: true
                });
            }

            this.listenTo(vent, 'authCallback', this.authCallback);
        },
        isLoggedIn: function() {
            return this.get('isLoggedIn');
        },
        authCallback: function(response) {
            console.log('session authCallback', response);
            if (response.error) {
                alert(response.error);
            }
            if (!response.success) {
                this.clear();
            } else {
                this.clear({ silent: true });
                this.set({
                    user: response.user,
                    isLoggedIn: true
                });
            }
        }
    });

    return SessionModel;
});
