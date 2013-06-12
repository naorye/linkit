define([
    'jquery',
    'lodash',
    'app',
    'common/event-aggregator'
], function ($, _, app, vent) {

    var facebookAppId = '468182209922625',
        applicationPermissions = ['email', 'user_about_me', 'publish_actions'];

    (function loadFacebookSdk() {
        var fbDeferred = $.Deferred();

        window.fbAsyncInit = function () {
            facebookApi.initialize().done(fbDeferred.resolve);
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbInit = fbDeferred.promise();
    }).call(this);

    // Facebook atomic methods
    var facebookApi = {
        initialize: function() {
            var deferred = $.Deferred();
            window.FB.init({
                appId: facebookAppId,
                frictionlessRequests: true,
                status: true,
                cookie: true
            });
            facebookApi.loginStatus().always(deferred.resolve);
            return deferred.promise();
        },
        loginStatus: function() {
            var deferred = $.Deferred();
            window.FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    // the user is logged in and has authenticated your
                    // app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed
                    // request, and the time the access token 
                    // and signed request each expire
                    //var uid = response.authResponse.userID;
                    //var accessToken = response.authResponse.accessToken;
                    deferred.resolve('connected');
                } else if (response.status === 'not_authorized') {
                    // the user is logged in to Facebook, 
                    // but has not authenticated your app
                    deferred.reject('not_authorized');
                } else {
                    // the user isn't logged in to Facebook.
                    deferred.reject();
                }
            });
            return deferred.promise();
        },/*
        share: function(shareUrl) {
            var deferred = $.Deferred();
            FB.api(
                'me/mediabox_io:share',
                'post',
                {
                    photo_album: shareUrl
                }, function(response) {
                    if (response && response.error) {
                        deferred.reject(response.error);
                    } else {
                        deferred.resolve(response.id);
                    }
                });
            return deferred.promise();
        },
        like: function(likeUrl) {
            var deferred = $.Deferred();
            FB.api(
                'me/og.likes',
                'post',
                {
                    object: likeUrl
                }, function(response) {
                    if (response && response.error) {
                        deferred.reject(response.error);
                    } else {
                        deferred.resolve(response.id);
                    }
                });
            return deferred.promise();
        },*/
        login: function() {
            var deferred = $.Deferred();
            var root = window.location.protocol + '//' + window.location.host,
                url = root + '/facebook/auth',
                height = 650, width = 1000,
                properties =[
                    'width=' + width,
                    'height=' + height,
                    'top=' + ($(window).height() - height) / 2,
                    'left=' + ($(window).width() - width) / 2,
                    'scrollbars=0'
                ];
            var win = window.open(url, '_blank', properties.join(','));
            vent.once('authCallback', function(response) {
                if (!response.success) {
                    deferred.reject();
                } else {
                    deferred.resolve(response.user);
                }
            });
            return deferred.promise();
        }
    };

    var facebookActions = {
        login: _.bind(facebookApi.login, facebookApi)/*,
        share: function(shareUrl) {
            var deferred = $.Deferred();

            facebookActions.ensureLogin()
                .done(function() {
                    facebookApi.share(shareUrl)
                        .done(deferred.resolve)
                        .fail(deferred.reject);
                })
                .fail(deferred.reject);

            return deferred.promise();
        },
        like: function(likeUrl) {
            var deferred = $.Deferred();

            facebookActions.ensureLogin()
                .done(function() {
                    facebookApi.like(likeUrl)
                        .done(deferred.resolve)
                        .fail(deferred.reject);
                })
                .fail(deferred.reject);

            return deferred.promise();
        }*/
    };

    return facebookActions;
});