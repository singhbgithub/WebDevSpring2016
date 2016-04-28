(function() {
    'use strict';
    angular.module('ThotApp').controller('DetailContentController', DetailContentController);

    function DetailContentController($location, $rootScope, ContentService, ReviewService,
                                     TagService) {
        var detailContentVm = this;
        
        // Review Events
        detailContentVm.review = review;
        detailContentVm.updateReview = updateReview;
        detailContentVm.removeReview = removeReview;
        // Tag Events
        detailContentVm.tag = tag;
        detailContentVm.removeTag = removeTag;
        detailContentVm.ownsTag = ownsTag;
        // Scope Event Handlers
        detailContentVm.message = message;
        detailContentVm.deleteContent = deleteContent;
        detailContentVm.ownsContent = ownsContent;
        detailContentVm.range = range;
        // Review Variables
        detailContentVm.rating = 0;
        detailContentVm.numRatings = 0;
        detailContentVm.userReview = undefined;
        // Tag Variables
        detailContentVm.tags = [];

        populateReviews();
        populateTags();
        
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

        function tag(newTag) {
            TagService.createTag($rootScope.user.obj._id, $rootScope.currentContent._id, newTag)
                .then(function (tag) {
                    console.log('New tag created.', tag);
                    populateTags();
                }, function (err) {
                    detailContentVm.error = 'An error occurred trying to add the tag.';
                    console.log(err);
                });
        }

        function removeTag(index) {
            var tag = detailContentVm.tags[index];
            TagService.deleteTagById(tag._id)
                .then(function (tag) {
                    console.log('Deleted tag', tag);
                    populateTags();
                }, function (err) {
                    detailContentVm.error = 'An error occurred trying to remove the tag.';
                    console.log(err);
                });
        }

        function ownsTag(index) {
            var tag = detailContentVm.tags[index];
            return $rootScope.user.obj && tag.userId === $rootScope.user.obj._id;
        }

        function message() {
            detailContentVm.$location = $location.path(
                '/message/create/' + $rootScope.currentContent._id);
        }

        function deleteContent() {
            var isSure = window.confirm('Are you sure you want to delete this content? ' +
                'This cannot be undone.');
            if (isSure) {
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
        }

        function ownsContent() {
            return $rootScope.user.obj && $rootScope.currentContent &&
                $rootScope.currentContent.userId === $rootScope.user.obj._id;
        }

        function range(i) {
            return new Array(Math.round(i));
        }

        function populateReviews() {
            if (ownsContent()) {
                ReviewService.findAllReviewForContentId($rootScope.currentContent._id)
                    .then(function (reviewsForContent) {
                        console.log('Reviews for Content:', reviewsForContent);
                        // TODO(bobby): the value of an average rating should be precomputed in the
                        // data model to scale properly.
                        if (reviewsForContent && reviewsForContent.length) {
                            var numRatings = reviewsForContent.length;
                            detailContentVm.rating = 0;
                            reviewsForContent.forEach(function (review) {
                                detailContentVm.rating += review.rating;
                            });
                            detailContentVm.rating /= Math.round(numRatings);
                            detailContentVm.numRatings = numRatings;
                        }
                    }, function (err) {
                        detailContentVm.error = 'Could not load all reviews for this content.';
                        console.log(err);
                    });
            } else if ($rootScope.user.loggedIn) {
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

        function populateTags() {
            TagService.findAllTagForContentId($rootScope.currentContent._id)
                .then(function (tagsForContent) {
                    console.log('Tags for Content:', tagsForContent);
                    if (tagsForContent && tagsForContent.length) {
                        detailContentVm.tags = tagsForContent;
                    }
                }, function (err) {
                    detailContentVm.error = 'Could not load all tags for this content.';
                    console.log(err);
                });
        }
    }
})();
