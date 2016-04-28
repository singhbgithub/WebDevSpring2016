(function() {
    'use strict';
    angular.module('ThotApp').controller('CreateContentController', CreateContentController);

    function CreateContentController($location, $rootScope, ContentService, TagService) {
        var createContentVm = this;
        
        // Scope Event Handlers
        createContentVm.createContent = createContent;

        function createContent(newContent) {
            if (newContent && newContent.src && newContent.tag) {
                var tags = newContent.tag.split(','),
                    content = {'src': newContent.src, 'tags': tags},
                    currentUserId = $rootScope.user.obj._id;
                ContentService.createContentForUser(currentUserId, content)
                    .then(function (content) {
                        console.log('New content created.');
                        tags.forEach(function (name) {
                            TagService.createTag(currentUserId, content._id, name)
                                .then(function (tag) {
                                    console.log('New tag created.', tag);
                                }, function (err) {
                                    console.log(err);
                                });
                        });
                        createContentVm.$location = $location.path('/my_content');
                    }, function (err) {
                        createContentVm.error = err;
                        console.log(err);
                    });
            } else {
                createContentVm.error = 'Please add a src and tag.';
            }
        }
    }
})();
