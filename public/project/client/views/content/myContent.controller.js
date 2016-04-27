(function() {
    'use strict';
    angular.module('ThotApp').controller('MyContentController', MyContentController);

    function MyContentController($rootScope, ContentService) {
        var myContentVm = this;
        
        // Scope Event Handlers
        myContentVm.selectContent = selectContent;
        // Scope Variables
        myContentVm.contentList = [];
        
        // Populate the content
        populateContent();


        function selectContent(index) {
            $rootScope.currentContent = myContentVm.contentList[index];
            console.log('Current Content:', $rootScope.currentContent);
        }

        function populateContent() {
            ContentService.findAllContentForUser($rootScope.user.obj._id)
                .then(function (contentForUser) {
                    if (contentForUser && contentForUser.length) {
                        myContentVm.contentList = contentForUser;
                    } else {
                        myContentVm.noContent = true;
                    }
                }, function (err) {
                    myContentVm.error = 'An error occurred trying to load the content.';
                    console.log(err);
                });
        }
    }
})();
