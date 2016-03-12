(function() {
    'use strict';
    angular.module('ThotApp').controller('RegisterController', RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        // Must not be logged-in to view this page.
        if (!$rootScope.user.loggedIn) {
            $scope.create = function (newUser) {
                console.log('Attempting to create account for:', newUser);
                if (newUser) {
                    var accountExists = true,
                        callback = function (user) {
                            console.log('Account created for:', user);
                            $rootScope.$broadcast('userLoggedIn', {'user': user});
                            accountExists = false;
                        };
                    UserService.createUser(newUser, callback);
                    if (accountExists) {
                        // FIXME(bobby): the create user call allows for the same username diff password.
                        window.alert('This account is already registered.');
                    }
                    $scope.$location = $location.path('/profile');
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