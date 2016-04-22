(function() {
    'use strict';

    /* Add a node module w/ dependencies */
    module.exports = function (app, model) {
        /* TODO(bobby): apis should have permissions ...*/
        app.post('/api/assignment/user', createUser);
        app.get('/api/assignment/user', routeFindUser);
        app.get('/api/assignment/user/:id', findUserById);
        app.put('/api/assignment/user/:id', updateUserById);
        app.delete('/api/assignment/user/:id', deleteUserById);
        // Admin API
        app.post("/api/assignment/admin/user", isAdmin, createUser);
        app.get("/api/assignment/admin/user", isAdmin, routeFindUser);
        app.get("/api/assignment/admin/user/:id", isAdmin, findUserById);
        app.put("/api/assignment/admin/user/:id", isAdmin, updateUserById);
        app.delete("/api/assignment/admin/user/:id", isAdmin, deleteUserById);

        /**
         * Middle-ware to determine if the request is authorized by a user with the admin role.
         * @param {object} req - node request.
         * @param {object} res - node response.
         * @param {function} next - node next function.
         */
        function isAdmin(req, res, next) {
            var user = req.isAuthenticated() ? req.user : null;
            if (user && user.roles.indexOf('admin') >= 0) {
                next();
            } else {
                res.send(403);
            }
        }

        /**
         * Handles the route logic for base user URL.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function routeFindUser(req, res) {
            if (req.param('username')) {
                if (req.param('password')) {
                    findUserByCredentials(req, res);
                } else {
                    findUserByUsername(req, res);
                }
            } else {
                findAllUsers(req, res);
            }
        }

        /**
         * Creates a user.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function createUser(req, res) {
            var createUserRequest = {
                'username': req.param('username'),
                'password': req.param('password'),
                'emails': req.param('emails'),
                'phones': req.param('phones')
            };
            model.createUser(createUserRequest)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    // Favor 200 with error object over HTTP error.
                    res.json({'error': err});
                });
        }

        /**
         * Finds all users.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findAllUsers(req, res) {
            model.findAllUsers()
                .then(function (response) {
                    res.json(response);
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
                });
        }

        /**
         * Finds a user by username.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findUserByUsername(req, res) {
            model.findUserByUsername(req.param('username'))
                .then(function (response) {
                    res.json(response);
                });
        }

        /**
         * Finds a user by credentials.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findUserByCredentials(req, res) {
            var findUserByCredentialRequest = {
                'username': req.param('username'),
                'password': req.param('password')
            };
            model.findUserByCredentials(findUserByCredentialRequest)
                .then(function (response) {
                    res.json(response);
                });
        }

        /**
         * Updates a user by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function updateUserById(req, res) {
            var emails = req.param('emails'),
                phones = req.param('phones'),
                firstName = req.param('firstName'),
                lastName = req.param('lastName'),
                password = req.param('password'),
                updateUserByIdRequest = {};
            if (emails) {
                updateUserByIdRequest.emails = emails;
            }
            if (phones) {
                updateUserByIdRequest.phones = phones;
            }
            if (firstName) {
                updateUserByIdRequest.firstName = firstName;
            }
            if (lastName) {
                updateUserByIdRequest.lastName = lastName;
            }
            if (password) {
                updateUserByIdRequest.password = password;
            }
            model.updateUserById(req.params.id, updateUserByIdRequest)
                .then(function (response) {
                    res.json(response);
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
                });
        }
    };
})();