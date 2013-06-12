define([
    'app',
    'modules/account/module'
], function(app, module) {

    var AccountRouter = Backbone.SubRoute.extend({
        routes: {
            'login': 'login',
            '*unknown': 'login'
        },

        login: function() {
            if (app.session.isLoggedIn()) {
                return app.router.navigateToIndex();
            }
            var login = new module.views.LoginView();
            app.layout.setContent(login).render();
        }
    });

    return AccountRouter;
});