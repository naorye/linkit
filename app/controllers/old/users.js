var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	_ = require('underscore'),
	Controller = require('./base-controller'),
	JsonResponse = require('../json-response');

var UsersController = Controller.extend({
	list: function(req, res) {
		var response = new JsonResponse(res);
		User
			.find({})
			.sort({'createdAt': -1})
			.exec(response.buildResponse);
	},
	create: function(req, res){
		var user = new User(req.body),
			response = new JsonResponse(res);

		user.save(response.buildResponse);
	},
	update: function(req, res){
		var user = req.user,
			response = new JsonResponse(res);

		user = _.extend(user, req.body);
		user.save(response.buildResponse);
	},
	getById: function(req, res) {
		response = new JsonResponse(res);
		response.toResponse(req.user);
	},
	remove: function(req, res) {
		var user = req.user,
			response = new JsonResponse(res);
		user.remove(response.buildResponse);
	}
});

module.exports = UsersController;