// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ['main'],

    paths: {
        // JavaScript folders.
        libs: '../assets/js/libs',
        plugins: '../assets/js/plugins',
        vendor: '../assets/vendor',

        // Libraries.
        jquery: '../assets/js/libs/jquery',
        'jquery-ui': '../assets/js/libs/jquery-ui',
        lodash: '../assets/js/libs/lodash',
        backbone: '../assets/js/libs/backbone'
    },

    // map underscore to lodash
    map: {
        '*': {
            'underscore': 'lodash'
        }
    },

    shim: {
        backbone: {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },
        'jquery-ui': {
            deps: ['jquery'],
            exports: 'jquery'
        },
        'plugins/backbone.layoutmanager': ['backbone'],
        'plugins/backbone.subroute': ['backbone'],
        'plugins/jquery.tag-it': ['jquery', 'jquery-ui']
    }
});