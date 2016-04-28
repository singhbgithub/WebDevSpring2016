(function() {
    'use strict';
    angular.module('ThotApp').controller('DetailMessageController', DetailMessageController);

    function DetailMessageController($location, $routeParams, ContentService, MessageService) {
        var detailMessageVm = this;

        // Scope Event Handlers
        detailMessageVm.navCreateMessage = navCreateMessage;
        // Scope Variables
        detailMessageVm.message = undefined;
        detailMessageVm.src = undefined;
        detailMessageVm.error = '';

        getMessage($routeParams.messageId);
        
        function getMessage(messageId) {
            MessageService.findMessageById(messageId)
                .then(function (message) {
                    console.log('Found message', message);
                    ContentService.findContentById(message.contentId)
                        .then(function (content) {
                            detailMessageVm.src = content.src;
                        }, function (err) {
                            detailMessageVm.error += err;
                        });
                    detailMessageVm.message = message;
                }, function (err) {
                    detailMessageVm.error = err;
                });
        }
        
        function navCreateMessage() {
            detailMessageVm.$location = $location.path(
                '/message/create/' + detailMessageVm.message.contentId);
        }
    }
})();
