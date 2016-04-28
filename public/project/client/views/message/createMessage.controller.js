(function() {
    'use strict';
    angular.module('ThotApp').controller('CreateMessageController', CreateMessageController);

    function CreateMessageController($location, $rootScope, MessageService, ContentService,
                                     $routeParams) {
        var createMessageVm = this;

        // Scope Event Handlers
        createMessageVm.createMessage = createMessage;
        // Scope Variables
        // Should not expose this in a url. FIXME
        createMessageVm.toUserId = $routeParams.toUserId;
        createMessageVm.content = undefined;
        createMessageVm.error = '';

        getContent($routeParams.contentId);

        function createMessage(subject, text) {
            if (subject && text) {
                var fromUserId = $rootScope.user.obj._id,
                    toUserId = createMessageVm.content.userId,
                    contentId = createMessageVm.content._id;
                MessageService.createMessage(fromUserId, toUserId, contentId, subject, text)
                    .then(function (message) {
                        console.log('New message created.', message);
                        createMessageVm.$location = $location.path('/message/from');
                    }, function (err) {
                        createMessageVm.error = err;
                        console.log(err);
                    });
            } else {
                createMessageVm.error = 'Include subject and message.';
            }
        }

        function getContent(contentId) {
            ContentService.findContentById(contentId)
                .then(function (content) {
                    console.log('Found content', content);
                    createMessageVm.content = content;
                }, function (err) {
                    createMessageVm.error = err;
                });
        }
    }
})();
