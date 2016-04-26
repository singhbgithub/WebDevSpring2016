(function() {
    'use strict';
    angular.module('ThotApp').controller('ProfileController', ProfileController);

    function ProfileController($rootScope, UserService, SecurityService) {
        var profileVm = this;

        // Scope Event Handlers
        profileVm.update = update;

        function update(updateInfo) {
            if (updateInfo.newPassword && updateInfo.newPassword !== updateInfo.newPassword2) {
                profileVm.error = 'New passwords do not match.';
            } else {
                SecurityService.validate(updateInfo.oldPassword)
                    .then(function (isValid) {
                        if (isValid) {
                            updateInfo.password = updateInfo.newPassword;
                            delete updateInfo.oldPassword;
                            delete updateInfo.newPassword;
                            delete updateInfo.newPassword2;
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
                                                console.log('Missing error message for error:',
                                                    error);
                                            }
                                        });
                                    } else {
                                        profileVm.error = err.message ||
                                            'Could not update user. Unknown error occurred.';
                                    }
                                    console.log(err);
                                });
                        } else {
                            profileVm.error = 'The current password you entered is invalid.'
                        }
                    }, function (err) {
                        profileVm.error = err;
                    });
            }
        }
    }
})();
