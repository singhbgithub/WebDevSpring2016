(function() {
    'use strict';
    angular.module('ThotApp').factory('TagService', TagService);

    function TagService($q, $http) {

        var service = {
            'createTag': createTag,
            'findAllTag': findAllTag,
            'findAllTagForUserId': findAllTagForUserId,
            'findAllTagForContentId': findAllTagForContentId,
            'findTagForUserAndContentId': findTagForUserAndContentId,
            'findTagById': findTagById,
            'deleteTagById': deleteTagById
        };

        return service;

        function createTag(userId, contentId, name) {
            var deferred = $q.defer();

            $http.post('/api/project/user/' + userId + '/content/' + contentId + '/tag',
                {'name': name})
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

        function findAllTag() {
            var deferred = $q.defer();

            $http.get('/api/project/tag')
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

        function findAllTagForUserId(userId) {
            var deferred = $q.defer();

            $http.get('/api/project/user/' + userId + '/tag')
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

        function findAllTagForContentId(contentId) {
            var deferred = $q.defer();

            $http.get('/api/project/content/' + contentId + '/tag')
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

        function findTagForUserAndContentId(userId, contentId) {
            var deferred = $q.defer();

            $http.get('/api/project/user/' + userId + '/content/' + contentId + '/tag')
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

        function findTagById(tagId) {
            var deferred = $q.defer();

            $http.get('/api/project/tag/' + tagId)
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

        function deleteTagById(tagId) {
            var deferred = $q.defer();

            $http.delete('/api/project/tag/' + tagId)
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
