(function() {
    'use strict';
    angular.module('ThotApp').controller('FromMessageController', FromMessageController);

    function FromMessageController($location, $rootScope, MessageService) {
        var fromMessageVm = this;

        // Scope Event Handlers
        fromMessageVm.select = select;
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
                        messages.push(message.text);
                    });
                    fromMessageVm.messages = messages;
                }, function (err) {
                    fromMessageVm.error = err;
                    console.log(err);
                });
        }
    }
})();
