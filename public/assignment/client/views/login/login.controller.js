(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('LoginController', LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        // Must not be logged-in to view this page.
        if (!$rootScope.user.loggedIn) {
            $scope.login = function (username, password) {
                var accountDoesNotExist = true;
                if (username && password) {
                    var callback = function (user) {
                        $rootScope.$broadcast('userLoggedIn', {'user': user});
                        accountDoesNotExist = false;
                    };
                    UserService.findUserByCredentials(username, password, callback);
                    if (accountDoesNotExist) {
                        window.alert('No associated account. Please sign up.');
                        $scope.$location = $location.path('/register');
                    }
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