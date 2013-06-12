var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Imager = require('imager'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    imagerConfig = require(config.root + '/config/imager.js');

// Getters
var getTags = function (tags) {
  return tags.join(',');
};

// Setters
var setTags = function (tags) {
  return tags.split(',');
};

// Link Schema
var LinkSchema = new Schema({
    title: { type: String, 'default': '', trim: true },
    siteName: { type: String, 'default': '', trim: true },
    url: { type: String, 'default': '', trim: true },
    description: { type: String, 'default': '', trim: true },
    image: {
        cdnUri: String,
        files: []
    },
    tags: { type: [], get: getTags, set: setTags },
    createdAt: { type: Date, 'default': Date.now },

    user: { type: Schema.ObjectId, ref: 'User' }
});

// Validations
var isPresence = function (value) {
        return value && value.length;
    };

LinkSchema.path('title').validate(function (title) {
    return isPresence(title);
}, 'Title cannot be blank');

LinkSchema.path('url').validate(function (url) {
    return isPresence(url);
}, 'URL cannot be blank');

// Pre-remove hook
LinkSchema.pre('remove', function (next) {
    var imager = new Imager(imagerConfig, 'S3'),
        files = this.image.files;

    // if there are files associated with the link, remove from the cloud too
    imager.remove(files, function (err) {
        if (err) {
            return next(err);
        }
    }, 'link');

  next();
});

// Methods
LinkSchema.methods = {

    /**
    * Save link and upload image
    *
    * @param {Object} images
    * @param {Function} callback
    * @api private
    */

    uploadAndSave: function (images, callback) {
        if (!images || !images.length) {
            return this.save(callback);
        }

        var imager = new Imager(imagerConfig, 'S3'),
            self = this;

        imager.upload(images, function (err, cdnUri, files) {
            if (err) {
                return callback(err);
            }
            if (files.length) {
                self.image = {
                    cdnUri: cdnUri,
                    files: files
                };
            }

            self.save(callback);
        }, 'link');
    }
};

// Statics
LinkSchema.statics = {

    /**
    * Find link by id
    *
    * @param {ObjectId} id
    * @param {Function} callback
    * @api private
    */

    load: function (id, callback) {
        this.findOne({ _id : id })
          .populate('user', 'name email')
          .exec(callback);
    },

    /**
    * List links
    *
    * @param {Object} options
    * @param {Function} callback
    * @api private
    */

    list: function (options, callback) {
        var criteria = options.criteria || {};

        this.find(criteria)
            .populate('user', 'name')
            .sort({'createdAt': -1}) // sort by date
            .limit(options.perPage)
            .skip(options.perPage * options.page)
            .exec(callback);
    }
};

mongoose.model('Link', LinkSchema);