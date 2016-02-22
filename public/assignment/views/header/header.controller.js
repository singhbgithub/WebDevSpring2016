(function(){
    angular.module('FormBuilderApp').controller('HeaderController', HeaderController);

    function HeaderController($scope, $rootScope) {
        // if user is logged in show extra links
        $scope.loggedIn = $rootScope.user !== null && $rootScope.user !== undefined;
    }
})();