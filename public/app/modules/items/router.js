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

        addItem: function() {
            var addItem = new module.views.AddItemView();
            app.layout.setView(addItem).render();
        },
        showItems: function() {
            var showItems = new module.views.ShowItemsView();
            app.layout.setView(showItems).render();
        }
    });

    return ItemsRouter;
});