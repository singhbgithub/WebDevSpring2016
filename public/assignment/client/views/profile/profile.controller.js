(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('ProfileController', ProfileController);

    function ProfileController($location, $rootScope, UserService) {
        var profileVm = this;

        // Event Handlers
        profileVm.update = update;

        // Must be logged in to view this page.
        if (!$rootScope.user.loggedIn) {
            profileVm.$location = $location.path('/register');
        }

        function update(updatedUser) {
            if (updatedUser) {
                // Add a new email to the user's history of emails.
                updatedUser.emails = angular.copy($rootScope.user.emails);
                if (updatedUser.email) {
                    updatedUser.emails.push(updatedUser.email);
                    delete updatedUser.email;
                }
                // Add a new phone to the user's history of phones.
                updatedUser.phones = angular.copy($rootScope.user.phones);
                if (updatedUser.phone) {
                    updatedUser.phones.push(updatedUser.phone);
                    delete updatedUser.phone;
                }
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
        }
    }
})();