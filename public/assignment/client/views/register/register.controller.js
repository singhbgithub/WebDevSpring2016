(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('RegisterController', RegisterController);

    function RegisterController($location, $rootScope, SecurityService) {
        var registerVm = this;

        // Event Handlers
        registerVm.create = create;
        registerVm.error = null;

        function create(user) {
            // We store a list of emails.
            if (user) {
                if (user.email) {
                    user.emails = [user.email];
                    delete user.email;
                }
                // We store a list of phones.
                if (user.phone) {
                    user.phones = [user.phone];
                    delete user.phone;
                }
            }
            SecurityService.register(user)
                .then(function() {
                    if (!$rootScope.user.obj) {
                        registerVm.error = 'Error signing up!';
                    } else {
                        registerVm.$location = $location.path('/profile');
                    }
                }, function (err) {
                    registerVm.error = err;
                });
        }
    }
})();
