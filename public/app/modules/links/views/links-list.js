define([
    'lodash',
    'backbone',
    'app'
], function(_, Backbone, app) {

    var LinksListView = Backbone.View.extend({
        className: 'links-list-view',
        template: 'links/links-list',

        initialize: function() {

        },
        cleanup: function() {

        },
        beforeRender: function() {
        },
        afterRender: function() {

        }
    });

    return LinksListView;
});