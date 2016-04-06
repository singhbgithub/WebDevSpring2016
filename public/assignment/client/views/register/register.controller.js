(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('RegisterController', RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var registerVm = this;

        // Event Handlers
        registerVm.create = create;

        // Must not be logged-in to view this page.
        if ($rootScope.user.loggedIn) {
            registerVm.$location = $location.path('/profile');
        }

        function create(user) {
            if (user) {
                UserService.createUser(user)
                    .then(function(response) {
                        var responseUser = response[response.length + - 1];
                        console.log('Account Created. User:', responseUser);
                        $rootScope.$broadcast('userLoggedIn', {'user': responseUser});
                    });
                registerVm.$location = $location.path('/profile');
            }
            else {
                window.alert('Enter your information.');
            }
        }
    }
})();