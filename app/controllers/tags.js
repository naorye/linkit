var mongoose = require('mongoose'),
    Link = mongoose.model('Link');

exports.index = function (req, res) {
    var criteria = { tags: req.param('tag') },
        perPage = 5,
        page = req.param('page') > 0 ? req.param('page') : 0,
        options = {
            perPage: perPage,
            page: page,
            criteria: criteria
        };

    Link.list(options, function(err, links) {
        if (err) {
            return res.render('500');
        }
        Link.count(criteria).exec(function (err, count) {
            res.render('links/index', {
                title: 'List of Links',
                links: links,
                page: page,
                pages: count / perPage
            });
        });
    });
};