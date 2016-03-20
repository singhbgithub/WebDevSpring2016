(function() {
    'use strict';
    angular.module('FormBuilderApp').factory('UserService', UserService);

    function UserService($q, $http) {

        var service = {};

        service.createUser = function(user) {
            var deferred = $q.defer();

            $http.post('/api/assignment/user', user)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.findAllUsers = function() {
            var deferred = $q.defer();

            $http.get('/api/assignment/user')
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.findUserById = function(id) {
            var deferred = $q.defer();

            $http.get('/api/assignment/user/' + id)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.findUserByUsername = function(username) {
            var deferred = $q.defer(),
                config = {'params': {'username': username}};

            $http.get('/api/assignment/user', config)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.findUserByCredentials = function(username, password) {
            var deferred = $q.defer(),
                config = {'params': {'username': username, 'password': password}};

            $http.get('/api/assignment/user/', config)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.updateUser = function(id, user) {
            var deferred = $q.defer();

            $http.put('/api/assignment/user/' + id, user)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.deleteUserById = function(id) {
            var deferred = $q.defer();

            $http.delete('/api/assignment/user/' + id)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        return service;
    }
})();