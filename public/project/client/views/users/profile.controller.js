(function() {
    'use strict';
    angular.module('ThotApp').controller('ProfileController', ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        // Must be logged in to view this page.
        if ($rootScope.user.loggedIn) {
            $scope.update = function (updateInfo) {
                if (updateInfo) {
                    // TODO(bobby): handle this check server side?
                    if (updateInfo.newPassword === updateInfo.newPassword2 &&
                        updateInfo.oldPassword === $rootScope.password) {
                        UserService.updateUser(newUser._id, {'password': updateInfo.newPassword})
                            .then(function (user) {
                                $rootScope.user = user;
                                console.log(user);
                                window.alert('Account Updated');
                            }, function (err) {
                                window.alert('Account could not be updated.');
                            });
                    }
                    else {
                        window.alert('Passwords do not match.');
                    }
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