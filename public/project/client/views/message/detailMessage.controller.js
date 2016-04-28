(function() {
    'use strict';
    angular.module('ThotApp').controller('MessageForUserController', MessageForUserController);

    function MessageForUserController($location, $rootScope, MessageService) {
        var messageVm = this;

        // Scope Event Handlers
        messageVm.reply = reply;
        // Scope Variables
    }
})();
