(function() {
    'use strict';

    angular.module('FormBuilderApp').factory('AdminService', AdminService);

    function AdminService($http, $q) {
        
        var service = {
            'createUser': createUser,
            'findAllUsers': findAllUsers,
            'findUserById': findUserById,
            'updateUser': updateUser,
            'deleteUserById': deleteUserById
        };

        return service;

        function createUser(user) {
            var deferred = $q.defer();

            $http.post('/api/assignment/admin/user', user)
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        var err = data.error,
                            errorMessage = '';
                        if (err.errors) {
                            errorMessage = err.message + ':';
                            Object.keys(err.errors).forEach(function(errorProperty) {
                                var error = err.errors[errorProperty];
                                if (error.hasOwnProperty('message')) {
                                    errorMessage += ' ' + error.message;
                                } else {
                                    console.log('Missing error message for error:', error);
                                }
                            });
                        } else if (err.code === 11000) {
                            errorMessage = 'That user already exists.';
                        } else {
                            errorMessage = 'An unknown error occurred during account creation.';
                        }
                        deferred.reject(errorMessage);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();

            $http.get('/api/assignment/admin/user')
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function findUserById(id) {
            var deferred = $q.defer();

            $http.get('/api/assignment/admin/user/' + id)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }
        
        function updateUser(id, user) {
            var deferred = $q.defer();

            $http.put('/api/assignment/admin/user/' + id, user)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }

        function deleteUserById(id) {
            var deferred = $q.defer();

            $http.delete('/api/assignment/admin/user/' + id)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        }
    }
})();