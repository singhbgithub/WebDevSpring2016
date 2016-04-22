(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('ProfileController', ProfileController);

    function ProfileController($rootScope, UserService) {
        var profileVm = this;

        // Event Handlers
        profileVm.update = update;

        function update(updatedUser) {
            if (updatedUser) {
                // Add a new email to the user's history of emails.
                updatedUser.emails = angular.copy($rootScope.user.obj.emails);
                if (updatedUser.email) {
                    updatedUser.emails.push(updatedUser.email);
                    delete updatedUser.email;
                }
                // Add a new phone to the user's history of phones.
                updatedUser.phones = angular.copy($rootScope.user.obj.phones);
                if (updatedUser.phone) {
                    updatedUser.phones.push(updatedUser.phone);
                    delete updatedUser.phone;
                }
                UserService.updateUser($rootScope.user.obj._id, updatedUser)
                    .then(function (user) {
                        $rootScope.user.obj = user;
                        console.log('Account Updated. User: ', response);
                    }, function (err) {
                        profileVm.error = err;
                    });
            }
            else {  // This code may not be hittable TODO(bobby)
                window.alert('Enter your information.');
            }
        }
    }
})();