(function() {
    'use strict';
    angular.module('ThotApp').controller('DetailContentController', DetailContentController);

    function DetailContentController($location, $rootScope, ContentService) {
        var detailContentVm = this;

        // Scope Event Handlers
        detailContentVm.like = like;
        detailContentVm.comment = comment;
        detailContentVm.tag = tag;
        detailContentVm.canDelete = canDelete;
        detailContentVm.deleteContent = deleteContent;

        function like() {
            if ($rootScope.currentContent !== null && $rootScope.currentContent !== undefined) {
                var updatedContent = angular.copy($rootScope.currentContent);
                updatedContent.likes += 1;
                ContentService.updateContentById($rootScope.currentContent._id, updatedContent)
                    .then(function (content) {
                        $rootScope.currentContent = content;
                        console.log('Liked', $rootScope.currentContent);
                    }, function (err) {
                        detailContentVm.error = 'An error occurred trying to like.';
                        console.log(err);
                    });
            }
        }

        function comment(newComment) {
            if ($rootScope.currentContent !== null && $rootScope.currentContent !== undefined) {
                var updatedContent = angular.copy($rootScope.currentContent);
                updatedContent.comments.push(newComment);
                ContentService.updateContentById($rootScope.currentContent._id, updatedContent)
                    .then(function (content) {
                        $rootScope.currentContent = content;
                        console.log('Commented', $rootScope.currentContent);
                    }, function (err) {
                        detailContentVm.error = 'An error occurred trying to comment.';
                        console.log(err);
                    });
            }
        }

        function tag(newTag) {
            if ($rootScope.currentContent !== null && $rootScope.currentContent !== undefined) {
                var updatedContent = angular.copy($rootScope.currentContent);
                updatedContent.tags.push(newTag);
                ContentService.updateContentById($rootScope.currentContent._id, updatedContent)
                    .then(function (content) {
                        $rootScope.currentContent = content;
                        console.log('Tagged', $rootScope.currentContent);
                    }, function (err) {
                        detailContentVm.error = 'An error occurred trying to tag.';
                        console.log(err);
                    });
            }
        }

        function canDelete() {
            return $rootScope.currentContent.userId === $rootScope.user._id;
        }
        
        function deleteContent() {
            ContentService.deleteContentById($rootScope.currentContent._id)
                .then(function (deletedContent) {
                    console.log('Deleted: ', deletedContent);
                    $rootScope.currentContent = undefined;
                    detailContentVm.$location = $location.path('/my_content');
                }, function (err) {
                    console.log(err);
                }, function (err) {
                    detailContentVm.error = 'An error occurred trying to delete.';
                    console.log(err);
                });
        }
    }
})();
