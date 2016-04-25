(function() {
    'use strict';

    var q = require('q'); /* Dependencies */

    /* Add a node module */
    module.exports = function(mongoose, contentSchema) {
        var Content = mongoose.model('Content', contentSchema),
            model = {
            'createContentForUserId': createContentForUserId,
            'findAllContent': findAllContent,
            'findAllContentForUserId': findAllContentForUserId,
            'findContentById': findContentById,
            'findContentByTag': findContentByTag,
            'updateContentById': updateContentById,
            'deleteContentById': deleteContentById
        };

        return model;

        function createContentForUserId(createContentRequest) {
            var deferred = q.defer();
            Content.create(createContentRequest, function (err, content) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(content);
                }
            });
            return deferred.promise;
        }

        function findAllContent() {
            var deferred = q.defer();
            Content.find({}, function (err, allContent) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(allContent);
                }
            });
            return deferred.promise;
        }

        function findAllContentForUserId(userId) {
            var deferred = q.defer();
            Content.find({'userId': userId}, function (err, userContent) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userContent);
                }
            });
            return deferred.promise;
        }

        function findContentById(contentId) {
            var deferred = q.defer();
            Content.findById(contentId, function (err, content) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(content);
                }
            });
            return deferred.promise;
        }

        function findContentByTag(tag) {
            // TODO(bobby): limit & skip params needed for when search functionality is added.
            // This can be further improved to do cursor-based pagination.
            var deferred = q.defer();
            Content.find({'tags': tag}, function (err, content) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(content);
                }
            });
            return deferred.promise;
        }

        function updateContentById(contentId, updateContentRequest) {
            var deferred = q.defer();
            Content.findByIdAndUpdate(contentId, updateContentRequest, function(err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    Content.findById(contentId, function (err, content) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(content);
                        }
                    });
                }
            });
            return deferred.promise;
        }

        function deleteContentById(contentId) {
            var deferred = q.defer();
            Content.findByIdAndRemove(contentId, function(err, content) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(content);
                }
            });
            return deferred.promise;
        }
    };
})();
