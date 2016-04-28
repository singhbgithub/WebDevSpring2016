(function() {
    'use strict';

    var q = require('q'); /* Dependencies */

    /* Add a node module */
    module.exports = function(mongoose, messageSchema) {
        var Message = mongoose.model('Message', messageSchema),
            model = {
                'createMessage': createMessage,
                'findAllMessage': findAllMessage,
                'findAllMessageToUserId': findAllMessageToUserId,
                'findAllMessageFromUserId': findAllMessageFromUserId,
                'findAllMessageForContentId': findAllMessageForContentId,
                'findMessageForUserAndContentId': findMessageForUserAndContentId,
                'findMessageById': findMessageById,
                // No update API b/c does not make sense. There is nothing that is meant to be
                // updatable on a message.
                'deleteMessageById': deleteMessageById
            };

        return model;

        function createMessage(createMessageRequest) {
            var deferred = q.defer();
            Message.create(createMessageRequest, function (err, message) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(message);
                }
            });
            return deferred.promise;
        }

        function findAllMessage() {
            var deferred = q.defer();
            Message.find({}, function (err, allMessage) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(allMessage);
                }
            });
            return deferred.promise;
        }

        function findAllMessageToUserId(userId) {
            var deferred = q.defer();
            Message.find({'toUserId': userId}, function (err, userMessage) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userMessage);
                }
            });
            return deferred.promise;
        }

        function findAllMessageFromUserId(userId) {
            var deferred = q.defer();
            Message.find({'fromUserId': userId}, function (err, userMessage) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userMessage);
                }
            });
            return deferred.promise;
        }

        function findAllMessageForContentId(contentId) {
            var deferred = q.defer();
            Message.find({'contentId': contentId}, function (err, userMessage) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userMessage);
                }
            });
            return deferred.promise;
        }

        function findMessageForUserAndContentId(userId, contentId) {
            var deferred = q.defer();
            Message.find({'userId': userId, 'contentId': contentId}, function (err, userMessage) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userMessage);
                }
            });
            return deferred.promise;
        }

        function findMessageById(messageId) {
            var deferred = q.defer();
            Message.findById(messageId, function (err, message) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(message);
                }
            });
            return deferred.promise;
        }

        function deleteMessageById(messageId) {
            var deferred = q.defer();
            Message.findByIdAndRemove(messageId, function(err, message) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(message);
                }
            });
            return deferred.promise;
        }
    };
})();
