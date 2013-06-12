define([
    'lodash',
    'app',

    'modules/links/views/add-link',
    'modules/links/views/show-link',
    'modules/links/views/links-list'
], function (_, app, AddLinkView, ShowLinkView, LinksListView) {
    return app.module({
        views: {
            AddLinkView: AddLinkView,
            ShowLinkView: ShowLinkView,
            LinksListView: LinksListView
        }
    });
});