(function(){
    angular.module('FormBuilderApp').controller('ProfileController', ProfileController);

    function ProfileController($scope, $location, $rootScope, UserService) {
        if ($rootScope.user !== null) {
            $scope.user = $rootScope.user;
            $scope.update = function (user) {
                if (user) {
                    var callback = function (user) {
                        $rootScope.user = user;
                        alert('Account Updated');
                    };
                    UserService.updateUser(user, callback);
                    UserService.findAllUsers(function (users) {
                        console.log(users);
                    });
                }
                else {  // This code may not be hittable TODO(bobby)
                    alert('Enter your information.');
                }
            };
        }
        else {
            $scope.$location = $location.path('/register');
        }
    }
})();