(function() {
    'use strict';
    angular.module('ThotApp').controller('RegisterController', RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        // Must not be logged-in to view this page.
        if (!$rootScope.user.loggedIn) {
            $scope.create = function (newUser) {
                console.log('Attempting to create account for:', newUser);
                if (newUser) {
                    UserService.createUser(newUser).then(function (user) {
                        console.log('Account created for:', user);
                        $rootScope.$broadcast('userLoggedIn', {'user': user});
                        $scope.$location = $location.path('/profile'); 
                    }, function (err) {
                        window.alert('This account is already registered.');                        
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