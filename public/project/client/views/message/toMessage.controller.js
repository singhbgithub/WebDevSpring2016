(function() {
    'use strict';
    angular.module('ThotApp').controller('ToMessageController', ToMessageController);

    function ToMessageController($location, $rootScope, MessageService) {
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
                        messages.push(message.text);
                    });
                    toMessageVm.messages = messages;
                }, function (err) {
                    toMessageVm.error = err;
                    console.log(err);
                });
        }
    }
})();
