(function() {
    'use strict';
    angular.module('FormBuilderApp').config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.view.html'
            })
            .when('/admin', {
                templateUrl: 'views/admin/admin.view.html'
            })
            .when('/forms', {
                templateUrl: 'views/forms/forms.view.html',
                controller: 'FormController',
                controllerAs: 'formVm'
            })
            .when('/form/:formId/fields', {
                templateUrl: 'views/forms/fields.view.html',
                controller: 'FieldController',
                controllerAs: 'fieldVm'
            })
            .when('/home', {
                templateUrl: 'views/home/home.view.html'
            })
            .when('/profile', {
                templateUrl: 'views/profile/profile.view.html',
                controller: 'ProfileController'

            })
            .when('/login', {
                templateUrl: 'views/login/login.view.html',
                controller: 'LoginController'
            })
            .when('/register', {
                templateUrl: 'views/register/register.view.html',
                controller: 'RegisterController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})();