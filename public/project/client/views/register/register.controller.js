(function() {
    'use strict';
    angular.module('ThotApp').controller('RegisterController', RegisterController);

    function RegisterController($location, $rootScope, SecurityService) {
        var registerVm = this;

        // Scope Event Handlers
        registerVm.create = create;

        function create(user) {
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
