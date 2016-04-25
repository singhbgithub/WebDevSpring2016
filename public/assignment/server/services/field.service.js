(function() {
    'use strict';

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
            var createFieldForFormRequest = {
                'label': req.param('label'),
                'type': req.param('type'),
                'placeholder': req.param('placeholder'),
                'options': req.param('options')
            };
            model.createFieldForForm(req.params.formId, createFieldForFormRequest)
                .then(function(field) {
                    res.json(field);
                });
        }

        /**
         * Finds all fields for the given form id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function getFieldsForForm(req, res) {
            model.getFieldsForForm(req.params.formId)
                .then(function(fields) {
                    res.json(fields);
                });
        }

        /**
         * Finds a field for the given form id by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function getFieldForForm(req, res) {
            model.getFieldForForm(req.params.formId, req.params.fieldId)
                .then(function(field) {
                    res.json(field);
                });
        }

        /**
         * Updates a field for a form id by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function updateField(req, res) {
            var label = req.param('label'),
                placeholder = req.param('placeholder'),
                options = req.param('options'),
                updateFieldRequest = {};
            if (label) {
                updateFieldRequest.label = label;
            }
            if (placeholder) {
                updateFieldRequest.placeholder = placeholder;
            }
            if (options) {
                updateFieldRequest.options = options;
            }
            model.updateField(req.params.formId, req.params.fieldId, updateFieldRequest)
                .then(function(field) {
                    res.json(field);
                });
        }

        /**
         * Deletes a field for a given form id by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function deleteFieldFromForm(req, res) {
            model.deleteFieldFromForm(req.params.formId, req.params.fieldId)
                .then(function(field) {
                    res.json(field);
                });
        }
    };
})();
