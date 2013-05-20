
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: { type: String, 'default': '', trim: true },
	siteName: { type: String, 'default': '', trim: true },
    url: { type: String, 'default': '', trim: true },
    description: { type: String, 'default': '', trim: true },
    image: { type: Array, 'default': [] },
    tags: { type: Array, 'default': [] },
    createdAt: { type: Date, 'default': Date.now }
});

mongoose.model('Item', ItemSchema);