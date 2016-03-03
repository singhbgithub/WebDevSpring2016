(function() {
    'use strict';
    angular.module('ThotApp').controller('RegisterController', RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        // Must not be logged-in to view this page.
        if (!$rootScope.user.loggedIn) {
            $scope.create = function (user) {
                console.log('Attempting to create account for:', user);
                if (user) {
                    var callback = function (user) {
                        $rootScope.$broadcast('userLoggedIn');
                        console.log('Account created for:', user);
                    };
                    UserService.createUser(user, callback);
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