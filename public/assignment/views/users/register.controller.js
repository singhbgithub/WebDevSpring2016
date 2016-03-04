(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('RegisterController', RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        // Must not be logged-in to view this page.
        if (!$rootScope.user.loggedIn) {
            $scope.create = function (user) {
                if (user) {
                    var callback = function (user) {
                        $rootScope.$broadcast('userLoggedIn');
                        window.alert('Account Created');
                    };
                    UserService.createUser(user, callback);
                    $scope.$location = $location.path('/profile');
                }
                else {
                    window.alert('Enter your information.');
                }
            };
        }
        else {
            $scope.$location = $location.path('/profile');
        }
    }
})();