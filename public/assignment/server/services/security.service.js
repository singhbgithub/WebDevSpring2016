(function() {
    'use strict';
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        bcrypt = require('bcrypt-nodejs'),
        passportName = 'assignment';

    module.exports = function(app, model, projectModel) {

        passport.use(passportName, new LocalStrategy(strategy));
        passport.serializeUser(serializeUser);
        passport.deserializeUser(deserializeUser);

        app.post('/api/assignment/login', passport.authenticate(passportName), login);
        app.get('/api/assignment/loggedin', loggedin);
        app.post('/api/assignment/logout', logout);
        app.post('/api/assignment/register', register);

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

        function serializeUser(user, done) {
            done(null, {'id': user._id, 'type': user.type});
        }

        function deserializeUser(sessionData, done) {
            // FIXME(bobby): because of the way the server.js file is setup (2 apps, 1 server), need this logic here.
            if (sessionData.type === 'assignment') {
                model.findUserById(sessionData.id)
                    .then(function(user) {
                        done(null, user);
                    }, function(err) {
                        done(err);
                    });
            } else {
                projectModel.findUserById(sessionData.id)
                    .then(function(user) {
                        done(null, user);
                    }, function(err) {
                        done(err);
                    });
            }
        }
    };
})();
