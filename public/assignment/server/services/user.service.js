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
                'username': req.param('username') || null,
                'password': req.param('password') || null,
                'email': req.param('email') || null
            };
            model.createUser(createUserRequest)
                .then(function (response) {
                    res.json(response);
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
            var updateUserByIdRequest = {
                'email': req.param('email'),
                'firstName': req.param('firstName'),
                'lastName': req.param('lastName'),
                'password': req.param('password')
            };
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