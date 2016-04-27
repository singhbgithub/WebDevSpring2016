(function() {
    'use strict';
    angular.module('ThotApp').controller('CreateContentController', CreateContentController);

    function CreateContentController($location, $rootScope, ContentService) {
        var createContentVm = this;
        
        // Scope Event Handlers
        createContentVm.createContent = createContent;

        function createContent(newContent) {
            if (newContent && newContent.src && newContent.tag) {
                var content = {'src': newContent.src, 'tags': newContent.tag.split(',')};
                ContentService.createContentForUser($rootScope.user.obj._id, content)
                    .then(function (content) {
                        console.log('New content created.');
                        createContentVm.$location = $location.path('/my_content');
                    }, function (err) {
                        createContentVm.error = 'An error occurred trying to create content.';
                        console.log(err);
                    });
            } else {
                createContentVm.error = 'Please add a src and tag.';
            }
        }
    }
})();
