(function() {
    'use strict';
    angular.module('FormBuilderApp').config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.view.html'
            })
            .when('/admin', {
                templateUrl: 'views/admin/admin.view.html',
                controller: 'AdminController',
                controllerAs: 'adminVm',
                resolve: {isLoggedInAndAdmin: isLoggedInAndAdmin}
            })
            .when('/forms', {
                templateUrl: 'views/forms/forms.view.html',
                controller: 'FormController',
                controllerAs: 'formVm',
                resolve: {loggedIn: isLoggedIn}
            })
            .when('/form/:formId/fields', {
                templateUrl: 'views/forms/fields.view.html',
                controller: 'FieldController',
                controllerAs: 'fieldVm',
                resolve: {loggedIn: isLoggedIn}
            })
            .when('/home', {
                templateUrl: 'views/home/home.view.html'
            })
            .when('/profile', {
                templateUrl: 'views/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'profileVm',
                resolve: {loggedIn: isLoggedIn}
            })
            .when('/login', {
                templateUrl: 'views/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'loginVm',
                resolve: {isNotLoggedIn: isNotLoggedIn}
            })
            .when('/register', {
                templateUrl: 'views/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'registerVm',
                resolve: {isNotLoggedIn: isNotLoggedIn}
            })
            .otherwise({
                redirectTo: '/'
            });
    });

    function isLoggedIn($q, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').then(function(response) {
            if (response.data && response.data !== '0') {
                var user = response.data;
                $rootScope.user = {
                    'loggedIn': true,
                    'isAdmin': user && user.roles.indexOf('admin') >= 0,
                    'obj': response.data
                };
                deferred.resolve();
            } else {
                $location.url('/login');
                deferred.reject();
            }
        }, function() {
            $location.url('/login');
            deferred.reject();
        });

        return deferred.promise;
    }

    function isNotLoggedIn($q, $http, $location) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').then(function(response) {
            if (response.data && response.data === '0') {
                deferred.resolve();
            } else {
                $location.url('/profile');
                deferred.reject();
            }
        }, function() {
            deferred.reject();
        });

        return deferred.promise;
    }

    function isLoggedInAndAdmin($q, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').then(function(response) {
            if (response.data && response.data !== '0') {
                var user = response.data;
                $rootScope.user = {
                    'loggedIn': true,
                    'isAdmin': user && user.roles.indexOf('admin') >= 0,
                    'obj': response.data
                };
                if ($rootScope.user.isAdmin) {
                    deferred.resolve();
                } else {
                    $location.url('/profile');
                    deferred.reject();
                }
            } else {
                $location.url('/login');
                deferred.reject();
            }
        }, function() {
            $location.url('/login');
            deferred.reject();
        });

        return deferred.promise;
    }
})();