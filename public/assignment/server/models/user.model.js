(function() {
    'use strict';

    var q = require('q'); /* Dependencies */

    module.exports = function(mongoose, userSchema) {
        var User = mongoose.model('User', userSchema),
            model = {
            'createUser': createUser,
            'findAllUsers': findAllUsers,
            'findUserById': findUserById,
            'findUserByUsername': findUserByUsername,
            'findUserByCredentials': findUserByCredentials,
            'updateUserById': updateUserById,
            'deleteUserById': deleteUserById
        };

        return model;

        /**
         * Creates a user.
         * @param {object} createUserRequest - the request.
         * @param {string} createUserRequest.username - the new user's username.
         * @param {string} createUserRequest.password - the new user's password.
         * @return {object[] | null} the user collection or null if not created.
         */
        function createUser(createUserRequest) {
            var deferred = q.defer(); // TODO(bobby): this deferral code prob code be abstracted
            User.create(createUserRequest, function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
        }

        /**
         * Finds all users.
         * @return {object[]} the user collection.
         */
        function findAllUsers() {
            var deferred = q.defer();
            User.find({}, function(err, users) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });
            return deferred.promise;
        }

        /**
         * Finds a user by id.
         * @param {string} id - user id.
         * @return {object | null} the desired user or null if not found.
         */
        function findUserById(id) {
            var deferred = q.defer();
            User.findById(id, function(err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
        }

        /**
         * Finds a user by username.
         * @param {string} username - the desired user's username.
         * @return {object | null} the desired user or null if not found.
         */
        function findUserByUsername(username) {
            var deferred = q.defer();
            User.findOne({'username': username}, function(err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
        }

        /**
         * Finds a user by credentials.
         * @param {object} findUserByCredentialsRequest - the request.
         * @param {string} findUserByCredentialsRequest.username - the desired user's username.
         * @param {string} findUserByCredentialsRequest.password - the desired user's password.
         * @return {object | null} the desired user or null if not found.
         */
        function findUserByCredentials(findUserByCredentialsRequest) {
            var deferred = q.defer();
            User.findOne(findUserByCredentialsRequest, function(err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
        }

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
        function updateUserById(id, updateUserByIdRequest) {
            var deferred = q.defer();
            User.findByIdAndUpdate(id, updateUserByIdRequest, function(err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
        }

        /**
         * Deletes a user by id.
         * @param {string} id - user id.
         * @return {object | null} the deleted user or null if not found.
         */
        function deleteUserById(id) {
            var deferred = q.defer();
            User.findByIdAndRemove(id, function(err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
        }
    };
})();
