(function(){
    angular.module('FormBuilderApp').controller('LoginController', LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        // Must not be logged-in to view this page.
        if (!$rootScope.user.loggedIn) {
            $scope.login = function (username, password) {
                account_does_not_exist = true;
                if (username && password) {
                    var callback = function (user) {
                        $rootScope.$broadcast('userLoggedIn', {'user': user});
                        account_does_not_exist = false;
                    };
                    UserService.findUserByCredentials(username, password, callback);
                    if (account_does_not_exist) {
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