(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('RegisterController', RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        // Must not be logged-in to view this page.
        if (!$rootScope.user.loggedIn) {
            $scope.create = function (user) {
                if (user) {
                    UserService.createUser(user)
                        .then(function(response) {
                            var responseUser = response[response.length + - 1];
                            console.log('Account Created. User:', responseUser);
                            $rootScope.$broadcast('userLoggedIn', {'user': responseUser});
                        });
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