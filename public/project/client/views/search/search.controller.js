(function() {
    'use strict';
    angular.module('ThotApp').controller('SearchController', SearchController);

    function SearchController($location, $rootScope, ContentService, TagService) {
        var searchVm = this;

        // Scope Event Handlers
        searchVm.search = search;
        searchVm.selectContent = selectContent;
        searchVm.results = [];
        searchVm.hasNoResults = false;

        prepareSearch();

        function search(searchQuery) {
            console.log('Search Query: ', searchQuery);
            searchVm.$location = $location.search({'q': searchQuery});
            if (searchQuery) {
                // TODO(bobby): load content on the page. And slide the search bar up.
                // TODO(bobby): Add typeahead for search box
                // TODO(bobby): paginate
                // TODO(bobby): multiple tags
                searchByTag(searchQuery);
            }
            else {
                window.alert('Enter a search.');
            }
        }

        function searchByTag(tag) {
            TagService.findTagByName(tag)
                .then(function (tags) {
                    console.log('Found tags', tags);
                    var hasResults = tags && tags.length,
                        contentList = [];
                    if (hasResults) {
                        tags.forEach(function (tag) {
                            ContentService.findContentById(tag.contentId)
                                .then(function (content) {
                                    if (content) {
                                        contentList.push(content);
                                    }
                                }, function (err) {
                                    searchVm.error = err;
                                });
                        });
                    }
                    searchVm.results = contentList;
                    searchVm.hasNoResults = !hasResults;
                }, function (err) {
                    searchVm.error = 'Could not search for that tag. An error occurred.';
                    console.log(err);
                });
        }

        function selectContent(index) { // TODO(bobby): move to rootScope function.
            $rootScope.currentContent = searchVm.results[index];
            console.log('Current Content:', $rootScope.currentContent);
            $location.search('q', null); // Clear the query.
            searchVm.$location = $location.path('/content');
        }

        function prepareSearch() {
            var searchParams = $location.search();
            if (searchParams.q) {
                searchByTag(searchParams.q);
            }
        }
    }
})();
