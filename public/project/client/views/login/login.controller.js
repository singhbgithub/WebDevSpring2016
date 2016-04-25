(function() {
    'use strict';
    angular.module('ThotApp').controller('LoginController', LoginController);

    function LoginController($location, $rootScope, SecurityService) {
        var loginVm = this;

        // Scope Event Handlers
        loginVm.login = login;

        function login(username, password) {
            if (username && password) {
                SecurityService.login(username, password)
                    .then(function() {
                        if (!$rootScope.user.obj) {
                            loginVm.error = 'No associated account. Check your credentials.';
                        }
                        loginVm.$location = $location.path('/profile');
                    }, function (err) {
                        loginVm.error = err;
                    });
            }
            else {
                loginVm.error = 'Enter your username and password.';
            }
        }
    }
})();
