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
            UserService.createUser(newUser).then(function (user) {
                console.log('Account created for:', user);
                $rootScope.$broadcast('userLoggedIn', {'user': user});
                registerVm.$location = $location.path('/profile');
            }, function (err) {
                if (err.errors) {
                    registerVm.error = err.message + ':';
                    Object.keys(err.errors).forEach(function(errorProperty) {
                        var error = err.errors[errorProperty];
                        if (error.hasOwnProperty('message')) {
                            registerVm.error += ' ' + error.message;
                        } else {
                            console.log('Missing error message for error:', error);
                        }
                    });
                } else if (err.code === 11000) {
                    if (err.errmsg.indexOf('$email') !== -1) {
                        registerVm.error = 'That email is already registered.';
                    } else {
                        registerVm.error = 'That username is already registered.';
                    }
                } else {
                    registerVm.error = 'Unknown Error Occurred.';
                }
                console.log(err);
            });
        }
    }
})();