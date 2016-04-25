(function() {
    'use strict';
    angular.module('FormBuilderApp').controller('MainController', MainController);

    function MainController($location, $rootScope) {
        var mainVm = this;
        // Scope Variables
        mainVm.$location = $location;
        // Get around the ng-include not updating b/c it does not keep references to prim values; wrap in object.
        $rootScope.user = {'loggedIn': false, 'isAdmin': false, 'obj': null};
    }
})();
