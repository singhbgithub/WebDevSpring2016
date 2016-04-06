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