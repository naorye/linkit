var mongoose = require('mongoose'),
    User = mongoose.model('User');

function render(page, req, res) {
    var user = null;
    if (req.user) {
        user = req.user.toObject();
        user.isLoggedIn = true;
    }
    res.render(page, { user: user });
}

exports.index = function (req, res) {
    console.log(req.params, req.user);
    render('index', req, res);
};

// Auth callbacks
exports.authSuccess = function (req, res) {
    render('auth-success', req, res);
};

exports.authFailure = function (req, res) {
    console.log('errorrr', req.flash('error'));
    res.render('auth-failure', {
        error: req.query.error_message || 'An error has accured'
    });
};



















exports.signin = function (req, res) {
console.log('signin !! ');
};

// Show login form
exports.login = function (req, res) {
    console.log('login !! ');
    res.render('users/login', {
        title: 'Login',
        message: req.flash('error')
    });
};

// Show sign up form
exports.signup = function (req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

// Logout
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/login');
};

// Session
exports.session = function (req, res) {
    res.redirect('/');
};

// Create user
exports.create = function (req, res) {
    var user = new User(req.body);
    user.provider = 'local';
    user.save(function (err) {
        if (err) {
            return res.render('users/signup', { errors: err.errors, user: user });
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    });
};

// Show profile
exports.show = function (req, res) {
    var user = req.profile;
    res.render('users/show', {
        title: user.name,
        user: user
    });
};

// Find user by id
exports.user = function (req, res, next, id) {
    User
        .findOne({ _id : id })
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('Failed to load User ' + id));
            }
            req.profile = user;
            next();
        });
};