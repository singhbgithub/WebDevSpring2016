(function() {
    'use strict';
    angular.module('ThotApp').controller('ToMessageController', ToMessageController);

    function ToMessageController($location, $rootScope, MessageService, ContentService) {
        var toMessageVm = this;

        // Scope Event Handlers
        toMessageVm.select = select;
        // Scope Variables
        toMessageVm.messages = [];

        populateToMessages();

        function select(index) {
            var message = toMessageVm.messages[index];
            toMessageVm.$location =$location.path('/message/' + message._id);
        }
        
        function populateToMessages() {
            MessageService.findAllMessageToUserId($rootScope.user.obj._id)
                .then(function (messagesToUser) {
                    var messages = [];
                    console.log('Messages to user found.', messagesToUser);
                    messagesToUser.forEach(function (message) {
                        ContentService.findContentById(message.contentId)
                            .then(function (content) {
                                var maxText = 32,
                                    text = message.text.substring(0, maxText);
                                console.log('Found src', content.src);
                                messages.push({
                                    'src': content.src,
                                    'text': message.text.length > maxText ? text + ' ...' : text,
                                    'subject': message.subject})
                            }, function (err) {
                                toMessageVm.error = err;
                            });
                    });
                    toMessageVm.messages = messages;
                }, function (err) {
                    toMessageVm.error = err;
                    console.log(err);
                });
        }
    }
})();
