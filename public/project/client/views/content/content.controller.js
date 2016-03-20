(function() {
    'use strict';
    angular.module('ThotApp').controller('ContentController', ContentController);

    function ContentController($scope, $location, $rootScope, ContentService) {
        // We have a logged-in user.
        if ($rootScope.user.loggedIn) {
            // Populate the content
            var callbackContent = function(content) {
                $scope.contentList = content;
            };
            ContentService.findAllContentForUser($rootScope.user._id, callbackContent);
            // Handlers
            $scope.createContent = function (newContent) {
                var content = {'src': newContent.src, 'tags': [newContent.tag], 'likes': 0, 'comments': [],},
                    callback = function() {
                    console.log('New content created.');
                    ContentService.findAllContentForUser($rootScope.user._id, callbackContent);
                    $rootScope.currentContent = undefined;
                };
                ContentService.createContentForUser($rootScope.user._id, content, callback);
            };
            $scope.like = function () {
                if ($rootScope.currentContent !== null && $rootScope.currentContent !== undefined) {
                    $rootScope.currentContent.likes += 1;
                    var content = $rootScope.currentContent,
                        contentId = $rootScope.currentContent._id,
                        callback = function() {
                            console.log('Liked', $rootScope.currentContent);
                        };
                    ContentService.updateContentById(contentId, content, callback);
                }
            };
            $scope.comment = function (newComment) {
                if ($rootScope.currentContent !== null && $rootScope.currentContent !== undefined) {
                    $rootScope.currentContent.comments.push(newComment);
                    var content = $rootScope.currentContent,
                        contentId = $rootScope.currentContent._id,
                        callback = function() {
                            console.log('Commented', $rootScope.currentContent);
                        };
                    ContentService.updateContentById(contentId, content, callback);
                }
            };
            $scope.tag = function (newTag) {
                if ($rootScope.currentContent !== null && $rootScope.currentContent !== undefined) {
                    $rootScope.currentContent.tags.push(newTag);
                    var content = $rootScope.currentContent,
                        contentId = $rootScope.currentContent._id,
                        callback = function() {
                            console.log('Tagged', $rootScope.currentContent);
                        };
                    ContentService.updateContentById(contentId, content, callback);
                }
            };
            $scope.deleteContent = function () {
                var callback = function() {
                    console.log('Deleted');
                    $rootScope.currentContent = undefined;
                    $scope.$location = $location.path('/profile');
                };
                ContentService.deleteContentById($rootScope.currentContent._id, callback);
            };
            $scope.selectContent = function (index) {
                $rootScope.currentContent = $scope.contentList[index];
                console.log('Current Content:', $rootScope.currentContent);
            };
        }
        else {
            $scope.$location = $location.path('/register');
        }
    }
})();