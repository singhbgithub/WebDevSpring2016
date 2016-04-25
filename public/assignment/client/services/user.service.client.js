(function() {
    'use strict';
    angular.module('FormBuilderApp').factory('UserService', UserService);

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

            $http.post('/api/assignment/user', user)
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

            $http.get('/api/assignment/user')
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function findUserById(id) {
            var deferred = $q.defer();

            $http.get('/api/assignment/user/' + id)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer(),
                config = {'params': {'username': username}};

            $http.get('/api/assignment/user', config)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer(),
                config = {'params': {'username': username, 'password': password}};

            $http.get('/api/assignment/user/', config)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function updateUser(id, user) {
            var deferred = $q.defer();

            $http.put('/api/assignment/user/' + id, user)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function deleteUserById(id) {
            var deferred = $q.defer();

            $http.delete('/api/assignment/user/' + id)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }
    }
})();
