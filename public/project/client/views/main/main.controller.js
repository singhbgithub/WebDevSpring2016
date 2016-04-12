(function() {
    'use strict';
    angular.module('ThotApp').controller('MainController', MainController);
    function MainController($location, $rootScope) {
        var mainVm = this;
        
        mainVm.$location = $location;
        // Scope Event Handlers
        $rootScope.$on('userLoggedIn', userLoggedIn);
        $rootScope.$on('userLoggedOut', userLoggedOut);
        // Get around the ng-include not updating b/c it does not keep references to prim values; wrap in object.
        $rootScope.user = {'loggedIn': false};

        // Listen for a user login event.
        function userLoggedIn(event, args) {
            // Read from our user service - this does not include current state
            // i.e. login & admin status so we have to add that.
            if (args && args.hasOwnProperty('user')) {
                $rootScope.user = args.user;
            }
            $rootScope.user.loggedIn = true;
            console.log('User logged in: ', $rootScope.user);
            mainVm.$location = $location.path('/profile');
        }

        // Listen for a user logout event.
        function userLoggedOut() {
            console.log('User logged out.');
            $rootScope.user = {'loggedIn': false};
            mainVm.$location = $location.path('/');
        }
    }
})();