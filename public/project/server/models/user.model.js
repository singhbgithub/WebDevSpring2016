(function() {
    'use strict';

    var q = require('q'), /* Dependencies */
        userMock = require('./user.mock.json');

    /* Add a node module */
    module.exports = function() {

        var model = {
            'createUser': createUser,
            'findUserById': findUserById,
            'findUserByUsername': findUserByUsername,
            'findUserByCredentials': findUserByCredentials,
            'findAllUsers': findAllUsers,
            'updateUserById': updateUserById,
            'deleteUserById': deleteUserById
        };

        return model;

        function createUser(user) {
            var deferred = q.defer();

            setTimeout(function () {
                findUserByUsername(user.username)
                    .then(function (user) {
                        deferred.reject('Account already exists for :' + user.username);
                    }, function () {
                        user._id = new Date().getTime();
                        userMock.push(user);
                        deferred.resolve(user);
                    });
            }, 100);

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = q.defer();

            setTimeout(function () {
                deferred.resolve(userMock);
            }, 100);

            return deferred.promise;
        }

        function findUserById(id) {
            var deferred = q.defer();

            setTimeout(function () {
                var user = null,
                    userId = typeof id === 'string' ? parseInt(id) : id;
                for (var i = 0; i < userMock.length; i++) {
                    var userI = userMock[i];
                    if (userI._id === userId) {
                        user = userI;
                        break;
                    }
                }
                if (user) {
                    deferred.resolve(user);
                } else {
                    deferred.reject(user);
                }
            }, 100);

            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = q.defer();

            setTimeout(function () {
                var user = null;
                for (var i = 0; i < userMock.length; i++) {
                    var userI = userMock[i];
                    if (userI.username === username) {
                        user = userI;
                        break;
                    }
                }
                if (user) {
                    deferred.resolve(user);
                } else {
                    deferred.reject(user);
                }
            }, 100);

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = q.defer();

            setTimeout(function () {
                var user = null;
                for (var i = 0; i < userMock.length; i++) {
                    var userI = userMock[i];
                    if (userI.username === username && userI.password === password) {
                        user = userI;
                        break;
                    }
                }
                if (user) {
                    deferred.resolve(user);
                } else {
                    deferred.reject(user);
                }
            }, 100);

            return deferred.promise;
        }

        function updateUserById(userId, updateUserRequest) {
            var deferred = q.defer();

            setTimeout(function () {
                var updatedUser = null,
                    id = typeof userId === 'string' ? parseInt(userId) : userId;
                for (var i = 0; i < userMock.length; i++) {
                    var currentUser = userMock[i];
                    if (currentUser._id === id) {
                        // FIXME(bobby): not updating all the fields properly b/c this logic will go away w/ mongo
                        if (updateUserRequest.hasOwnProperty('emails')) {
                            currentUser.emails = updateUserRequest.emails;
                        }
                        if (updateUserRequest.hasOwnProperty('phones')) {
                            currentUser.phones = updateUserRequest.phones;
                        }
                        if (updateUserRequest.hasOwnProperty('firstName')) {
                            currentUser.firstName = updateUserRequest.firstName;
                        }
                        if (updateUserRequest.hasOwnProperty('lastName')) {
                            currentUser.lastName = updateUserRequest.lastName;
                        }
                        if (updateUserRequest.hasOwnProperty('password')) {
                            currentUser.password = updateUserRequest.password;
                        }
                        updatedUser = currentUser;
                        break;
                    }
                }
                if (updatedUser) {
                    deferred.resolve(updatedUser);
                } else {
                    deferred.reject('Could not find user with id: ' + userId);
                }
            }, 100);

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = q.defer();

            setTimeout(function () {
                var deletedUser = null,
                    id = typeof userId === 'string' ? parseInt(userId) : userId;
                for (var i = 0; i < userMock.length; i++) {
                    var currentUser = userMock[i];
                    if (currentUser._id === id) {
                        _remove(userMock, i);
                        deletedUser = currentUser;
                        break;
                    }
                }
                if (deletedUser) {
                    deferred.resolve(deletedUser);
                } else {
                    deferred.reject('Could not find user with id: ' + userId);
                }
            }, 100);

            return deferred.promise;
        }

        // Array Remove - By John Resig (MIT Licensed) - put in reusable module TODO(bobby)
        function _remove(arr, from, to) {
            var rest = arr.slice((to || from) + 1 || arr.length);
            arr.length = from < 0 ? arr.length + from : from;
            return arr.push.apply(arr, rest);
        }
    }
})();