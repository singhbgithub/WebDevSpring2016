(function() {
    'use strict';
    angular.module('ThotApp').config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.view.html'
            })
            .when('/login', {
                templateUrl: 'views/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'loginVm'
            })
            .when('/register', {
                templateUrl: 'views/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'registerVm'
            })
            .when('/profile', {
                templateUrl: 'views/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'profileVm'
            })
            .when('/search', {
                templateUrl: 'views/search/search.view.html',
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
