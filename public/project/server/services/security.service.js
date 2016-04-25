(function() {
    'use strict';
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        bcrypt = require('bcrypt-nodejs'),
        passportName = 'project';

    module.exports = function(app, model) {

        passport.use(passportName, new LocalStrategy(strategy));
        // FIXME(bobby): because project and assignment are hosted on the same node server (possibly bad practice, but
        // as is required by the course), and passport's single serialize and deserialize function specification, the
        // following lines are commented out and depend on the corresponding assignment security web service's
        // establishment of these functions. Those functions defined in the assignment security web service require
        // hard-coded logic that distinguishes between users for the project and users for the assignment. This is, of
        // course, terrible practice.
        // passport.serializeUser(serializeUser);
        // passport.deserializeUser(deserializeUser);

        app.post('/api/project/login', passport.authenticate(passportName), login);
        app.get('/api/project/loggedin', loggedin);
        app.post('/api/project/logout', logout);
        app.post('/api/project/register', register);

        function strategy(username, password, done) {
            model.findUserByUsername(username)
                .then(function(user) {
                    if (!user) {
                        return done(null, false, {'message': 'User does not exist.'});
                    }
                    if (bcrypt.compareSync(password, user.password)) {
                        delete user.password;
                        return done(null, user);
                    }
                    return done(null, false, {'message': 'Incorrect password.'});
                }, function(err) {
                    return done(null, false, {'message': err});
                });
        }

        function login(req, res) {
            delete req.user.password;
            res.json(req.user);
        }

        function loggedin(req, res) {
            res.send(req.isAuthenticated() ? req.user : '0');
        }

        function logout(req, res) {
            req.logOut();
            res.send(200);
        }

        function register(req, res) {
            var user = req.body;
            user.password = bcrypt.hashSync(user.password);
            model.createUser(user)
                .then(function(createdUser) {
                    req.login(createdUser, function(err) {
                        if (err) {
                            res.json({'error': err});
                        }
                        res.json(req.user);
                    });
                }, function(err) {
                    res.json({'error': err});
                });
        }
    };
})();
