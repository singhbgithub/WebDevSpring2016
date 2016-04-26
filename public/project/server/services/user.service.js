(function() {
    'use strict';

    var bcrypt = require('bcrypt-nodejs');

    /* Add a node module w/ dependencies */
    module.exports = function (app, model) {
        /* TODO(bobby): apis should have permissions ...*/
        app.post('/api/project/user', createUser);
        app.get('/api/project/user', routeFindUser);
        app.get('/api/project/user/:id', findUserById);
        app.put('/api/project/user/:id', updateUserById);
        app.delete('/api/project/user/:id', deleteUserById);

        /**
         * Creates a user.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function createUser(req, res) {
            var email = req.param('email'),
                phone = req.param('phone'),
                firstName = req.param('firstName'),
                lastName = req.param('lastName'),
                username = req.param('username'),
                password = req.param('password'),
                createUserRequest = {};
            if (email) {
                createUserRequest.email = email;
            }
            if (phone) {
                createUserRequest.phone = phone;
            }
            if (firstName) {
                createUserRequest.firstName = firstName;
            }
            if (lastName) {
                createUserRequest.lastName = lastName;
            }
            if (username) {
                createUserRequest.username = username;
            }
            if (password) {
                createUserRequest.password = bcrypt.hashSync(password);
            }
            model.createUser(createUserRequest)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    // Favor 200 with error object over HTTP error.
                    res.json({'error': err});
                });
        }

        /**
         * Handles the route logic for base user URL.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function routeFindUser(req, res) {
            var username = req.param('username'),
                password = req.param('password');
            if (username) {
                if (password) {
                    findUserByCredentials(username, password, res);
                } else {
                    findUserByUsername(username, res);
                }
            } else {
                findAllUsers(res);
            }
        }

        /**
         * Finds all users.
         * @param {object} res - node response.
         */
        function findAllUsers(res) {
            model.findAllUsers()
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds a user by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findUserById(req, res) {
            model.findUserById(req.params.id)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds a user by username.
         * @param {string} username - username to find.
         * @param {object} res - node response.
         */
        function findUserByUsername(username, res) {
            model.findUserByUsername(username)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds a user by credentials.
         * @param {string} username - username to find.
         * @param {string} password - password to find.
         * @param {object} res - node response.
         */
        function findUserByCredentials(username, password, res) {
            model.findUserByCredentials(username, password)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Updates a user by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function updateUserById(req, res) {
            var email = req.param('email'),
                phone = req.param('phone'),
                firstName = req.param('firstName'),
                lastName = req.param('lastName'),
                password = req.param('password'),
                updateUserByIdRequest = {};
            if (email) {
                updateUserByIdRequest.email = email;
            }
            if (phone) {
                updateUserByIdRequest.phone = phone;
            }
            if (firstName) {
                updateUserByIdRequest.firstName = firstName;
            }
            if (lastName) {
                updateUserByIdRequest.lastName = lastName;
            }
            if (password) {
                updateUserByIdRequest.password = bcrypt.hashSync(password);
            }
            model.updateUserById(req.params.id, updateUserByIdRequest)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Deletes a user by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function deleteUserById(req, res) {
            model.deleteUserById(req.params.id)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }
    };
})();
