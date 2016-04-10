(function() {
    'use strict';
    angular.module('ThotApp').controller('ContentController', ContentController);

    function ContentController($location, $rootScope, ContentService) {
        var contentVm = this;

        // We have a logged-in user.
        if ($rootScope.user.loggedIn) {
            // Populate the content
            contentVm.contentList = [];
            populateContent();

            // Handlers
            contentVm.createContent = function (newContent) {
                var content = {'src': newContent.src, 'tags': [newContent.tag], 'likes': 0, 'comments': []};
                ContentService.createContentForUser($rootScope.user._id, content)
                    .then(function (content) {
                        console.log('New content created.');
                        populateContent();
                        // FIXME(bobby): why is this line even here?
                        $rootScope.currentContent = undefined;
                    }, function (err) {
                        console.log(err);
                    });
            };
            contentVm.like = function () {
                if ($rootScope.currentContent !== null && $rootScope.currentContent !== undefined) {
                    var updatedContent = angular.copy($rootScope.currentContent);
                    updatedContent.likes += 1;
                    ContentService.updateContentById($rootScope.currentContent._id, updatedContent)
                        .then(function (content) {
                            $rootScope.currentContent = content;
                            console.log('Liked', $rootScope.currentContent);
                        }, function (err) {
                            console.log(err);
                        });
                }
            };
            contentVm.comment = function (newComment) {
                if ($rootScope.currentContent !== null && $rootScope.currentContent !== undefined) {
                    var updatedContent = angular.copy($rootScope.currentContent);
                    updatedContent.comments.push(newComment);
                    ContentService.updateContentById($rootScope.currentContent._id, updatedContent)
                        .then(function (content) {
                            $rootScope.currentContent = content;
                            console.log('Commented', $rootScope.currentContent);
                        }, function (err) {
                            console.log(err);
                        });
                }
            };
            contentVm.tag = function (newTag) {
                if ($rootScope.currentContent !== null && $rootScope.currentContent !== undefined) {
                    var updatedContent = angular.copy($rootScope.currentContent);
                    updatedContent.tags.push(newTag);
                    ContentService.updateContentById($rootScope.currentContent._id, updatedContent)
                        .then(function (content) {
                            $rootScope.currentContent = content;
                            console.log('Tagged', $rootScope.currentContent);
                        }, function (err) {
                            console.log(err);
                        });
                }
            };
            contentVm.deleteContent = function () {
                ContentService.deleteContentById($rootScope.currentContent._id)
                    .then(function (deletedContent) {
                        console.log('Deleted: ', deletedContent);
                        $rootScope.currentContent = undefined;
                        contentVm.$location = $location.path('/profile');
                    }, function (err) {
                        console.log(err);
                    });
            };
            contentVm.selectContent = function (index) {
                $rootScope.currentContent = contentVm.contentList[index];
                console.log('Current Content:', $rootScope.currentContent);
            };
        }
        else {
            contentVm.$location = $location.path('/register');
        }

        function populateContent() {
            ContentService.findAllContentForUser($rootScope.user._id)
                .then(function (contentForUser) {
                    contentVm.contentList = contentForUser;
                }, function (err) {
                    console.log(err);
                });
        }
    }
})();