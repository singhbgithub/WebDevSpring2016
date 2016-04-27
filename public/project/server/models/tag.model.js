(function() {
    'use strict';

    var q = require('q'); /* Dependencies */

    /* Add a node module */
    module.exports = function(mongoose, tagSchema) {
        var Tag = mongoose.model('Tag', tagSchema),
            model = {
                'createTag': createTag,
                'findAllTag': findAllTag,
                'findAllTagForUserId': findAllTagForUserId,
                'findAllTagForContentId': findAllTagForContentId,
                'findTagForUserAndContentId': findTagForUserAndContentId,
                'findTagById': findTagById,
                // No update API b/c does not make sense. There is nothing that is meant to be
                // updatable on a tag.
                'deleteTagById': deleteTagById
            };

        return model;

        function createTag(createTagRequest) {
            var deferred = q.defer();
            Tag.create(createTagRequest, function (err, tag) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(tag);
                }
            });
            return deferred.promise;
        }

        function findAllTag() {
            var deferred = q.defer();
            Tag.find({}, function (err, allTag) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(allTag);
                }
            });
            return deferred.promise;
        }

        function findAllTagForUserId(userId) {
            var deferred = q.defer();
            Tag.find({'userId': userId}, function (err, userTag) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userTag);
                }
            });
            return deferred.promise;
        }

        function findAllTagForContentId(contentId) {
            var deferred = q.defer();
            Tag.find({'contentId': contentId}, function (err, userTag) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userTag);
                }
            });
            return deferred.promise;
        }

        function findTagForUserAndContentId(userId, contentId) {
            var deferred = q.defer();
            Tag.find({'userId': userId, 'contentId': contentId}, function (err, userTag) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(userTag);
                }
            });
            return deferred.promise;
        }

        function findTagById(tagId) {
            var deferred = q.defer();
            Tag.findById(tagId, function (err, tag) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(tag);
                }
            });
            return deferred.promise;
        }

        function deleteTagById(tagId) {
            var deferred = q.defer();
            Tag.findByIdAndRemove(tagId, function(err, tag) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(tag);
                }
            });
            return deferred.promise;
        }
    };
})();
