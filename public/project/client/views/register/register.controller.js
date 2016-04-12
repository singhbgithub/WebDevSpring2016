(function() {
    'use strict';
    angular.module('ThotApp').controller('RegisterController', RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var registerVm = this;

        // Scope Event Handlers
        registerVm.create = create;

        // Must not be logged-in to view this page.
        if ($rootScope.user.loggedIn) {
            registerVm.$location = $location.path('/profile');
        }

        function create(newUser) {
            console.log('Attempting to create account for:', newUser);
            if (newUser) {
                UserService.createUser(newUser).then(function (user) {
                    console.log('Account created for:', user);
                    $rootScope.$broadcast('userLoggedIn', {'user': user});
                    registerVm.$location = $location.path('/profile');
                }, function (err) {
                    window.alert('This account is already registered.');
                });
            }
            else {
                window.alert('Enter your information.');
            }
        }
    }
})();