define([
    'lodash',
    'app',

    'modules/items/views/add-item',
    'modules/items/views/show-items'
], function (_, app, AddItemView, ShowItemsView) {
    return app.module({
        views: {
            AddItemView: AddItemView,
            ShowItemsView: ShowItemsView
        }
    });
});