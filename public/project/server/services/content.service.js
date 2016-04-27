(function() {
    'use strict';

    var core = require('core-js/library');

    /* Add a node module w/ dependencies */
    module.exports = function (app, model) {
        /* TODO(bobby): apis should have permissions ...*/
        app.post('/api/project/user/:userId/content', createContentForUserId);
        app.get('/api/project/user/:userId/content', findAllContentForUserId);
        app.get('/api/project/content', routeFindContent);
        app.get('/api/project/content/:id', findContentById);
        app.put('/api/project/content/:id', updateContentById);
        app.delete('/api/project/content/:id', ownsContent,  deleteContentById);

        /**
         * Middle-ware to determine if the request is authorized by the content Owner.
         * @param {object} req - node request.
         * @param {object} res - node response.
         * @param {function} next - node next function.
         */
        function ownsContent(req, res, next) {
            var user = req.isAuthenticated() ? req.user : null;
            if (user) {
                model.findContentById(req.params.id)
                    .then(function (content) {
                        if (content.userId === user._id) {
                            next();
                        } else {
                            res.send(403);
                        }
                    }, function () {
                        res.send(500);
                    });
            } else {
                res.send(403);
            }
        }

        /**
         * Creates content.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function createContentForUserId(req, res) {
            var src = req.param('src'),
                tags = core.Array.from(new core.Set(req.param('tags') || [])),
                createContentRequest = {
                    'src': src,
                    // TODO(bobby): really should be supported in the model/schema
                    'tags': tags,
                    'userId': req.params.userId
                };

            // If src is set properly, but isn't doesn't have the right file extensions.
            if (typeof src === 'string' && !src.match(/^((http|https):\/\/).+\.(jpg|jpeg|png)/)) {
                res.json({'error': 'Only .jpg, .jpeg, and .png images through HTTP are supported.'})
            } else {
                model.createContentForUserId(createContentRequest)
                    .then(function (response) {
                        res.json(response);
                    }, function (err) {
                        // Favor 200 with error object over HTTP error.
                        res.json({'error': err});
                    });
            }
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
