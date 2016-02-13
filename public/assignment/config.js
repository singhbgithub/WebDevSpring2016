(function(){
    angular.module('FormBuilderApp').config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html'
            })
            .when('/profile', {
                templateUrl: 'users/profile.view.html'
            })
            .when('/admin', {
                templateUrl: 'users/admin.view.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})();