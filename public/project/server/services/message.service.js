(function() {
    'use strict';

    /* Add a node module w/ dependencies */
    module.exports = function (app, model) {
        /* TODO(bobby): apis should have permissions ...*/
        app.post('/api/project/user/:userId/content/:contentId/message', createMessage);
        app.get('/api/project/message', findAllMessage);
        app.get('/api/project/user/:userId/message/to', findAllMessageToUserId);
        app.get('/api/project/user/:userId/message/from', findAllMessageFromUserId);
        app.get('/api/project/content/:contentId/message', findAllMessageForContentId);
        app.get('/api/project/user/:userId/content/:contentId/message',
            findMessageForUserAndContentId);
        app.get('/api/project/message/:id', findMessageById);
        app.put('/api/project/message/:id', ownsMessage, updateMessageById);
        app.delete('/api/project/message/:id', ownsMessage,  deleteMessageById);

        /**
         * Middle-ware to determine if the request is authorized by the message Owner.
         * @param {object} req - node request.
         * @param {object} res - node response.
         * @param {function} next - node next function.
         */
        function ownsMessage(req, res, next) {
            var user = req.isAuthenticated() ? req.user : null;
            if (user) {
                model.findMessageById(req.params.id)
                    .then(function (message) {
                        if (message.userId === user._id.toString()) {
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
         * Creates message.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function createMessage(req, res) {
            var fromUserId = req.params.userId,
                contentId = req.params.contentId,
                createMessageRequest = {
                    'fromUserId': fromUserId,
                    // TODO(bobby): include in url, or use a find based off of content id?
                    'toUserId': req.param('toUserId'),
                    'contentId': contentId,
                    'subject': req.param('subject'),
                    'text': req.param('text')
                };
            model.createMessage(createMessageRequest)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    // Favor 200 with error object over HTTP error.
                    res.json({'error': err});
                });
        }

        /**
         * Finds all messages.
         * @param {object} res - node response.
         */
        function findAllMessage(res) {
            model.findAllMessage()
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds all messages directed to the user id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findAllMessageToUserId(req, res) {
            model.findAllMessageToUserId(req.params.userId)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds all messages directed from user id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findAllMessageFromUserId(req, res) {
            model.findAllMessageFromUserId(req.params.userId)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds all messages for content id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findAllMessageForContentId(req, res) {
            model.findAllMessageForContentId(req.params.contentId)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds all messages for user & content id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findMessageForUserAndContentId(req, res) {
            model.findMessageForUserAndContentId(req.params.userId, req.params.contentId)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds message by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findMessageById(req, res) {
            model.findMessageById(req.params.id)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Updates a message by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function updateMessageById(req, res) {
            var rating = req.param('rating'),
                updateContentByIdRequest = {};
            if (rating) {
                updateContentByIdRequest.rating = rating;
            }
            model.updateMessageById(req.params.id, updateContentByIdRequest)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Deletes a message by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function deleteMessageById(req, res) {
            model.deleteMessageById(req.params.id)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }
    };
})();
