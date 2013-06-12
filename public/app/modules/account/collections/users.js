define([
    'jquery',
    'backbone',
    'modules/account/models/user'
], function ($, Backbone, UserModel) {

    var UsersCollection = Backbone.Collection.extend({
        url: '/api/users',
        model: UserModel
    });

    return UsersCollection;
});
