define([
    // Libraries.
    'jquery',
    'lodash',
    'backbone',

    'modules/account/models/session',

    'common/event-aggregator',

    // Plugins.
    'plugins/backbone.layoutmanager',
    'plugins/backbone.subroute'
],

function($, _, Backbone, SessionModel, vent) {

    // Provide a global location to place configuration settings and module
    // creation.
    var app = window.app = {
        // The root path to run the application.
        root: '/',
        session: new SessionModel(),
        vent: vent
    };

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    // Configure LayoutManager with Backbone Boilerplate defaults.
    Backbone.LayoutManager.configure({
        // Allow LayoutManager to augment Backbone.View.prototype.
        manage: true,

        prefix: "app/templates/",

        fetch: function(path) {
            // Concatenate the file extension.
            path = path + ".html";

            // If cached, use the compiled template.
            if (JST[path]) {
                return JST[path];
            }

            // Put fetch into `async-mode`.
            var done = this.async();

            // Seek out the template asynchronously.
            $.get(app.root + path, function(contents) {
                done(JST[path] = _.template(contents));
            });
        }
    });

    // Mix Backbone.Events, modules, and layout management into the app object.
    return _.extend(app, {
        // Create a custom object with a nested Views object.
        module: function(additionalProps) {
            return _.extend({ Views: {} }, additionalProps);
        },

        // Helper for using layouts.
        useLayout: function(layout) {
            // Cache the refererence.
            this.layout = layout;
            return this.layout;
        }
    }, Backbone.Events);
});