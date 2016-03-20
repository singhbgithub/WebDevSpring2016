(function() {
    'use strict';
    angular.module('ThotApp').config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.view.html'
            })
            .when('/login', {
                templateUrl: 'views/users/login.view.html',
                controller: 'LoginController'
            })
            .when('/register', {
                templateUrl: 'views/users/register.view.html',
                controller: 'RegisterController'
            })
            .when('/profile', {
                templateUrl: 'views/users/profile.view.html',
                controller: 'ProfileController'
            })
            .when('/search', {
                templateUrl: 'views/users/search.view.html',
                controller: 'SearchController'
            })
            .when('/content', {
                templateUrl: 'views/content/content.view.html',
                controller: 'ContentController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})();
