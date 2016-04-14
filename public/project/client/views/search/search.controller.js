(function() {
    'use strict';
    angular.module('ThotApp').controller('SearchController', SearchController);

    function SearchController($location, $rootScope, ContentService) {
        var searchVm = this;

        // Scope Event Handlers
        searchVm.search = search;
        searchVm.selectContent = selectContent;
        searchVm.results = [];
        searchVm.resultMessage = '';

        function search(searchQuery) {
            console.log('Search Query: ', searchQuery);
            if (searchQuery) {
                // TODO(bobby): paginate
                // TODO(bobby): multiple tags
                var tag = searchQuery;
                ContentService.findContentByTag(tag)
                    .then(function (contentList) {
                        if (contentList) {
                            searchVm.results = contentList;
                        } else {
                            searchVm.resultMessage = 'No results found for that tag.';
                        }
                        console.log('Found content: ', contentList);
                    }, function (err) {
                        searchVm.error = 'Could not search for that tag. An error occurred.';
                        console.log(err);

                    });
                // TODO(bobby): load content on the page. And slide the search bar up.
                // TODO(bobby): Add typeahead for search box
            }
            else {
                window.alert('Enter a search.');
            }
        }

        function selectContent(index) { // TODO(bobby): move to rootScope function.
            $rootScope.currentContent = searchVm.results[index];
            console.log('Current Content:', $rootScope.currentContent);
            searchVm.$location = $location.path('/content');
        }
    }
})();