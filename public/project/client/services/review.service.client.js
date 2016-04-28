(function() {
    'use strict';
    angular.module('ThotApp').factory('ReviewService', ReviewService);

    function ReviewService($q, $http) {

        var service = {
            'createReview': createReview,
            'findAllReview': findAllReview,
            'findAllReviewForUserId': findAllReviewForUserId,
            'findAllReviewForContentId': findAllReviewForContentId,
            'findReviewForUserAndContentId': findReviewForUserAndContentId,
            'findReviewById': findReviewById,
            'updateReviewById': updateReviewById,
            'deleteReviewById': deleteReviewById
        };

        return service;

        function createReview(userId, contentId, rating) {
            var deferred = $q.defer();

            $http.post('/api/project/user/' + userId + '/content/' + contentId + '/review',
                {'rating': rating})
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function findAllReview() {
            var deferred = $q.defer();

            $http.get('/api/project/review')
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function findAllReviewForUserId(userId) {
            var deferred = $q.defer();

            $http.get('/api/project/user/' + userId + '/review')
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function findAllReviewForContentId(contentId) {
            var deferred = $q.defer();

            $http.get('/api/project/content/' + contentId + '/review')
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function findReviewForUserAndContentId(userId, contentId) {
            var deferred = $q.defer();

            $http.get('/api/project/user/' + userId + '/content/' + contentId + '/review')
                .then(function(response) {
                    var data = response.data;
                    if (!data) {
                        deferred.resolve(data);
                    } else if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function findReviewById(reviewId) {
            var deferred = $q.defer();

            $http.get('/api/project/review/' + reviewId)
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function updateReviewById(reviewId, rating) {
            var deferred = $q.defer();

            $http.put('/api/project/review/' + reviewId, {'rating': rating})
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }

        function deleteReviewById(reviewId) {
            var deferred = $q.defer();

            $http.delete('/api/project/review/' + reviewId)
                .then(function(response) {
                    var data = response.data;
                    if (data.error) {
                        deferred.reject(data.error);
                    } else {
                        deferred.resolve(data);
                    }
                });

            return deferred.promise;
        }
    }
})();
