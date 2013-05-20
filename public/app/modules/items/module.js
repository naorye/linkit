define([
    'lodash',
    'app',

    'modules/items/views/add-item'
], function (_, app, AddItemView) {
    return app.module({
        views: {
            AddItemView: AddItemView
        }
    });
});