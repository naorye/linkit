define([
    'app',
    'modules/account/router',
    'modules/items/router'
], function(app, AccountRouter, ItemsRouter) {

    var Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },
        subrouters: {
            'account/': AccountRouter,
            'items/': ItemsRouter
        },
        constructor: function (options) {
            // init subrouters:
            // each entry in subrouters property converted to an entry in routers property.
            // for example, "account/": AccountRouter converted to:
            // "account/*subroute": function(subroute) {
            //      if no subrouter instance has already declared {
            //          create a new subrouter instance
            //          load again the url fragment so the new subrouter will catch it
            //      }
            //  }
            var subroutersIndex = 0;
            _.each(this.subrouters, function (router, path) {
                if (path) {
                    var separator = ( path.slice(-1) === "/" ) ? "" : "/";
                    this.route(
                        path + separator + "*subroute", // route fragment
                        'Subrouter' + subroutersIndex,  // route name
                        _.bind(function (subroute) {      // callback
                            if (!this.subrouters[path].ins) {
                                this.subrouters[path].ins = new router(path);
                                Backbone.history.loadUrl(path + separator + subroute);
                            }
                        }, this)
                    );
                    ++subroutersIndex;
                }
            }, this);

            // Backbone Router default constructor
            Backbone.Router.prototype.constructor.call(this, options);
        },
        initialize: function() {
            app.useLayout({
                el: '#main'
            }).render();
        },
        index: function() {
            this.navigate('account/login', { trigger: true});
        }
    });

    return Router;
});