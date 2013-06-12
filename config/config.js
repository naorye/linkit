var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	notifier = {
		APN: false,
		email: false, // true
		actions: ['comment'],
		tplPath: path.normalize(__dirname + '/../app/mailer/templates'),
		postmarkKey: 'POSTMARK_KEY',
		parseAppId: 'PARSE_APP_ID',
		parseApiKey: 'PARSE_MASTER_KEY'
    };


module.exports = {
	development: {
		db: 'mongodb://localhost/linkit',
		root: rootPath,
		notifier: notifier,
		app: {
			name: 'linkit'
		},
		facebook: {
			clientID: "468182209922625",
			clientSecret: "4a4be02e7994058c08b3d3be10b583b6",
			callbackURL: "http://localhost:3000/facebook/auth/callback"
		},
		twitter: {
			clientID: "CONSUMER_KEY",
			clientSecret: "CONSUMER_SECRET",
			callbackURL: "http://localhost:3000/auth/twitter/auth/callback"
		},
		github: {
			clientID: 'APP_ID',
			clientSecret: 'APP_SECRET',
			callbackURL: 'http://localhost:3000/auth/github/auth/callback'
		},
		google: {
			clientID: "APP_ID",
			clientSecret: "APP_SECRET",
			callbackURL: "http://localhost:3000/auth/google/auth/callback"
		}
	},
	staging: {

	},
	production: {

	}
};