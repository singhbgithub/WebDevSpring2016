(function(){
    angular.module('FormBuilderApp').controller('HeaderController', HeaderController);

    function HeaderController($scope, $location) {
        $scope.$location = $location;

        // if user is logged in show extra links
    }
})();