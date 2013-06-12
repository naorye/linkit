var async = require('async'),
    fs = require('fs'),
    mime = require('mime');

module.exports = function (app, passport, auth) {

    app.configure('development', function() {

        // Backbone app js files
        app.get('/app/*', function(req, res) {
            res.sendfile('public/app/' + req.params);
        });

        // CSS file
        app.get('/assets/css/*', function(req, res) {
            res.sendfile('public/dist/debug/' + req.params);
        });

        // Assets files
        app.get('/assets/*', function(req, res) {
            res.sendfile('public/assets/' + req.params);
        });

        // favicon.ico
        app.get('/favicon.ico', function(req, res) {
            res.sendfile('public/favicon.ico');
        });
    });

    var apiPrefix = '/api';

    // user routes
    var users = require('../app/controllers/users');
    app.get(apiPrefix + '/login', users.login);
    app.get(apiPrefix + '/signup', users.signup);
    app.get(apiPrefix + '/logout', users.logout);
    app.post(apiPrefix + '/users', users.create);
    app.post(apiPrefix + '/users/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), users.session);
    app.get(apiPrefix + '/users/:userId', users.show);
    app.get('/auth-failure', users.authFailure);
    app.get('/auth-success', users.authSuccess);
    app.get('/facebook/auth', passport.authenticate('facebook', { scope: [ 'email', 'user_about_me', 'publish_actions']}), function(req, res) {
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
    });

    app.get('/facebook/auth/callback', function(req, res, next) {
            if (req.query && !req.query.error && req.query.error_code) {
                req.query.error = true;
            }
            next();
        },
        passport.authenticate('facebook', { failureRedirect: '/auth-failure', successRedirect: '/auth-success', failureFlash: true })
    );




    /*app.get('/facebook/auth/callback', function(req, res, next) {
        console.log('isAuthenticated', req.isAuthenticated());
        if (req.isAuthenticated()) {
            res.redirect('/auth-success');
        } else {
            var errorMessage = (req.query && req.query.error_message) || '';
            res.redirect('/auth-failure/' + encodeURIComponent(errorMessage));
        }
    });*/

    //app.get('/facebook/auth/callback', passport.authenticate('facebook', { failureRedirect: '/auth-failure' }), users.authSuccess);
    /*app.get('/facebook/auth/callback', function (req, res) {
        console.log('sfsdfsdf');
        res.redirect('/auth-failure');
    });*/
    app.get('/github/auth', passport.authenticate('github', { failureRedirect: '/auth-failure' }), users.signin);
    app.get('/github/auth/callback', passport.authenticate('github', { failureRedirect: '/auth-failure' }), users.authSuccess);
    app.get('/twitter/auth', passport.authenticate('twitter', { failureRedirect: '/auth-failure' }), users.signin);
    app.get('/twitter/auth/callback', passport.authenticate('twitter', { failureRedirect: '/auth-failure' }), users.authSuccess);
    app.get('/google/auth', passport.authenticate('google', { failureRedirect: '/auth-failure', scope: 'https://www.google.com/m8/feeds' }), users.signin);
    app.get('/google/auth/callback', passport.authenticate('google', { failureRedirect: '/auth-failure', scope: 'https://www.google.com/m8/feeds' }), users.authSuccess);

    app.param('userId', users.user);

    // link routes
    var links = require('../app/controllers/links');
    app.get(apiPrefix + '/links', links.index);
    app.get(apiPrefix + '/links/new', auth.requiresLogin, links.new);
    app.post(apiPrefix + '/links', auth.requiresLogin, links.create);
    app.get(apiPrefix + '/links/:linkId', links.show);
    app.get(apiPrefix + '/links/:linkId/edit', auth.requiresLogin, auth.link.hasAuthorization, links.edit);
    app.put(apiPrefix + '/links/:linkId', auth.requiresLogin, auth.link.hasAuthorization, links.update);
    app.del(apiPrefix + '/links/:linkId', auth.requiresLogin, auth.link.hasAuthorization, links.destroy);

    app.param('linkId', links.link);

    // tag routes
    var tags = require('../app/controllers/tags');
    app.get('apiPrefix + /tags/:tag', tags.index);

    // home route
    //app.get('/', users.index);
    /*app.get('/*', function(req, res) {
        res.sendfile('public/index.html');
    });*/
    app.get('/*', users.index);
};