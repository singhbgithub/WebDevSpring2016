(function() {
    'use strict';
    angular.module('FormBuilderApp').factory('SecurityService', SecurityService);

    function SecurityService($http, $q, $rootScope) {

        var service = {
            login: login,
            loggedIn: loggedIn,
            logout: logout,
            register: register
        };

        return service;

        function login(username, password) {
            var deferred = $q.defer();

            $http.post('/api/assignment/login', {'username': username, 'password': password})
                .then(function (response) {
                    var user = response.data;
                    console.log('User login.', user);
                    $rootScope.user = {
                        'loggedIn': true,
                        'isAdmin': user && user.roles.indexOf('admin') >= 0,
                        'obj': user
                    };
                    deferred.resolve();
                }, function () {
                    deferred.reject('There was an error logging in.');
                });

            return deferred.promise;
        }

        function loggedIn() {
            var deferred = $q.defer();

            $http.post('/api/assignment/loggedin')
                .then(function (response) {
                    var isLoggedIn = response.data;
                    console.log('User loggedin?', isLoggedIn);
                    deferred.resolve();
                }, function () {
                    deferred.reject('There was an error in determining login state.');
                });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();

            $http.post('/api/assignment/logout')
                .then(function () {
                    console.log('User logout.');
                    $rootScope.user = {'loggedIn': false, 'isAdmin': false, 'obj': null};
                    deferred.resolve();
                }, function () {
                    deferred.reject('There was an error logging out.');
                });

            return deferred.promise;
        }

        function register(user) {
            var deferred = $q.defer();

            $http.post('/api/assignment/register', user)
                .then(function (response) {
                    var data = response.data;
                    if (data.error) {
                        var err = data.error,
                            errorMessage = '';
                        console.log(err);
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
                        console.log('Account Created. User:', data);
                        $rootScope.user = {
                            'loggedIn': true,
                            'isAdmin': user && user.roles.indexOf('admin') >= 0,
                            'obj': data
                        };
                        deferred.resolve();
                    }
                }, function () {
                    deferred.reject('There was an error registering.');
                });

            return deferred.promise;
        }
    }
})();
