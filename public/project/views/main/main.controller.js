(function() {
    'use strict';
    angular.module('ThotApp').controller('MainController', MainController);
    function MainController($scope, $location, $rootScope) {
        console.log('Main controller active.');
    }
})();