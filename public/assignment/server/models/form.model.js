(function() {
    'use strict';

    var q = require('q'); /* Dependencies */

    /* Add a node module w/out dependencies */
    module.exports = function(mongoose, fieldSchema, formSchema) {

        var Field = mongoose.model('Field', fieldSchema),
            Form = mongoose.model('Form', formSchema),
            model = {
                'createForm': createForm,
                'findAllForms': findAllForms,
                'findAllFormsForUserId': findAllFormsForUserId,
                'findFormById': findFormById,
                'findFormByTitle': findFormByTitle,
                'updateFormById': updateFormById,
                'deleteFormById': deleteFormById
            };

        /**
         * Creates a form.
         * @param {object} createFormRequest - the request.
         * @param {string} createFormRequest.title - the new form's title.
         * @param {string} createFormRequest.userId - the new form's user id.
         * @return {object[] | null} the form collection or null if not created.
         */
        function createForm(createFormRequest) {
            var deferred = q.defer();  // TODO(bobby): this deferral code prob code be abstracted
            Form.create(createFormRequest, function(err, form) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
            return deferred.promise;
        }

        /**
         * Finds all forms.
         * @return {object[]} the form collection.
         */
        function findAllForms() {
            var deferred = q.defer();
            Form.find({}, function(err, forms) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(forms);
                }
            });
            return deferred.promise;
        }

        /**
         * Finds all forms for the given user id.
         * @param {string} userId - the user's id.
         * @return {object[]} the forms.
         */
        function findAllFormsForUserId(userId) {
            var deferred = q.defer();
            Form.find({'userId': userId}, function(err, forms) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(forms);
                }
            });
            return deferred.promise;
        }

        /**
         * Finds a form by id.
         * @param {string} id - form id.
         * @return {object | null} the desired form or null if not found.
         */
        function findFormById(id) {
            var deferred = q.defer();
            Form.findById(id, function(err, form) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
            return deferred.promise;
        }

        /**
         * Finds a form by title.
         * @param {string} title - the desired form's title.
         * @return {object | null} the desired form or null if not found.
         */
        function findFormByTitle(title) {
            var deferred = q.defer();
            Form.findOne({'title': title}, function(err, form) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
            return deferred.promise;
        }

        /**
         * Updates a form by id.
         * @param {string} id - form id.
         * @param {object} updateFormByIdRequest - the request.
         * @param {string} updateFormByIdRequest.title - the desired form's title.
         * @param {object[]} updateFormByIdRequest.fields - the desired form's fields.
         * @return {object | null} the updated form or null if not found.
         */
        function updateFormById(id, updateFormByIdRequest) {
            var deferred = q.defer();
            Form.findByIdAndUpdate(id, updateFormByIdRequest, function(err, form) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
            return deferred.promise;
        }

        /**
         * Deletes a form by id.
         * @param {string} id - form id.
         * @return {object | null} the deleted form or null if not found.
         */
        function deleteFormById(id) {
            var deferred = q.defer();
            Form.findByIdAndRemove(id, function(err, form) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
            return deferred.promise;
        }

        return model;
    };
})();
