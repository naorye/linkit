var mongoose = require('mongoose'),
	Item = mongoose.model('Item'),
	_ = require('underscore'),
	Controller = require('./base-controller'),
	JsonResponse = require('../json-response');

var ItemsController = Controller.extend({
	list: function(req, res) {
		var response = new JsonResponse(res);
		Item
			.find({})
			.sort({'createdAt': -1})
			.exec(response.buildResponse);
	},
	create: function(req, res){
		var item = new Item(req.body),
			response = new JsonResponse(res);

		item.save(response.buildResponse);
	},
	update: function(req, res){
		var item = req.item,
			response = new JsonResponse(res);

		item = _.extend(item, req.body);
		item.save(response.buildResponse);
	},
	getById: function(req, res) {
		response = new JsonResponse(res);
		response.toResponse(req.item);
	},
	remove: function(req, res) {
		var item = req.item,
			response = new JsonResponse(res);
		item.remove(response.buildResponse);
	}
});

module.exports = ItemsController;