(function() {
    'use strict';
    angular.module('ThotApp').controller('FromMessageController', FromMessageController);

    function FromMessageController($location, $rootScope, MessageService, ContentService) {
        var fromMessageVm = this;

        // Scope Event Handlers
        fromMessageVm.select = select;
        fromMessageVm.detailMessage = detailMessage;
        // Scope Variables
        fromMessageVm.messages = undefined;

        populateFromMessages();

        function select(index) {
            var message = fromMessageVm.messages[index];
            fromMessageVm.$location =$location.path('/message/' + message._id);
        }

        function populateFromMessages() {
            MessageService.findAllMessageFromUserId($rootScope.user.obj._id)
                .then(function (messagesFromUser) {
                    var messages = [];
                    console.log('Messages from user found.', messagesFromUser);
                    messagesFromUser.forEach(function (message) {
                        ContentService.findContentById(message.contentId)
                            .then(function (content) {
                                var maxText = 32,
                                    text = message.text.substring(0, maxText);
                                console.log('Found src', content.src);
                                messages.push({
                                    '_id': message._id,
                                    'src': content.src,
                                    'text': message.text.length > maxText ? text + ' ...' : text,
                                    'subject': message.subject})
                            }, function (err) {
                                fromMessageVm.error = err;
                            });
                    });
                    fromMessageVm.messages = messages;
                }, function (err) {
                    fromMessageVm.error = err;
                    console.log(err);
                });
        }

        function detailMessage(index) {
            var message = fromMessageVm.messages[index];
            fromMessageVm.$location = $location.path('/message/detail/' + message._id);
        }
    }
})();
