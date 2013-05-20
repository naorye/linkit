define([
    'lodash',
    'backbone',
    'app'
], function(_, Backbone, app) {

    var AddItemView = Backbone.View.extend({
        className: 'add-item-view',
        template: 'items/add-item',

        initialize: function() {

        },
        cleanup: function() {

        },
        beforeRender: function() {
        },
        afterRender: function() {

        }
    });

    return AddItemView;
});