(function() {
    'use strict';
    angular.module('ThotApp').config(function($routeProvider){
        $routeProvider
            .when('/', {
                // TODO(bobby): fix it
                templateUrl: 'index.html',
                //controller: ''
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})();
