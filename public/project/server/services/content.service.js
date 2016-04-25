(function() {
    'use strict';

    /* Add a node module w/ dependencies */
    module.exports = function (app, model) {
        /* TODO(bobby): apis should have permissions ...*/
        app.post('/api/project/user/:userId/content', createContentForUserId);
        app.get('/api/project/user/:userId/content', findAllContentForUserId);
        app.get('/api/project/content', routeFindContent);
        app.get('/api/project/content/:id', findContentById);
        app.put('/api/project/content/:id', updateContentById);
        app.delete('/api/project/content/:id', deleteContentById);

        /**
         * Creates content.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function createContentForUserId(req, res) {
            var createContentRequest = {
                'src': req.param('src'),
                'tags': req.param('tags'),
                'userId': req.params.userId
            };
            model.createContentForUserId(createContentRequest)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    // Favor 200 with error object over HTTP error.
                    res.json({'error': err});
                });
        }

        /**
         * Handles the route logic for base content URL.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function routeFindContent(req, res) {
            if (req.param('tag')) {
                findContentByTag(req, res);
            } else {
                findAllContent(res);
            }
        }

        /**
         * Finds all content.
         * @param {object} res - node response.
         */
        function findAllContent(res) {
            model.findAllContent()
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds all content for user id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findAllContentForUserId(req, res) {
            model.findAllContentForUserId(req.params.userId)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds content by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findContentById(req, res) {
            model.findContentById(req.params.id)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds a content by tag.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findContentByTag(req, res) {
            model.findContentByTag(req.param('tag'))
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Updates a content by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function updateContentById(req, res) {
            // FIXME(bobby): make an individual endpoint for very specific updates like - addLike, addComment, removeTag
            var likes = req.param('likes'),
                comments = req.param('comments'),
                tags = req.param('tags'),
                updateContentByIdRequest = {};
            if (likes) {
                updateContentByIdRequest.likes = likes;
            }
            if (comments) {
                updateContentByIdRequest.comments = comments;
            }
            if (tags) {
                updateContentByIdRequest.tags = tags;
            }
            model.updateContentById(req.params.id, updateContentByIdRequest)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Deletes a content by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function deleteContentById(req, res) {
            model.deleteContentById(req.params.id)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }
    };
})();
