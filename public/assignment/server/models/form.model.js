(function() {
    'use strict';

    var q = require('q'), /* Dependencies */
        uuid = require('node-uuid'),
        util = require('../util.js')(),
        formMock = require('./form.mock.json'); /* Form data source. */

    /* Add a node module w/out dependencies */
    module.exports = function() {
        var model = {
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

            setTimeout(function() {  // TODO(bobby): add DB access here later
                var response = null;
                if (!(createFormRequest.title && createFormRequest.userId)) {
                    deferred.resolve(response);
                } else {
                    findFormByTitle(createFormRequest.title)
                        .then(function(form) {
                            if (!form) {
                                form = {
                                    'title': createFormRequest.title,
                                    'userId': util.isNumeric(createFormRequest.userId)
                                        ? parseInt(createFormRequest.userId)
                                        : createFormRequest.userId,
                                    '_id': uuid.v1(),
                                    'fields': []
                                };
                                formMock.push(form);
                                /* This would prob be better returning the forms for this user
                                 but the requirements for the assignment indicate to return the
                                 underlying collection. Silliness. */
                                response = formMock;
                            }
                            deferred.resolve(response);
                        });
                }
            }, 100);

            return deferred.promise;
        };

        /**
         * Finds all forms.
         * @return {object[]} the form collection.
         */
        function findAllForms() {
            var deferred = q.defer();

            setTimeout(function() {  // TODO(bobby): add DB access here later
                deferred.resolve(formMock);
            }, 100);

            return deferred.promise;
        };

        /**
         * Finds all forms for the given user id.
         * @param {string} userId - the user's id.
         * @return {object[]} the forms.
         */
        function findAllFormsForUserId(userId) {
            var deferred = q.defer();

            setTimeout(function() {  // TODO(bobby): add DB access here later
                var userForms = [];
                userId = util.isNumeric(userId) ? parseInt(userId) : userId;
                for (var i = 0; i < formMock.length; i++) {
                    var form = formMock[i];
                    if (form.userId === userId) {
                        userForms.push(form);
                    }
                }
                deferred.resolve(userForms);
            }, 100);

            return deferred.promise;
        };

        /**
         * TODO(bobby): This prob shouldn't be global doc.
         * @callback findFormByCallbackCallback
         * @param {object} form - form object.
         * @return {Boolean} the form matches the find criteria.
         */
        /**
         * Finds a form by the callback's criteria.
         * @param {findFormByCallbackCallback} callback - determine if this is the desired form.
         * @return {object | null} the desired form or null if not found.
         */
        function findFormByCallback(callback) {
            for (var i = 0; i < formMock.length; i++) {
                var form = formMock[i];
                if (callback(form)) {
                    return form;
                }
            }
            return null;
        }

        /**
         * Finds a form by id.
         * @param {string} id - form id.
         * @return {object | null} the desired form or null if not found.
         */
        function findFormById(id) {
            var deferred = q.defer();

            setTimeout(function() {  // TODO(bobby): add DB access here later
                var form = findFormByCallback(function(form) {
                    return form._id === id;
                });
                deferred.resolve(form);
            }, 100);

            return deferred.promise;
        };

        /**
         * Finds a form by title.
         * @param {string} title - the desired form's title.
         * @return {object | null} the desired form or null if not found.
         */
        function findFormByTitle(title) {
            var deferred = q.defer();

            setTimeout(function() {  // TODO(bobby): add DB access here later
                var form = findFormByCallback(function(form) {
                    return form.title === title;
                });
                deferred.resolve(form);
            }, 100);

            return deferred.promise;
        };

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

            setTimeout(function() {  // TODO(bobby): add DB access here later
                var response = null;
                for (var i = 0; i < formMock.length; i++) { // TODO(bobby): can use the findById?
                    var form = formMock[i];
                    if (form._id === id) {  // TODO(bobby): find the new title to prevent dups
                        if (updateFormByIdRequest.title) {
                            form.title = updateFormByIdRequest.title;
                        }
                        if (updateFormByIdRequest.fields) {
                            form.fields = updateFormByIdRequest.fields;
                        }
                        response = form;
                        break;
                    }
                }
                deferred.resolve(response);
            }, 100);

            return deferred.promise;
        };

        /**
         * Deletes a form by id.
         * @param {string} id - form id.
         * @return {object | null} the deleted form or null if not found.
         */
        function deleteFormById(id) {
            var deferred = q.defer();

            setTimeout(function() {  // TODO(bobby): add DB access here later
                var response = null;
                for (var i = 0; i < formMock.length; i++) {
                    // TODO(bobby): can use findById? need index... or use callback action?
                    var form = formMock[i];
                    if (form._id === id) {
                        util.remove(formMock, i);
                        response = form;
                        break;
                    }
                }
                deferred.resolve(response);
            }, 100);

            return deferred.promise;
        };

        return model;
    };
})();
