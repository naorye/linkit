define([
    'lodash',
    'backbone',
    'app'
], function(_, Backbone, app) {

    var ShowItemsView = Backbone.View.extend({
        className: 'show-items-view',
        template: 'items/show-items',

        initialize: function() {

        },
        cleanup: function() {

        },
        beforeRender: function() {
        },
        afterRender: function() {

        }
    });

    return ShowItemsView;
});