(function() {
    'use strict';
    angular.module('FormBuilderApp').factory('FieldService', FieldService);

    function FieldService($q, $http) {

        var service = {
            'createFieldForForm': createFieldForForm,
            'getFieldsForForm': getFieldsForForm,
            'getFieldForForm': getFieldForForm,
            'updateField': updateField,
            'deleteFieldFromForm': deleteFieldFromForm
        };

        function createFieldForForm(formId, field) {
            var deferred = $q.defer();

            $http.post('/api/assignment/form/' + formId + '/field', field)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        function getFieldsForForm(formId) {
            var deferred = $q.defer();

            $http.get('/api/assignment/form/' + formId + '/field')
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();

            $http.get('/api/assignment/form/' + formId + '/field/' + fieldId)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        function updateField(formId, fieldId, field) {
            var deferred = $q.defer();

            $http.put('/api/assignment/form/' + formId + '/field/' + fieldId, field)
                .then(function(response) {
                    deferred.resolve(response.data);
                });

            return deferred.promise;
        };

        function deleteFieldFromForm(formId, fieldId) {
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