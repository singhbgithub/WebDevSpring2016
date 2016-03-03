(function() {
    'use strict';
    angular.module('ThotApp').controller('RegisterController', RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        // Must not be logged-in to view this page.
        if (!$rootScope.user.loggedIn) {
            $scope.create = function (newUser) {
                console.log('Attempting to create account for:', newUser);
                if (newUser) {
                    var callback = function (user) {
                        console.log('Account created for:', user);
                        $rootScope.$broadcast('userLoggedIn', {'user': user});
                    };
                    UserService.createUser(newUser, callback);
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