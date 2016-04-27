(function() {
    'use strict';

    /* Add a node module w/ dependencies */
    module.exports = function (app, model) {
        /* TODO(bobby): apis should have permissions ...*/
        app.post('/api/project/user/:userId/content/:contentId/tag', createTag);
        app.get('/api/project/tag', findAllTag);
        app.get('/api/project/user/:userId/tag', findAllTagForUserId);
        app.get('/api/project/content/:contentId/tag', findAllTagForContentId);
        app.get('/api/project/user/:userId/content/:contentId/tag', findTagForUserAndContentId);
        app.get('/api/project/tag/:id', findTagById);
        app.delete('/api/project/tag/:id', ownsTag,  deleteTagById);

        /**
         * Middle-ware to determine if the request is authorized by the tag Owner.
         * @param {object} req - node request.
         * @param {object} res - node response.
         * @param {function} next - node next function.
         */
        function ownsTag(req, res, next) {
            var user = req.isAuthenticated() ? req.user : null;
            if (user) {
                model.findTagById(req.params.id)
                    .then(function (tag) {
                        if (tag.userId === user._id.toString()) {
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
         * Creates tag.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function createTag(req, res) {
            var userId = req.params.userId,
                contentId = req.params.contentId,
                name = req.param('name'),
                createTagRequest = {
                    'userId': userId,
                    'contentId': contentId,
                    'name': name,
                    '_id': contentId + name
                };
            model.createTag(createTagRequest)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    // Favor 200 with error object over HTTP error.
                    res.json({'error': err});
                });
        }

        /**
         * Finds all tags.
         * @param {object} res - node response.
         */
        function findAllTag(res) {
            model.findAllTag()
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds all tags for user id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findAllTagForUserId(req, res) {
            model.findAllTagForUserId(req.params.userId)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds all tags for content id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findAllTagForContentId(req, res) {
            model.findAllTagForContentId(req.params.contentId)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds all tags for user & content id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findTagForUserAndContentId(req, res) {
            model.findTagForUserAndContentId(req.params.userId, req.params.contentId)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds tag by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findTagById(req, res) {
            model.findTagById(req.params.id)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Deletes a tag by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function deleteTagById(req, res) {
            model.deleteTagById(req.params.id)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }
    };
})();
