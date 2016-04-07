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
                'deleteFormById': deleteFormById,
                // Form Field model APIs
                'createFieldForForm': createFieldForForm,
                'getFieldsForForm': getFieldsForForm,
                'getFieldForForm': getFieldForForm,
                'updateField': updateField,
                'deleteFieldFromForm': deleteFieldFromForm

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

        /* Field model APIs defined below, as they are an embedded document within a form */
        function createFieldForForm(formId, field) {
            var deferred = q.defer();
            // TODO(bobby): don't agree w/ the embedded field document structure. Should be relational.
            Form.findById(formId, function(err, form) {
                if(err) {
                    deferred.reject(err);
                } else {
                    form.fields.push(field);
                    form.save();
                    deferred.resolve(field);
                }
            });
            return deferred.promise;
        }

        function getFieldsForForm(formId) {
            var deferred = q.defer();
            // TODO(bobby): don't agree w/ the embedded field document structure. Should be relational.
            Form.findById(formId, function(err, form) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form.fields);
                }
            });
            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var deferred = q.defer();
            // TODO(bobby): don't agree w/ the embedded field document structure. Should be relational.
            Form.findById(formId, function(err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form.fields.id(fieldId));
                }
            });
            return deferred.promise;
        }

        function updateField(formId, fieldId, field) {
            var deferred = q.defer();
            // TODO(bobby): don't agree w/ the embedded field document structure. Should be relational.
            Form.findOne({'_id': formId, 'fields._id': fieldId}, function(err, form) {
                if(err) {
                    deferred.reject(err);
                } else {
                    var savedField = form.fields.id(fieldId);
                    savedField.label = field.label;
                    savedField.placeholder = field.placeholder;
                    savedField.options = field.options;
                    form.save();
                    deferred.resolve(savedField);
                }
            });
            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId) {
            var deferred = q.defer();
            // TODO(bobby): don't agree w/ the embedded field document structure. Should be relational.
            Form.findById(formId, function(err, form) {
                if(err) {
                    deferred.reject(err);
                } else {
                    var field = form.fields.id(fieldId).remove();
                    form.save();
                    deferred.resolve(field);
                }
            });
            return deferred.promise;
        }

        return model;
    };
})();
