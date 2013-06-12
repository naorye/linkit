var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

// User Schema
var UserSchema = new Schema({
    name: String,
    email: String,
    username: String,
    provider: String,
    hashed_password: String,
    salt: String,
    facebook: { },
    twitter: { },
    github: { },
    google: { },
    createdAt: { type: Date, 'default': Date.now }
});

// Virtuals
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() { return this._password; });

// Validations
var isPresence = function (value) {
        return value && value.length;
    },
    authTypes = ['github', 'twitter', 'facebook', 'google'],
    isOAuthProvider = function(provider) {
        return authTypes.indexOf(provider) !== -1;
    };


UserSchema.path('name').validate(function (name) {
    //if you are authenticating by any of the oauth strategies, don't validate
    return isOAuthProvider(this.provider) || isPresence(name);
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
    //if you are authenticating by any of the oauth strategies, don't validate
    return isOAuthProvider(this.provider) || isPresence(email);
}, 'Email cannot be blank');

UserSchema.path('username').validate(function (username) {
    // if you are authenticating by any of the oauth strategies, don't validate
    return isOAuthProvider(this.provider) || isPresence(username);
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
    // if you are authenticating by any of the oauth strategies, don't validate
    return isOAuthProvider(this.provider) || isPresence(hashed_password);
}, 'Password cannot be blank');


// Pre-save hook
UserSchema.pre('save', function(next) {
    if (!this.isNew) return next();
console.log(this.provider);
    if (!isPresence(this.password) && !isOAuthProvider(this.provider)) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

//Methods
UserSchema.methods = {

    /**
    * Authenticate - check if the passwords are the same
    *
    * @param {String} plainText
    * @return {Boolean}
    * @api public
    */

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
    * Make salt
    *
    * @return {String}
    * @api public
    */

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
    * Encrypt password
    *
    * @param {String} password
    * @return {String}
    * @api public
    */

    encryptPassword: function(password) {
        if (!password) { return ''; }
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};

mongoose.model('User', UserSchema);