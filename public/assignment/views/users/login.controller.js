(function(){
    angular.module('FormBuilderApp').controller('LoginController', LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        if ($rootScope.user !== null) {  // Already logged in
            $scope.user = $rootScope.user;
            $scope.login = function (username, password) {
                account_exists = false;
                if (username && password) {
                    var callback = function (user) {
                        $rootScope.user = user;
                        account_exists = true;
                    };
                    UserService.findUserByCredentials(username, password, callback);
                    if (account_exists) {
                        $scope.$location = $location.path('/profile');
                    }
                    else {
                        alert('No associated account. Please sign up.');
                        $scope.$location = $location.path('/register');
                    }
                }
                else {
                    alert('Enter your information.');
                }
            };
        }
        else {
            $scope.$location = $location.path('/profile');
        }
    }
})();