(function() {
    'use strict';
    
    var q = require('q'), /* Dependencies */
        contentMock = require('./content.mock.json');

    /* Add a node module */
    module.exports = function() {

        var model = {
            'createContentForUserId': createContentForUserId,
            'findAllContent': findAllContent,
            'findAllContentForUserId': findAllContentForUserId,
            'findContentById': findContentById,
            'findContentByTag': findContentByTag,
            'updateContentById': updateContentById,
            'deleteContentById': deleteContentById
        };

        return model;

        function createContentForUserId(userId, createContentRequest) {
            var deferred = q.defer();

            setTimeout(function () {
                // FIXME(bobby): should check that the userId exists; otherwise could create some bogus entries that
                // aren't referenced anywhere.
                createContentRequest._id = new Date().getTime();
                createContentRequest.userId = typeof userId === 'string' ? parseInt(userId) : userId;
                contentMock.push(createContentRequest);
                deferred.resolve(createContentRequest);
            }, 100);

            return deferred.promise;
        }

        function findAllContent() {
            var deferred = q.defer();

            setTimeout(function () {
                deferred.resolve(contentMock);
            }, 100);

            return deferred.promise;
        }

        function findAllContentForUserId(userId) {
            var deferred = q.defer();

            setTimeout(function () {
                var userContent = [],
                    id = typeof userId === 'string' ? parseInt(userId) : userId;
                for (var i = 0; i < contentMock.length; i++) {
                    var content = contentMock[i];
                    if (content.userId === id) {
                        userContent.push(content);
                    }
                }
                deferred.resolve(userContent);
            }, 100);

            return deferred.promise;
        }

        function findContentById(contentId) {
            var deferred = q.defer();

            setTimeout(function () {
                var content = null,
                    id = typeof contentId === 'string' ? parseInt(contentId) : contentId;
                for (var i = 0; i < contentMock.length; i++) {
                    var currentContent = contentMock[i];
                    if (currentContent._id === id) {
                        content = currentContent;
                        break;
                    }
                }
                if (content) {
                    deferred.resolve(content);
                } else {
                    deferred.reject('Could not find content with id: ' + contentId);
                }
            }, 100);

            return deferred.promise;
        }

        function findContentByTag(tag) {
            // TODO(bobby): limit & skip params needed for when search functionality is added.
            var deferred = q.defer();

            setTimeout(function () {
                var content = null;
                for (var i = 0; i < contentMock.length; i++) {
                    var currentContent = contentMock[i],
                        currentTags = currentContent.tags;
                    for (var j = 0; j < currentTags.length; j++) {
                        if (currentTags[j] === tag) {
                            content = currentContent;
                            break;
                        }
                    }
                    // This logic will be easily refactored out when mongo is used.
                    if (content) {
                        break;
                    }
                }
                if (content) {
                    deferred.resolve(content);
                } else {
                    deferred.reject('Could not find content with tag: ' + tag);
                }
            }, 100);

            return deferred.promise;
        }

        function updateContentById(contentId, updateContentRequest) {
            var deferred = q.defer();

            setTimeout(function () {
                var updatedContent = null,
                    id = typeof contentId === 'string' ? parseInt(contentId) : contentId;
                for (var i = 0; i < contentMock.length; i++) {
                    var currentContent = contentMock[i];
                    if (currentContent._id === id) {
                        if (updateContentRequest.hasOwnProperty('likes')) {
                            currentContent.likes = updateContentRequest.likes;
                        }
                        if (updateContentRequest.hasOwnProperty('comments')) {
                            currentContent.comments = updateContentRequest.comments;
                        }
                        if (updateContentRequest.hasOwnProperty('tags')) {
                            currentContent.tags = updateContentRequest.tags;
                        }
                        updatedContent = currentContent;
                        break;
                    }
                }
                if (updatedContent) {
                    deferred.resolve(updatedContent);
                } else {
                    deferred.reject('Could not find & update content with id: ' + contentId);
                }
            }, 100);

            return deferred.promise;
        }

        function deleteContentById(contentId) {
            var deferred = q.defer();

            setTimeout(function () {
                var deletedContent = null,
                    id = typeof contentId === 'string' ? parseInt(contentId) : contentId;
                for (var i = 0; i < contentMock.length; i++) {
                    var content = contentMock[i];
                    if (content._id === id) {
                        _remove(contentMock, i);
                        deletedContent = content;
                        break;
                    }
                }
                if (deletedContent) {
                    deferred.resolve(deletedContent);
                } else {
                    deferred.reject('Could not find & delete content with id: ' + contentId);
                }
            }, 100);

            return deferred.promise;
        }

        // Array Remove - By John Resig (MIT Licensed) - put in reusable module TODO(bobby)
        function _remove(arr, from, to) {
            var rest = arr.slice((to || from) + 1 || arr.length);
            arr.length = from < 0 ? arr.length + from : from;
            return arr.push.apply(arr, rest);
        }
    }
})();