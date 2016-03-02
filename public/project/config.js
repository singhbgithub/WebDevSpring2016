(function() {
    'use strict';
    angular.module('ThotApp').config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.view.html'
                //controller: ''
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})();
