(function() {
    'use strict';
    angular.module('ThotApp').controller('LoginController', LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        // Must not be logged-in to view this page.
        if (!$rootScope.user.loggedIn) {
            $scope.login = function (username, password) {
                if (username && password) {
                    UserService.findUserByCredentials(username, password)
                        .then(function (user) {
                            $rootScope.$broadcast('userLoggedIn', {'user': user});
                        }, function (err) {
                            // TODO(bobby): add error message in the UI instead of alert.
                            window.alert('No associated account. Please sign up.');
                            $scope.$location = $location.path('/register');
                        });
                }
                else {
                    window.alert('Enter your information.');
                }
            };
        }
        else {
            $scope.$location = $location.path('/profile');
        }
    }
})();