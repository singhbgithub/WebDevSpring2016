(function() {
    'use strict';
    angular.module('ThotApp').controller('SearchController', SearchController);

    function SearchController($scope, $location, $rootScope /*, ContentService*/) {
        $scope.search = function (searchQuery) {
            console.log('Search Query: ', searchQuery);
            if (searchQuery) {
                //ContentService.findUserByTag(tag, callback);
                // TODO(bobby): load content on the page. And slide the search bar up.
            }
            else {
                window.alert('Enter a search.');
            }
        };
    }
})();