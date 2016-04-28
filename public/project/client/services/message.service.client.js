(function() {
    'use strict';
    angular.module('ThotApp').factory('MessageService', MessageService);

    function MessageService($q, $http) {

        var service = {
            'createMessage': createMessage,
            'findAllMessage': findAllMessage,
            'findAllMessageToUserId': findAllMessageToUserId,
            'findAllMessageFromUserId': findAllMessageFromUserId,
            'findAllMessageForContentId': findAllMessageForContentId,
            'findMessageForUserAndContentId': findMessageForUserAndContentId,
            'findMessageById': findMessageById,
            'deleteMessageById': deleteMessageById
        };

        return service;

        function createMessage(fromUserId, toUserId, contentId, subject, text) {
            var deferred = $q.defer();

            $http.post('/api/project/user/' + fromUserId + '/content/' + contentId + '/message',
                {'toUserId': toUserId, 'subject': subject, 'text': text})
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

        function findAllMessage() {
            var deferred = $q.defer();

            $http.get('/api/project/message')
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

        function findAllMessageToUserId(userId) {
            var deferred = $q.defer();

            $http.get('/api/project/user/' + userId + '/message/to')
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

        function findAllMessageFromUserId(userId) {
            var deferred = $q.defer();

            $http.get('/api/project/user/' + userId + '/message/from')
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

        function findAllMessageForContentId(contentId) {
            var deferred = $q.defer();

            $http.get('/api/project/content/' + contentId + '/message')
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

        function findMessageForUserAndContentId(userId, contentId) {
            var deferred = $q.defer();

            $http.get('/api/project/user/' + userId + '/content/' + contentId + '/message')
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

        function findMessageById(messageId) {
            var deferred = $q.defer();

            $http.get('/api/project/message/' + messageId)
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

        function deleteMessageById(messageId) {
            var deferred = $q.defer();

            $http.delete('/api/project/message/' + messageId)
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
