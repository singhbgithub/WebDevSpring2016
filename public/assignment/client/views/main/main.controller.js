(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('MainController', MainController);

    function MainController($location, $rootScope) {
        var mainVm = this;

        // Event Handlers
        $rootScope.$on('userLoggedIn', userLoggedIn);
        $rootScope.$on('userLoggedOut', userLoggedOut);

        // Scope Variables
        mainVm.$location = $location;
        // Get around the ng-include not updating b/c it does not keep references to prim values; wrap in object.
        $rootScope.user = {'loggedIn': false, 'isAdmin': false};

        function userLoggedIn(event, args) {
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
            console.log('Logged In. User: ', $rootScope.user);
            mainVm.$location = $location.path('/profile');
        }

        function userLoggedOut() {
            console.log('user logged out');
            // make separate var to hold transient state TODO(bobby)
            $rootScope.user = {'loggedIn': false, 'isAdmin': false};
            mainVm.$location = $location.path('/');
        }
    }
})();