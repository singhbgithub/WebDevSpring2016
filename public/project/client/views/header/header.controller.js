(function() {
    'use strict';
    angular.module('ThotApp').controller('HeaderController', HeaderController);

    function HeaderController($scope, $rootScope) {
        $scope.logout = function() {
            $rootScope.$broadcast('userLoggedOut');
        };
    }
})();
