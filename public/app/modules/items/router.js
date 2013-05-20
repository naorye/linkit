define([
    'app',
    'modules/items/module'
], function(app, module) {

    var ItemsRouter = Backbone.SubRoute.extend({
        routes: {
            'add': 'addItem',
            'show': 'showItems',
            '': 'showItems'
        },

        login: function() {
            var addItem = new module.views.AddItemView();
            app.layout.setView(addItem).render();
        },
        showItems: function() {

        }
    });

    return ItemsRouter;
});