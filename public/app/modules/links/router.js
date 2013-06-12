define([
    'app',
    'modules/links/module'
], function(app, module) {

    var LinksRouter = Backbone.SubRoute.extend({
        routes: {
            'new': 'addLink',
            'id-:id': 'showLink',
            '*all': 'linksList'
        },
        addLink: function() {
            if (!app.session.isLoggedIn()) {
                return app.router.navigateToLogin();
            }
            var addLink = new module.views.AddLinkView();
            app.layout.setContent(addLink).render();
        },
        showLink: function() {
            if (!app.session.isLoggedIn()) {
                return app.router.navigateToLogin();
            }
            var showLink = new module.views.ShowLinkView();
            app.layout.setContent(showLink).render();
        },
        linksList: function() {
            if (!app.session.isLoggedIn()) {
                return app.router.navigateToLogin();
            }
            var linksList = new module.views.LinksListView();
            app.layout.setContent(linksList).render();
        }
    });

    return LinksRouter;
});