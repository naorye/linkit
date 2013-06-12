define([
    'app',
    'modules/account/router',
    'modules/links/router',
    'common/layout-view'
], function(app, AccountRouter, LinksRouter, LayoutView) {

    var Router = Backbone.Router.extend({
        routes: {
        },
        subrouters: {
            'account/': AccountRouter,
            'links/': LinksRouter
        },
        constructor: function (options) {
            this.route('*all', 'indexRoute', this.index);

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
            var layout = new LayoutView();
            app.useLayout(layout).render();
        },
        index: function() {
            if (!app.session.isLoggedIn()) {
                return this.navigateToLogin();
            }
            this.navigateToLinks();
        },

        navigateToLogin: function() {
            this.navigate('account/login', { trigger: true});
        },
        navigateToIndex: function() {
            this.navigate('/', { trigger: true});
        },
        navigateToLinks: function() {
            this.navigate('links/', { trigger: true});
        }
    });

    return Router;
});