(function() {
    'use strict';
    angular.module('ThotApp').controller('MainController', MainController);
    function MainController($scope, $location, $rootScope) {
        $scope.$location = $location;
        // Get around the ng-include not updating b/c it does not keep references to prim values; wrap in object.
        $rootScope.user = {'loggedIn': false};
        // Listen for a user login event.
        $scope.$on('userLoggedIn', function(event, args) {
            // Read from our user service - this does not include current state
            // i.e. login & admin status so we have to add that.
            if (args && args.hasOwnProperty('user')) {
                $rootScope.user = args.user;
            }
            $rootScope.user.loggedIn = true;
            console.log('User logged in: ', $rootScope.user);
            $scope.$location = $location.path('/profile');
        });
        // Listen for a user logout event.
        $scope.$on('userLoggedOut', function() {
            console.log('User logged out.');
            $rootScope.user = {'loggedIn': false};
            $scope.$location = $location.path('/');
        });
    }
})();