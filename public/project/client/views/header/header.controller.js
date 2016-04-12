(function() {
    'use strict';
    angular.module('ThotApp').controller('HeaderController', HeaderController);

    function HeaderController($scope, $rootScope) {
        var headerVm = $scope;
        headerVm.logout = logout;

        function logout() {
            $rootScope.$broadcast('userLoggedOut');
        }
    }
})();
