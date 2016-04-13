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
                        loginVm.error = 'Your credentials could not be validated.';
                        console.log(err);
                    });
            }
            else {
                loginVm.error = 'Enter your username and password.';
            }
        }
    }
})();