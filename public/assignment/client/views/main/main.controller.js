(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('MainController', MainController);

    function MainController($scope, $location, $rootScope) {
        $scope.$location = $location;
        // Get around the ng-include not updating b/c it does not keep references to prim values; wrap in object.
        $rootScope.user = {'loggedIn': false, 'isAdmin': false};
        // Listen for a user login event.
        $scope.$on('userLoggedIn', function(event, args) {
            console.log('user logged in');
            // Read from our user service - this does not include current state
            // i.e. login & admin status
            if (args && args.hasOwnProperty('user')) {
                $rootScope.user = args.user;
                $rootScope.isAdmin = false;
            }
            $rootScope.user.loggedIn = true;
            // Is the user an admin?
            var roles = $rootScope.user.roles;
            if (roles !== null && roles !== undefined && Array.isArray(roles)) {
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i].toLowerCase() === 'admin') {
                        $rootScope.user.isAdmin = true;
                        break;
                    }
                }
            }
            $scope.$location = $location.path('/profile');
        });
        // Listen for a user logout event.
        $scope.$on('userLoggedOut', function() {
            console.log('user logged out');
            // make separate var to hold transient state TODO(bobby)
            $rootScope.user = {'loggedIn': false, 'isAdmin': false};
            $scope.$location = $location.path('/');
        });
    }
})();