(function() {
    'use strict';
    angular.module('ThotApp').controller('HeaderController', HeaderController);

    function HeaderController($scope, $location, SecurityService) {
        var headerVm = $scope;
        headerVm.logout = logout;

        function logout() {
            SecurityService.logout()
                .then(function () {
                    headerVm.$location = $location.path('/');
                }, function (err) {
                    headerVm.error = err;
                });
        }
    }
})();
