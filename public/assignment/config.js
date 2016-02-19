(function(){
    angular.module('FormBuilderApp').config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.view.html'
            })
            .when('/admin', {
                templateUrl: 'views/admin/admin.view.html'
            })
            .when('/forms', {
                templateUrl: 'views/forms/forms.view.html'
            })
            .when('/fields', {
                templateUrl: 'views/forms/form-fields.view.html'
            })
            .when('/header', {
                templateUrl: 'views/header/header.view.html'
            })
            .when('/home', {
                templateUrl: 'views/home/home.view.html'
            })
            .when('/sidebar', {
                templateUrl: 'views/sidebar/sidebar.view.html'
            })
            .when('/profile', {
                templateUrl: 'views/users/profile.view.html'
            })
            .when('/login', {
                templateUrl: 'views/users/login.view.html'
            })
            .when('/register', {
                templateUrl: 'views/users/register.view.html',
                controller: 'RegisterController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})();