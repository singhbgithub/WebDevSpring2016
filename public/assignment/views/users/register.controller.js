(function(){
    angular.module('FormBuilderApp').controller('RegisterController', RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.create = function(user) {
            if (user) {
                var callback = function(user) {
                    $rootScope.user = user;
                    alert('Account Created');
                };
                UserService.createUser(user, callback);
                $scope.$location = $location.path('/profile');
                UserService.findAllUsers(function(users) {console.log(users);});
            }
            else {
                alert('Enter your information.');
            }
        };
    }
})();