module.exports = {
	development: {
		root: require('path').normalize(__dirname + '/..'),
		app: {
			name: 'roboboogie.us'
		},
		db: 'mongodb://localhost/linkit'
	},
	staging: {

	},
	production: {

	}
};