(function() {
    'use strict';
    angular.module('FormBuilderApp').factory('FormService', FormService);

    function FormService($q, $http) {

        var service = {
            'createFormForUser': createFormForUser,
            'findAllForms': findAllForms,
            'findAllFormsForUserId': findAllFormsForUserId,
            'findFormById': findFormById,
            'findFormByTitle': findFormByTitle,
            'updateFormById': updateFormById,
            'deleteFormById': deleteFormById
        };

        return service;

        function createFormForUser(userId, form) {
            var deferred = $q.defer();

            $http.post('/api/assignment/user/' + userId + '/form', form)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        function findAllForms() {
            var deferred = $q.defer();

            $http.get('/api/assignment/form')
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        function findAllFormsForUserId(userId) {
            var deferred = $q.defer();

            $http.get('/api/assignment/user/' + userId + '/form')
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        function findFormById(id) {
            var deferred = $q.defer();

            $http.get('/api/assignment/form/' + id)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        function findFormByTitle(title) {
            var deferred = $q.defer(),
                config = {'params': {'username': title}};

            $http.get('/api/assignment/form', config)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        function updateFormById(id, form) {
            var deferred = $q.defer();

            $http.put('/api/assignment/form/' + id, form)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        function deleteFormById(id) {
            var deferred = $q.defer();

            $http.delete('/api/assignment/form/' + id)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };
    }
})();