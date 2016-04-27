(function() {
    'use strict';
    angular.module('ThotApp').controller('DetailContentController', DetailContentController);

    function DetailContentController($location, $rootScope, ContentService, ReviewService) {
        var detailContentVm = this;

        // Scope Event Handlers
        detailContentVm.review = review;
        detailContentVm.updateReview = updateReview;
        detailContentVm.removeReview = removeReview;
        detailContentVm.review = review;
        detailContentVm.comment = comment;
        detailContentVm.tag = tag;
        detailContentVm.deleteContent = deleteContent;
        detailContentVm.ownsContent = ownsContent;
        detailContentVm.range = range;
        // Scope Variables
        detailContentVm.rating = 0;
        detailContentVm.userReview = undefined;

        populateReviews();
        
        function review(rating) {
            if (rating) {
                var userId = $rootScope.user.obj._id,
                    contentId = $rootScope.currentContent._id;
                ReviewService.createReview(userId, contentId, rating)
                    .then(function (review) {
                        detailContentVm.rating = review.rating;
                        detailContentVm.userReview = review;
                        console.log('Review Created', review);
                    }, function (err) {
                        detailContentVm.error = 'An error occurred trying to add the review.';
                        console.log(err);
                    });
            }
        }
        
        function updateReview(rating) {
            if (rating) {
                ReviewService.updateReviewById(detailContentVm.userReview._id, rating)
                    .then(function (review) {
                        detailContentVm.rating = review.rating;
                        detailContentVm.userReview = review;
                        console.log('Review Updated', review);
                    }, function (err) {
                        detailContentVm.error = 'An error occurred trying to update the review.';
                        console.log(err);
                    });
            }
        }

        function removeReview() {
            ReviewService.deleteReviewById(detailContentVm.userReview._id)
                .then(function (review) {
                    detailContentVm.rating = 0;
                    detailContentVm.userReview = undefined;
                    console.log('Review Removed', review);
                }, function (err) {
                    detailContentVm.error = 'An error occurred trying to remove the review.';
                    console.log(err);
                });
        }

        function comment(newComment) {
            var updatedContent = angular.copy($rootScope.currentContent);
            updatedContent.comments.push(newComment);
            ContentService.updateContentById($rootScope.currentContent._id, updatedContent)
                .then(function (content) {
                    $rootScope.currentContent = content;
                    console.log('Commented', $rootScope.currentContent);
                }, function (err) {
                    detailContentVm.error = 'An error occurred trying to comment.';
                    console.log(err);
                });
        }

        function tag(newTag) {
            var updatedContent = angular.copy($rootScope.currentContent);
            updatedContent.tags.push(newTag);
            ContentService.updateContentById($rootScope.currentContent._id, updatedContent)
                .then(function (content) {
                    $rootScope.currentContent = content;
                    console.log('Tagged', $rootScope.currentContent);
                }, function (err) {
                    detailContentVm.error = 'An error occurred trying to tag.';
                    console.log(err);
                });
        }

        function deleteContent() {
            ContentService.deleteContentById($rootScope.currentContent._id)
                .then(function (deletedContent) {
                    console.log('Deleted: ', deletedContent);
                    $rootScope.currentContent = undefined;
                    detailContentVm.$location = $location.path('/my_content');
                }, function (err) {
                    console.log(err);
                }, function (err) {
                    detailContentVm.error = 'An error occurred trying to delete.';
                    console.log(err);
                });
        }

        function ownsContent() {
            return $rootScope.user.obj &&
                $rootScope.currentContent.userId === $rootScope.user.obj._id;
        }

        function range(i) {
            return new Array(i);
        }

        function populateReviews() {
            if (ownsContent()) {
                ReviewService.findAllReviewForContentId($rootScope.currentContent._id)
                    .then(function (reviewsForContent) {
                        console.log('Reviews for Content:', reviewsForContent);
                        // TODO(bobby): the value of an average rating should be precomputed in the
                        // data model to scale properly.
                        if (reviewsForContent && reviewsForContent.length) {
                            detailContentVm.rating = 0;
                            reviewsForContent.forEach(function (review) {
                                detailContentVm.rating += review.rating;
                            });
                            detailContentVm.rating /= reviewsForContent.length;
                        }
                    }, function (err) {
                        detailContentVm.error = 'Could not load all reviews for this content.';
                        console.log(err);
                    });
            } else {
                ReviewService.findReviewForUserAndContentId(
                    $rootScope.user.obj._id, $rootScope.currentContent._id)
                    .then(function (review) {
                        console.log('User Review for Content:', review);
                        if (review) {
                            detailContentVm.rating = review.rating;
                            detailContentVm.userReview = review;
                        }
                    }, function (err) {
                        detailContentVm.error = 'Could not load all reviews for this content.';
                        console.log(err);
                    });
            }
        }
    }
})();
