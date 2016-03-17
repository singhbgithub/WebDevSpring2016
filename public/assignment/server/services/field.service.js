(function() {
    'use strict';

    var uuid = require('node-uuid'),
        util = require('../util.js')();
    /* Add a node module w/ dependencies */
    module.exports = function (app, model) {
        /* TODO(bobby): apis should have permissions ...*/
        app.post('/api/assignment/form/:formId/field', createFieldForForm);
        app.get('/api/assignment/form/:formId/field', getFieldsForForm);
        app.get('/api/assignment/form/:formId/field/:fieldId', getFieldForForm);
        app.put('/api/assignment/form/:formId/field/:fieldId', updateField);
        app.delete('/api/assignment/form/:formId/field/:fieldId', deleteFieldFromForm);

        /**
         * Creates a field for a form.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function createFieldForForm(req, res) {
            model.findFormById(req.params.formId)
                .then(function(form) {
                    var field = {},
                        type = req.param('type');
                    /* Minimally a type is required to add a field. */
                    if (form && type) {
                        /* All fields have these properties */
                        field.label = req.param('label') || '';
                        field.type = type;
                        field._id = uuid.v1();
                        /* These are field specific properties */
                        var placeholder = req.param('placeholder') || '',
                            options = req.param('options') || null;
                        if (placeholder) {
                            field.placeholder = placeholder;
                        }
                        if (options) {
                            field.options = options;
                        }
                        // TODO(bobby): with mongo, we actually need to write back, for now
                        // taking advantage of object reference.
                        form.fields.push(field);
                    }
                    res.json(field);
                });
        }

        /**
         * Finds all fields for the given form id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function getFieldsForForm(req, res) {
            model.findFormById(req.params.formId)
                .then(function(form) {
                    res.json(form ? form.fields : []);
                });
        }

        /**
         * Finds a field for the given form id by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function getFieldForForm(req, res) {
            model.findFormById(req.params.formId)
                .then(function(form) {
                    var fieldId = req.params.fieldId,
                        field = {};
                    if (form) {
                        for (var i = 0; i < form.fields.length; i++) {
                            field = form.fields[i];
                            if (field._id === fieldId) {
                                break;
                            }
                        }
                    }
                    res.json(field);
                });
        }

        /**
         * Updates a field for a form id by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function updateField(req, res) { // TODO(bobby): logic repeated here as above function
            model.findFormById(req.params.formId)
                .then(function(form) {
                    var fieldId = req.params.fieldId,
                        field = {};
                    if (form) {
                        for (var i = 0; i < form.fields.length; i++) {
                            field = form.fields[i];
                            if (field._id === fieldId) {
                                // TODO(bobby): with mongo, we actually need to write back, for now
                                // taking advantage of object reference.
                                break;
                            }
                        }
                        var label = req.param('label'),
                            placeholder = req.param('placeholder'),
                            options = req.param('options');
                        if (label) {
                            field.label = label;
                        }
                        if (placeholder) {
                            field.placeholder = placeholder;
                        }
                        if (options) {
                            field.options = options;
                        }
                    }
                    res.json(field);
                });
        }

        /**
         * Deletes a field for a given form id by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function deleteFieldFromForm(req, res) {
            model.findFormById(req.params.formId)
                .then(function (form) {
                    var i,
                        field = {},
                        fieldId = req.params.fieldId;
                    for (i = 0; i < form.fields.length; i++) {
                        field = form.fields[i];
                        if (field._id === fieldId) {
                            break;
                        }
                    }
                    // TODO(bobby): with mongo, we actually need to write back, for now
                    // taking advantage of object reference.
                    if (i !== undefined) {
                        util.remove(form.fields, i);
                    }
                    res.json(field);
                });
        }
    }
})();