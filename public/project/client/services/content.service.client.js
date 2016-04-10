(function() {
    'use strict';
    angular.module('ThotApp').factory('ContentService', ContentService);

    function ContentService($q, $http) {

        var service = {
            'createContentForUser': createContentForUser,
            'findAllContent': findAllContent,
            'findAllContentForUser': findAllContentForUser,
            'findContentById': findContentById,
            'findContentByTag': findContentByTag,
            'updateContentById': updateContentById,
            'deleteContentById': deleteContentById
        };

        return service;

        function createContentForUser(userId, content) {
            var deferred = $q.defer();

            $http.post('/api/project/user/' + userId + '/content', content)
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

        function findAllContent() {
            var deferred = $q.defer();

            $http.get('/api/project/content')
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

        function findAllContentForUser(userId) {
            var deferred = $q.defer();

            $http.get('/api/project/user/' + userId + '/content')
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

        function findContentById(contentId) {
            var deferred = $q.defer();

            $http.get('/api/project/content/' + contentId)
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

        function findContentByTag(tag) {
            var deferred = $q.defer(),
                config = {'params': {'tag': tag}};

            $http.get('/api/project/content', config)
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

        function updateContentById(contentId, newContent) {
            var deferred = $q.defer();

            $http.put('/api/project/content/' + contentId, newContent)
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

        function deleteContentById(contentId) {
            var deferred = $q.defer();

            $http.delete('/api/project/content/' + contentId)
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