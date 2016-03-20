(function() {
    'use strict';
    angular.module('FormBuilderApp').factory('FieldService', FieldService);

    function FieldService($q, $http) {

        var service = {};

        service.createFieldForForm = function(formId, field) {
            var deferred = $q.defer();

            $http.post('/api/assignment/form/' + formId + '/field', field)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.getFieldsForForm = function(formId) {
            var deferred = $q.defer();

            $http.get('/api/assignment/form/' + formId + '/field')
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.getFieldForForm = function(formId, fieldId) {
            var deferred = $q.defer();

            $http.get('/api/assignment/form/' + formId + '/field/' + fieldId)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.updateField = function(formId, fieldId, field) {
            var deferred = $q.defer();

            $http.put('/api/assignment/form/' + formId + '/field/' + fieldId, field)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        service.deleteFieldFromForm = function(formId, fieldId) {
            var deferred = $q.defer();

            $http.delete('/api/assignment/form/' + formId + '/field/' + fieldId)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        return service;
    }
})();