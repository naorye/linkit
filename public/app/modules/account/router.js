define([
    'app',
    'modules/account/module'
], function(app, module) {

    var AccountRouter = Backbone.SubRoute.extend({
        routes: {
            'login': 'login',
            '': 'login'
        },

        login: function() {
            var login = new module.views.LoginView();
            app.layout.setView(login).render();
        }
    });

    return AccountRouter;
});