(function() {
    'use strict';
    angular.module('FormBuilderApp').factory('FormService', FormService);

    function FormService($q, $http) {

        var service = {};

        service.createFormForUser = function(userId, form) {
            var deferred = $q.defer();

            $http.post('/api/assignment/user/' + userId + '/form', form)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.findAllForms = function() {
            var deferred = $q.defer();

            $http.get('/api/assignment/form')
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.findAllFormsForUserId = function(userId) {
            var deferred = $q.defer();

            $http.get('/api/assignment/user/' + userId + '/form')
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.findFormById = function(id) {
            var deferred = $q.defer();

            $http.get('/api/assignment/form/' + id)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.findFormByTitle = function(title) {
            var deferred = $q.defer(),
                config = {'params': {'username': title}};

            $http.get('/api/assignment/form', config)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.updateFormById = function(id, form) {
            var deferred = $q.defer();

            $http.put('/api/assignment/form/' + id, form)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.deleteFormById = function(id) {
            var deferred = $q.defer();

            $http.delete('/api/assignment/form/' + id)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        return service;
    }
})();