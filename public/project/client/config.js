(function() {
    'use strict';
    angular.module('ThotApp').config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.view.html',
                resolve: {isNotLoggedIn: isNotLoggedIn}
            })
            .when('/login', {
                templateUrl: 'views/login/login.view.html',
                controller: 'LoginController',
                controllerAs: 'loginVm',
                resolve: {isNotLoggedIn: isNotLoggedIn}
            })
            .when('/register', {
                templateUrl: 'views/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'registerVm',
                resolve: {isNotLoggedIn: isNotLoggedIn}
            })
            .when('/profile', {
                templateUrl: 'views/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'profileVm',
                resolve: {loggedIn: isLoggedIn}
            })
            .when('/my_content', {
                templateUrl: 'views/content/myContent.view.html',
                controller: 'MyContentController',
                controllerAs: 'myContentVm',
                resolve: {loggedIn: isLoggedIn}
            })
            .when('/create_content', {
                templateUrl: 'views/content/createContent.view.html',
                controller: 'CreateContentController',
                controllerAs: 'createContentVm',
                resolve: {loggedIn: isLoggedIn}
            })
            .when('/search', {
                templateUrl: 'views/search/search.view.html',
                controller: 'SearchController',
                controllerAs: 'searchVm',
                resolve: {setLoggedInUser: setLoggedInUser}
            })
            .when('/content', {
                templateUrl: 'views/content/detailContent.view.html',
                controller: 'DetailContentController',
                controllerAs: 'detailContentVm',
                resolve: {setLoggedInUser: setLoggedInUser, isContentSet: isContentSet}
            })
            .when('/message/to', {
                templateUrl: 'views/message/toMessage.view.html',
                controller: 'ToMessageController',
                controllerAs: 'toMessageVm',
                resolve: {loggedIn: isLoggedIn}
            })
            .when('/message/from', {
                templateUrl: 'views/message/fromMessage.view.html',
                controller: 'FromMessageController',
                controllerAs: 'fromMessageVm',
                resolve: {loggedIn: isLoggedIn}
            })
            .when('/message/create/:contentId', {
                templateUrl: 'views/message/createMessage.view.html',
                controller: 'CreateMessageController',
                controllerAs: 'createMessageVm',
                resolve: {loggedIn: isLoggedIn}
            })
            .when('/message/detail/:messageId', {
                templateUrl: 'views/message/detailMessage.view.html',
                controller: 'DetailMessageController',
                controllerAs: 'detailMessageVm',
                resolve: {loggedIn: isLoggedIn}
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    function setLoggedInUser($q, $http, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').then(function(response) {
            var user = response.data;
            if (user && user !== '0') {
                $rootScope.user = {
                    'loggedIn': true,
                    'obj': user
                };
            }
            deferred.resolve();
        }, function() {
            deferred.resolve();
        });

        return deferred.promise;
    }

    function isContentSet($location, $rootScope) {
        if (!$rootScope.currentContent) {
            $location.url('/');
        }
    }

    function isLoggedIn($q, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').then(function(response) {
            if (response.data && response.data !== '0') {
                $rootScope.user = {
                    'loggedIn': true,
                    'obj': response.data
                };
                deferred.resolve();
            } else {
                $location.url('/login');
                deferred.reject();
            }
        }, function() {
            $location.url('/login');
            deferred.reject();
        });

        return deferred.promise;
    }

    function isNotLoggedIn($q, $http, $location) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').then(function(response) {
            if (response.data && response.data === '0') {
                deferred.resolve();
            } else {
                $location.url('/my_content');
                deferred.reject();
            }
        }, function() {
            deferred.reject();
        });

        return deferred.promise;
    }
})();
