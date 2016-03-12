(function() {
    'use strict';
    angular.module('ThotApp').controller('ProfileController', ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        // Must be logged in to view this page.
        if ($rootScope.user.loggedIn) {
            $scope.update = function (updateInfo) {
                if (updateInfo) {
                    var callback = function (user) {
                        $rootScope.user = user;
                        window.alert('Account Updated');
                    };
                    debugger;
                    if (updateInfo.newPassword === updateInfo.newPassword2 &&
                        updateInfo.oldPassword === $rootScope.password) {
                        var newUser = Object.clone($rootScope.user);
                        // This should really be handled into the update User function.
                        // FIXME(bobby)
                        newUser.password = updateInfo.newPassword;
                        UserService.updateUser(newUser._id, newUser, callback);
                        UserService.findAllUsers(function (users) {
                            console.log(users);
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