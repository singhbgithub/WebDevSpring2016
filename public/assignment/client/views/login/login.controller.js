(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('LoginController', LoginController);

    function LoginController($location, $rootScope, UserService) {
        var loginVm = this;
        // Must not be logged-in to view this page.
        if (!$rootScope.user.loggedIn) {
            loginVm.login = function (username, password) {
                if (username && password) {
                    UserService.findUserByCredentials(username, password)
                        .then(function(user) {
                            if (user) {
                                $rootScope.$broadcast('userLoggedIn', {'user': user});
                            } else {
                                window.alert('No associated account. Please sign up.');
                                loginVm.$location = $location.path('/register');
                            }
                        });
                }
                else {
                    window.alert('Enter your information.');
                }
            };
        }
        else {
            loginVm.$location = $location.path('/profile');
        }
    }
})();