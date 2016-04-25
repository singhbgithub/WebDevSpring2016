(function() {
    'use strict';

    var q = require('q'); /* Dependencies */

    /* Add a node module */
    module.exports = function(mongoose, userSchema) {
        var User = mongoose.model('User-Project', userSchema),
        model = {
            'createUser': createUser,
            'findUserById': findUserById,
            'findUserByUsername': findUserByUsername,
            'findUserByCredentials': findUserByCredentials,
            'findAllUsers': findAllUsers,
            'updateUserById': updateUserById,
            'deleteUserById': deleteUserById
        };

        return model;

        function createUser(createUserRequest) {
            var deferred = q.defer();
            User.create(createUserRequest, function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else if (!user) {
                    deferred.reject('User creation experienced unknown failure!');
                } else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = q.defer();
            User.find({}, function(err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });
            return deferred.promise;
        }

        function findUserById(id) {
            var deferred = q.defer();
            User.findById(id, function(err, user) {
                if (err) {
                    deferred.reject(err);
                } else if (!user) {
                    deferred.reject('No user with id ' + id + ' found.');
                } else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = q.defer();
            User.findOne({'username': username}, function(err, user) {
                if (err) {
                    deferred.reject(err);
                } else if (!user) {
                    deferred.reject('User ' + username + ' not found.');
                } else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = q.defer();
            User.findOne({'username': username, 'password': password}, function(err, user) {
                if (err) {
                    deferred.reject(err);
                } else if (!user) {
                    deferred.reject('User ' + username + ' not found with specified credentials.');
                } else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
        }

        function updateUserById(id, updateUserByIdRequest) {
            var deferred = q.defer();
            User.findByIdAndUpdate(id, updateUserByIdRequest, function(err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    User.findById(id, function (err, user) {
                        if (err) {
                            deferred.reject(err);
                        } else if (!user) {
                            deferred.reject('No updated user with id ' + id + ' found.');
                        } else {
                            deferred.resolve(user);
                        }
                    });
                }
            });
            return deferred.promise;
        }

        function deleteUserById(id) {
            var deferred = q.defer();
            User.findByIdAndRemove(id, function(err, user) {
                if (err) {
                    deferred.reject(err);
                } else if (!user) {
                    deferred.reject('No user with id ' + id + ' found for deletion.');
                } else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
        }
    };
})();
