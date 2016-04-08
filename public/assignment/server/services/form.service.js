(function() {
    'use strict';

    /* Add a node module w/ dependencies */
    module.exports = function (app, model) {
        /* TODO(bobby): apis should have permissions ...*/
        app.post('/api/assignment/user/:userId/form', createForm);
        app.get('/api/assignment/user/:userId/form', findAllFormsForUserId);
        app.get('/api/assignment/form', routeFindForm);
        app.get('/api/assignment/form/:formId', findFormById);
        app.put('/api/assignment/form/:formId', updateFormById);
        app.delete('/api/assignment/form/:formId', deleteFormById);

        /**
         * Handles the route logic for base form URL.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function routeFindForm(req, res) {
            if (req.param('title')) {
                findFormByTitle(req, res);
            } else {
                findAllForms(req, res);
            }
        }
        
        /**
         * Creates a form.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function createForm(req, res) {
            var createFormRequest = {
                'title': req.param('title'),
                'userId': req.param('userId')
            };
            model.createForm(createFormRequest)
                .then(function (response) {
                    res.json(response);
                });
        }

        /**
         * Finds all forms.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findAllForms(req, res) {
            model.findAllForms()
                .then(function (response) {
                    res.json(response);
                });
        }

        /**
         * Finds all forms for the given user id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findAllFormsForUserId(req, res) {
            model.findAllFormsForUserId(req.param('userId'))
                .then(function (response) {
                    res.json(response);
                });
        }

        /**
         * Finds a form by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findFormById(req, res) {
            model.findFormById(req.params.formId)
                .then(function (response) {
                    res.json(response);
                });
        }

        /**
         * Finds a form by title.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findFormByTitle(req, res) {
            model.findFormByTitle(req.param('title'))
                .then(function (response) {
                    res.json(response);
                });
        }

        /**
         * Updates a form by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function updateFormById(req, res) {
            var updateFormByIdRequest = {
                'title': req.param('title'),
                'fields': req.param('fields'),
                'updated': Date.now()
            };
            model.updateFormById(req.params.formId, updateFormByIdRequest)
                .then(function (response) {
                    res.json(response);
                });
        }

        /**
         * Deletes a form by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function deleteFormById(req, res) {
            model.deleteFormById(req.params.formId)
                .then(function (response) {
                    res.json(response);
                });
        }
    };
})();