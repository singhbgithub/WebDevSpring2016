(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('ProfileController', ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        // Must be logged in to view this page.
        if ($rootScope.user.loggedIn) {
            $scope.update = function (updatedUser) {
                if (updatedUser) {
                    UserService.updateUser($rootScope.user._id, updatedUser)
                        .then(function(response) {
                            // FIXME(bobby): transient state fields again
                            response.loggedIn = $rootScope.user.loggedIn;
                            response.isAdmin = $rootScope.user.isAdmin;
                            $rootScope.user = response;
                            console.log('Account Updated. User: ', response);
                    });
                }
                else {  // This code may not be hittable TODO(bobby)
                    window.alert('Enter your information.');
                }
            };
        }
        else {
            $scope.$location = $location.path('/register');
        }
    }
})();