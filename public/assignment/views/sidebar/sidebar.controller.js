(function(){
    angular.module('FormBuilderApp').controller('SidebarController', SidebarController);

    function SidebarController($scope, $rootScope) {
        // if user is logged in show extra links
        $scope.loggedIn = $rootScope.user !== null && $rootScope.user !== undefined;
        if ($scope.loggedIn) {
            var isAdmin = false;
            var roles = $rootScope.user.roles !== null && roles !== undefined;
            if (roles) {  // Check if is array. TODO(bobby)
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i].toLowerCase() === 'admin') {
                        isAdmin = true;
                        break;
                    }
                }
            }
            $scopre.isAdmin = isAdmin;
        }
        $scope.sidebarUrl = Math.random();  // prevent ng-include from caching urls
    }
})();