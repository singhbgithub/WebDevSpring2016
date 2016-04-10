(function() {
    'use strict';
    angular.module('ThotApp').factory('UserService', UserService);

    function UserService($q, $http) {

        var service = {
            'createUser': createUser,
            'findAllUsers': findAllUsers,
            'findUserById': findUserById,
            'findUserByUsername': findUserByUsername,
            'findUserByCredentials': findUserByCredentials,
            'updateUser': updateUser,
            'deleteUserById': deleteUserById
        };

        return service;

        function createUser(user) {
            var deferred = $q.defer();

            $http.post('/api/project/user', user)
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();

            $http.get('/api/project/user')
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function findUserById(id) {
            var deferred = $q.defer();

            $http.get('/api/project/user/' + id)
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer(),
                config = {'params': {'username': username}};

            $http.get('/api/project/user', config)
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer(),
                config = {'params': {'username': username, 'password': password}};

            $http.get('/api/project/user/', config)
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function updateUser(id, user) {
            var deferred = $q.defer();

            $http.put('/api/project/user/' + id, user)
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function deleteUserById(id) {
            var deferred = $q.defer();

            $http.delete('/api/project/user/' + id)
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }
    }
})();