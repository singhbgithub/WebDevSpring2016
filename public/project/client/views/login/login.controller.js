(function() {
    'use strict';
    angular.module('ThotApp').controller('LoginController', LoginController);

    function LoginController($location, $rootScope, UserService) {
        var loginVm = this;

        // Scope Event Handlers
        loginVm.login = login;

        // Must not be logged-in to view this page.
        if ($rootScope.user.loggedIn) {
            loginVm.$location = $location.path('/profile');
        }

        function login(username, password) {
            if (username && password) {
                UserService.findUserByCredentials(username, password)
                    .then(function (user) {
                        $rootScope.$broadcast('userLoggedIn', {'user': user});
                    }, function (err) {
                        // TODO(bobby): add error message in the UI instead of alert.
                        window.alert('No associated account. Please sign up.');
                        loginVm.$location = $location.path('/register');
                    });
            }
            else {
                window.alert('Enter your information.');
            }
        }
    }
})();