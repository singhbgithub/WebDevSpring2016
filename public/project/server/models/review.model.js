(function() {
    'use strict';

    var q = require('q'); /* Dependencies */

    /* Add a node module */
    module.exports = function(mongoose, reviewSchema) {
        var Review = mongoose.model('Review', reviewSchema),
            model = {
                'createReview': createReview,
                'findAllReview': findAllReview,
                'findAllReviewForUserId': findAllReviewForUserId,
                'findAllReviewForContentId': findAllReviewForContentId,
                'findReviewForUserAndContentId': findReviewForUserAndContentId,
                'findReviewById': findReviewById,
                'updateReviewById': updateReviewById,
                'deleteReviewById': deleteReviewById
            };

        return model;

        function createReview(createReviewRequest) {
            var deferred = q.defer();
            Review.create(createReviewRequest, function (err, review) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(review);
                }
            });
            return deferred.promise;
        }

        function findAllReview() {
            var deferred = q.defer();
            Review.find({}, function (err, allReview) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(allReview);
                }
            });
            return deferred.promise;
        }

        function findAllReviewForUserId(userId) {
            var deferred = q.defer();
            Review.find({'userId': userId}, function (err, userReview) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userReview);
                }
            });
            return deferred.promise;
        }

        function findAllReviewForContentId(contentId) {
            var deferred = q.defer();
            Review.find({'contentId': contentId}, function (err, userReview) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userReview);
                }
            });
            return deferred.promise;
        }

        function findReviewForUserAndContentId(userId, contentId) {
            var deferred = q.defer();
            Review.findOne({'userId': userId, 'contentId': contentId}, function (err, userReview) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userReview);
                }
            });
            return deferred.promise;
        }

        function findReviewById(reviewId) {
            var deferred = q.defer();
            Review.findById(reviewId, function (err, review) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(review);
                }
            });
            return deferred.promise;
        }

        function updateReviewById(reviewId, updateReviewRequest) {
            var deferred = q.defer();
            Review.findByIdAndUpdate(reviewId, updateReviewRequest, function(err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    Review.findById(reviewId, function (err, review) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(review);
                        }
                    });
                }
            });
            return deferred.promise;
        }

        function deleteReviewById(reviewId) {
            var deferred = q.defer();
            Review.findByIdAndRemove(reviewId, function(err, review) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(review);
                }
            });
            return deferred.promise;
        }
    };
})();
