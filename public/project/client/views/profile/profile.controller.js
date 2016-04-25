(function() {
    'use strict';
    angular.module('ThotApp').controller('ProfileController', ProfileController);

    function ProfileController($rootScope, UserService) {
        var profileVm = this;

        // Scope Event Handlers
        profileVm.update = update;

        function update(updateInfo) {
            // TODO(bobby): handle this check server side?
            if (updateInfo && updateInfo.oldPassword === $rootScope.user.obj.password) {
                if (updateInfo.newPassword && updateInfo.newPassword !== updateInfo.newPassword2) {
                    profileVm.error = 'New passwords do not match.';
                } else {
                    UserService.updateUser($rootScope.user.obj._id, updateInfo)
                        .then(function (user) {
                            $rootScope.user.obj = user;
                            console.log('Account updated: ', user);
                            profileVm.success = 'Account Updated';
                        }, function (err) {
                            if (err.errors) {
                                profileVm.error = err.message + ':';
                                Object.keys(err.errors).forEach(function(errorProperty) {
                                    var error = err.errors[errorProperty];
                                    if (error.hasOwnProperty('message')) {
                                        profileVm.error += ' ' + error.message;
                                    } else {
                                        console.log('Missing error message for error:', error);
                                    }
                                });
                            } else {
                                profileVm.error = 'Could not update user. Unknown error occurred.';
                            }
                            console.log(err);
                        });
                }
            } else {
                profileVm.error = 'Incorrect password. Enter your password to make changes.';
            }
        }
    }
})();
