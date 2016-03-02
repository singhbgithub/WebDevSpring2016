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
            .otherwise({
                redirectTo: '/'
            });
    });
})();
