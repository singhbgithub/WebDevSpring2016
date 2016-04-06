(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('HeaderController', HeaderController);

    function HeaderController($scope, $rootScope) {
        var headerVm = $scope;
        headerVm.logout = function() {
            $rootScope.$broadcast('userLoggedOut');
        };
    }
})();