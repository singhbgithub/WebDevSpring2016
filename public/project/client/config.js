(function() {
    'use strict';
    angular.module('ThotApp').config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.view.html',
                resolve: {isNotLoggedIn: isNotLoggedIn}
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
            .when('/profile', {
                templateUrl: 'views/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'profileVm',
                resolve: {loggedIn: isLoggedIn}
            })
            .when('/search', {
                templateUrl: 'views/search/search.view.html',
                controller: 'SearchController',
                controllerAs: 'searchVm',
                resolve: {setLoggedInUser: setLoggedInUser}
            })
            .when('/content', {
                templateUrl: 'views/content/content.view.html',
                controller: 'ContentController',
                controllerAs: 'contentVm',
                resolve: {setLoggedInUser: setLoggedInUser}
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    function setLoggedInUser($q, $http, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').then(function(response) {
            var user = response.data;
            if (user && user !== '0') {
                $rootScope.user = {
                    'loggedIn': true,
                    'obj': user
                };
            }
            deferred.resolve();
        }, function() {
            deferred.resolve();
        });

        return deferred.promise;
    }

    function isLoggedIn($q, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').then(function(response) {
            if (response.data && response.data !== '0') {
                $rootScope.user = {
                    'loggedIn': true,
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

        $http.get('/api/project/loggedin').then(function(response) {
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
})();
