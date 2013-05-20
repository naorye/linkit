define([
    'lodash',
    'app',

    'modules/account/views/login'
], function (_, app, LoginView) {
    return app.module({
        views: {
            LoginView: LoginView
        }
    });
});