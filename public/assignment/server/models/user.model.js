(function() {
    'use strict';

    var q = require('q'), /* Dependencies */
        util = require('../util.js')(),
        userMock = require('./user.mock.json'); /* User data source. */

    /* Add a node module w/out dependencies */
    module.exports = function() {
        var model = {};

        /**
         * Creates a user.
         * @param {object} createUserRequest - the request.
         * @param {string} createUserRequest.username - the new user's username.
         * @param {string} createUserRequest.password - the new user's password.
         * @return {object[] | null} the user collection or null if not created.
         */
        model.createUser = function(createUserRequest) {
            var deferred = q.defer(); // TODO(bobby): this deferral code prob code be abstracted

            setTimeout(function() {  // TODO(bobby): add DB access here later
                var response = null;
                if (!createUserRequest.username) {
                    deferred.resolve(response);
                } else {
                    model.findUserByUsername(createUserRequest.username)
                        .then(function(user) {
                            if (!user) {
                                user = {  // TODO(bobby): make classes fr
                                    'username': createUserRequest.username,
                                    'password': createUserRequest.password,
                                    'email': createUserRequest.email,
                                    '_id': new Date().getTime()
                                };
                                userMock.push(user);
                                response = userMock;
                            }
                            deferred.resolve(response);
                        });
                }
            }, 100);

            return deferred.promise;
        };

        /**
         * Finds all users.
         * @return {object[]} the user collection.
         */
        model.findAllUsers = function() {
            var deferred = q.defer();

            setTimeout(function() {  // TODO(bobby): add DB access here later
                deferred.resolve(userMock);
            }, 100);

            return deferred.promise;

        };


        /**
         * TODO(bobby): This prob shouldn't be global doc.
         * @callback findUserByCallbackCallback
         * @param {object} user - user object.
         * @return {Boolean} the user matches the find criteria.
         */
        /**
         * Finds a user by the callback's criteria.
         * @param {findUserByCallbackCallback} callback - determine if this is the desired user.
         * @return {object | null} the desired user or null if not found.
         */
        function findUserByCallback(callback) {
            for (var i = 0; i < userMock.length; i++) {
                var user = userMock[i];
                if (callback(user)) {
                    return user;
                }
            }
            return null;
        }

        /**
         * Finds a user by id.
         * @param {string} id - user id.
         * @return {object | null} the desired user or null if not found.
         */
        model.findUserById = function(id) {
            var deferred = q.defer();

            setTimeout(function() {  // TODO(bobby): add DB access here later
                id = util.isNumeric(id) ? parseInt(id) : id;
                var user = findUserByCallback(function(user) {
                    return user._id === id;
                });
                deferred.resolve(user);
            }, 100);

            return deferred.promise;
        };

        /**
         * Finds a user by username.
         * @param {string} username - the desired user's username.
         * @return {object | null} the desired user or null if not found.
         */
        model.findUserByUsername = function(username) {
            var deferred = q.defer();

            setTimeout(function() {  // TODO(bobby): add DB access here later
                var user = findUserByCallback(function(user) {
                    return user.username === username;
                });
                deferred.resolve(user);
            }, 100);

            return deferred.promise;
        };

        /**
         * Finds a user by credentials.
         * @param {object} findUserByCredentialsRequest - the request.
         * @param {string} findUserByCredentialsRequest.username - the desired user's username.
         * @param {string} findUserByCredentialsRequest.password - the desired user's password.
         * @return {object | null} the desired user or null if not found.
         */
        model.findUserByCredentials = function(findUserByCredentialsRequest) {
            var deferred = q.defer();

            setTimeout(function() {  // TODO(bobby): add DB access here later
                var user = findUserByCallback(function(user) {
                    return user.username === findUserByCredentialsRequest.username &&
                        user.password === findUserByCredentialsRequest.password;
                });
                deferred.resolve(user);
            }, 100);

            return deferred.promise;
        };

        /**
         * Updates a user by id.
         * @param {string} id - user id.
         * @param {object} updateUserByIdRequest - the request.
         * @param {string} updateUserByIdRequest.email - the desired user's email.
         * @param {string} updateUserByIdRequest.firstName - the desired user's first name.
         * @param {string} updateUserByIdRequest.lastName - the desired user's last name.
         * @param {string} updateUserByIdRequest.password - the desired user's password.
         * @return {object | null} the updated user or null if not found.
         */
        model.updateUserById = function(id, updateUserByIdRequest) {
            var deferred = q.defer();

            setTimeout(function() {  // TODO(bobby): add DB access here later
                id = util.isNumeric(id) ? parseInt(id) : id;
                var response = null;
                for (var i = 0; i < userMock.length; i++) {
                    var user = userMock[i];
                    if (user._id === id) {
                        if (updateUserByIdRequest.email) {
                            user.email = updateUserByIdRequest.email;
                        }
                        if (updateUserByIdRequest.firstName) {
                            user.firstName = updateUserByIdRequest.firstName;
                        }
                        if (updateUserByIdRequest.lastName) {
                            user.lastName = updateUserByIdRequest.lastName;
                        }
                        if (updateUserByIdRequest.password) {
                            user.password = updateUserByIdRequest.password;
                        }
                        response = user;
                        break;
                    }
                }
                deferred.resolve(response);
            }, 100);

            return deferred.promise;
        };

        /**
         * Deletes a user by id.
         * @param {string} id - user id.
         * @return {object | null} the deleted user or null if not found.
         */
        model.deleteUserById = function(id) {
            var deferred = q.defer();

            setTimeout(function() {  // TODO(bobby): add DB access here later
                id = util.isNumeric(id) ? parseInt(id) : id;
                var response = null;
                for (var i = 0; i < userMock.length; i++) {
                    var user = userMock[i];
                    if (user._id === id) {
                        util.remove(userMock, i);
                        response = user;
                        break;
                    }
                }
                deferred.resolve(response);
            }, 100);

            return deferred.promise;
        };

        return model;
    };
})();
