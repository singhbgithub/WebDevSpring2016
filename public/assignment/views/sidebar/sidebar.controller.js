(function(){
    angular.module('FormBuilderApp').controller('SidebarController', SidebarController);

    function SidebarController($scope, $location) {
        $scope.$location = $location;

        // if user is logged in show extra links
    }
})();