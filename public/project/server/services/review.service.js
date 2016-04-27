(function() {
    'use strict';

    /* Add a node module w/ dependencies */
    module.exports = function (app, model) {
        /* TODO(bobby): apis should have permissions ...*/
        app.post('/api/project/user/:userId/content/:contentId', createReview);
        app.get('/api/project/review', findAllReview);
        app.get('/api/project/user/:userId/review', findAllReviewForUserId);
        app.get('/api/project/content/:contentId/review', findAllReviewForContentId);
        app.get('/api/project/user/:userId/content/:contentId', findReviewForUserAndContentId);
        app.get('/api/project/review/:id', findReviewById);
        app.put('/api/project/review/:id', ownsReview, updateReviewById);
        app.delete('/api/project/review/:id', ownsReview,  deleteReviewById);

        /**
         * Middle-ware to determine if the request is authorized by the review Owner.
         * @param {object} req - node request.
         * @param {object} res - node response.
         * @param {function} next - node next function.
         */
        function ownsReview(req, res, next) {
            var user = req.isAuthenticated() ? req.user : null;
            if (user) {
                model.findReviewById(req.params.id)
                    .then(function (review) {
                        if (review.userId === user._id.toString()) {
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
         * Creates review.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function createReview(req, res) {
            var userId = req.params.userId,
                contentId = req.params.contentId,
                createReviewRequest = {
                    'userId': userId,
                    'contentId': contentId,
                    'rating': req.param('rating'),
                    '_id': userId + contentId
                };
            model.createReview(createReviewRequest)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    // Favor 200 with error object over HTTP error.
                    res.json({'error': err});
                });
        }

        /**
         * Finds all reviews.
         * @param {object} res - node response.
         */
        function findAllReview(res) {
            model.findAllReview()
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds all reviews for user id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findAllReviewForUserId(req, res) {
            model.findAllReviewForUserId(req.params.userId)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds all reviews for content id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findAllReviewForContentId(req, res) {
            model.findAllReviewForContentId(req.params.contentId)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds all reviews for user & content id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findReviewForUserAndContentId(req, res) {
            model.findReviewForUserAndContentId(req.params.userId, req.params.contentId)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Finds review by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function findReviewById(req, res) {
            model.findReviewById(req.params.id)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Updates a review by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function updateReviewById(req, res) {
            var rating = req.param('rating'),
                updateContentByIdRequest = {};
            if (rating) {
                updateContentByIdRequest.rating = rating;
            }
            model.updateReviewById(req.params.id, updateContentByIdRequest)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }

        /**
         * Deletes a review by id.
         * @param {object} req - node request.
         * @param {object} res - node response.
         */
        function deleteReviewById(req, res) {
            model.deleteReviewById(req.params.id)
                .then(function (response) {
                    res.json(response);
                }, function (err) {
                    res.json({'error': err});
                });
        }
    };
})();
