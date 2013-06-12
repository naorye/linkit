var mongoose = require('mongoose'),
    Imager = require('imager'),
    async = require('async'),
    Link = mongoose.model('Link'),
    _ = require('underscore');

// Find link by id
exports.link = function(req, res, next, id){
    //var User = mongoose.model('User')

    Link.load(id, function (err, link) {
        if (err) {
            return next(err);
        }
        if (!link) {
            return next(new Error('Failed to load link ' + id));
        }
        req.link = link;
        next();
    });
};

// New link
exports.new = function(req, res){
    res.render('links/new', {
        title: 'New Link',
        link: new Link({})
    });
};

// Create an link
exports.create = function (req, res) {
    var link = new Link(req.body);
    link.user = req.user;

    link.uploadAndSave(req.files.image, function (err) {
        if (err) {
            res.render('links/new', {
                title: 'New Link',
                link: link,
                errors: err.errors
            });
        } else {
            res.redirect('/links/' + link._id);
        }
    });
};

// Edit an link
exports.edit = function (req, res) {
    res.render('links/edit', {
        title: 'Edit ' + req.link.title,
        link: req.link
    });
};

// Update link
exports.update = function(req, res){
    var link = req.link;
    link = _.extend(link, req.body);

    link.uploadAndSave(req.files.image, function(err) {
        if (err) {
            res.render('links/edit', {
                title: 'Edit Link',
                link: link,
                errors: err.errors
            });
        } else {
            res.redirect('/links/' + link._id);
        }
    });
};

// View an link
exports.show = function(req, res){
    res.render('links/show', {
        title: req.link.title,
        link: req.link
    });
};

// Delete an link
exports.destroy = function(req, res){
    var link = req.link;
    link.remove(function(err){
        // req.flash('notice', 'Deleted successfully')
        res.redirect('/links');
    });
};

// List of Links
exports.index = function(req, res){
    var page = req.param('page') > 0 ? req.param('page') : 0,
        perPage = 15,
        options = {
            perPage: perPage,
            page: page
        };

    Link.list(options, function(err, links) {
        if (err) {
            return res.render('500');
        }
        Link.count().exec(function (err, count) {
            res.render('links/index', {
                title: 'List of Links',
                links: links,
                page: page,
                pages: count / perPage
            });
        });
    });
};