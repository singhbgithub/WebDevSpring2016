(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('HeaderController', HeaderController);

    function HeaderController($scope, $rootScope) {
        $scope.logout = function() {  // Strange place to put logout code... FIXME(bobby)
            $rootScope.$broadcast('userLoggedOut');
        };
    }
})();