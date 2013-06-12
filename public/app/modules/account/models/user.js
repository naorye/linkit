define([
    'jquery',
    'backbone'
], function ($, Backbone) {

    var UserModel = Backbone.Model.extend({
        urlRoot: '/api/users',
        defaults: {
            id: null,
            name: '',
            email: '',
            createdAt: null
        },
        getFirstName: function() {
            var name = this.get('name');
            return (name && name.length > 0) ? name.split(' ')[0] : name;
        },
        getLastName: function() {
            var name = this.get('name'),
                last = '';
            if (name && name.length > 0) {
                var names = name.split(' ');
                if (names.length > 1) {
                   last = names.splice(1).join(' ');
                }
            }
            return last;
        },
        toJSON: function(){
            var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
            json.firstName = this.getFirstName();
            json.lastName = this.getLastName();

            return json;
        }
    });

    return UserModel;
});
