define([
    'lodash',
    'backbone',
    'app',

    'plugins/jquery.tag-it'
], function(_, Backbone, app) {

    var AddLinkView = Backbone.View.extend({
        className: 'add-link-view',
        template: 'links/add-link',

        initialize: function() {

        },
        cleanup: function() {

        },
        beforeRender: function() {
        },
        afterRender: function() {
            $('.tags').tagit({
                fieldName: 'tags',
                caseSensitive: false,
                allowDuplicates: false,
                allowSpaces: true,
                readOnly: false,
                singleFieldDelimiter: ','
            });
            //this.tagsInput = this.$('input[name=tags]').tagsInput();
        }
    });

    return AddLinkView;
});