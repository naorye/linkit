var mongoose = require('mongoose'),
  Item = mongoose.model('Item'),
  async = require('async');

module.exports = function (app) {

    var ItemsController = require('../app/controllers/items');//,
        //general = require('../app/controllers/general');

    //app.get('/', general.index);


/*
pages:
get: "/" -> index
get: "/item" -> new item
*/

    /* Items api */
    var items = new ItemsController();
    app.get('/api/items', items.list);
    app.post('/api/items', items.create);
    app.get('/api/items/:itemId', items.getById);
    app.put('/api/items/:itemId', items.update);
    app.del('/api/items/:itemId',  items.remove);

    app.param('itemId', function (req, res, next, id) {
        Item
            .findOne({ _id : id })
            .exec(function (err, item) {
                if (err) return next(err);
                if (!item) return next(new Error('Failed to load Item ' + id));
                //req.profile = item;
                req.item = item;
                next();
            });
    });

    app.get('/*', function(req, res) {
        res.sendfile('public/index.html');
    });

  // app.param('id', function(req, res, next, id){
  //   Article
  //     .findOne({ _id : id })
  //     .populate('user', 'name')
  //     .populate('comments')
  //     .exec(function (err, article) {
  //       if (err) return next(err)
  //       if (!article) return next(new Error('Failed to load article ' + id))
  //       req.article = article

  //       var populateComments = function (comment, cb) {
  //         User
  //           .findOne({ _id: comment._user })
  //           .select('name')
  //           .exec(function (err, user) {
  //             if (err) return next(err)
  //             comment.user = user
  //             cb(null, comment)
  //           })
  //       }

  //       if (article.comments.length) {
  //         async.map(req.article.comments, populateComments, function (err, results) {
  //           next(err)
  //         })
  //       }
  //       else
  //         next()
  //     })
  // })
};