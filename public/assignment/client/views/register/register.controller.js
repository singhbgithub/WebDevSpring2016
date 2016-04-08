(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('RegisterController', RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var registerVm = this;

        // Event Handlers
        registerVm.create = create;
        registerVm.error = null;

        // Must not be logged-in to view this page.
        if ($rootScope.user.loggedIn) {
            registerVm.$location = $location.path('/profile');
        }

        function create(user) {
            // We store a list of emails.
            if (user.email) {
                user.emails = [user.email];
                delete user.email;
            }
            UserService.createUser(user)
                .then(function(response) {
                    console.log('Account Created. User:', response);
                    $rootScope.$broadcast('userLoggedIn', {'user': response});
                }, function (err) {
                    if (err.errors) {
                        registerVm.error = err.message + ':';
                        Object.keys(err.errors).forEach(function(errorProperty, index, arr) {
                            var error = err.errors[errorProperty];
                            if (error.hasOwnProperty('message')) {
                                registerVm.error += ' ' + error.message;
                                if (index !== arr.length - 1) {
                                    registerVm.error += '.';
                                }
                            } else {
                                console.log('Missing error message for error:', error);
                            }
                        });
                    } else if (err.code === 11000) {
                        registerVm.error = 'That user already exists.';
                    } else {
                        registerVm.error = 'Unknown Error Occurred.';
                    }
                    console.log(err);
                });
        }
    }
})();