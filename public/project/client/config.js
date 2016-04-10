(function() {
    'use strict';
    angular.module('ThotApp').config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.view.html'
            })
            .when('/login', {
                templateUrl: 'views/users/login.view.html',
                controller: 'LoginController',
                controllerAs: 'loginVm'
            })
            .when('/register', {
                templateUrl: 'views/users/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'registerVm'
            })
            .when('/profile', {
                templateUrl: 'views/users/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'profileVm'
            })
            .when('/search', {
                templateUrl: 'views/users/search.view.html',
                controller: 'SearchController',
                controllerAs: 'searchVm'
            })
            .when('/content', {
                templateUrl: 'views/content/content.view.html',
                controller: 'ContentController',
                controllerAs: 'contentVm'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})();
