(function() {
    'use strict';
    angular.module('ThotApp').factory('ContentService', ContentService);

    function ContentService() {
        // Array Remove - By John Resig (MIT Licensed) - put in reusable module TODO(bobby)
        var _remove = function(arr, from, to) {
            var rest = arr.slice((to || from) + 1 || arr.length);
            arr.length = from < 0 ? arr.length + from : from;
            return arr.push.apply(arr, rest);
        };
        // TODO(bobby): this is gonna mess up page load time
        var _stored_content = [
            {'_id': '000', 'likes': 10, 'comments': ['beb'],
                'src': 'http://images5.fanpop.com/image/photos/30500000/alice-in-wonderland-cartoon-drawing-30589688-1000-766.jpg',
                'tags': ['alice', 'wonderland'], 'userId': 1},
            {'_id': '001', 'likes': 5, 'comments': ['y doe', 'ugly'],
                'src': 'https://s-media-cache-ak0.pinimg.com/736x/6b/cb/7d/6bcb7de9aabb9cdd2328c75a8955353f.jpg',
                'tags': ['alice', 'cat'], 'userId': 1},
            {'_id': '002', 'likes': 6, 'comments': ['6'],
                'src': 'http://assets.audiomack.com/dj-likkle-platinum/d83cf7df01de62309540f1f80f9150dc.jpeg',
                'tags': ['poster', '6', 'god'], 'userId': 2},
            {'_id': '003', 'likes': 1, 'comments': ['god'],
                'src': 'http://wordonroad.net/wp-content/uploads/2013/06/draketime12.jpg',
                'tags': ['chubs', 'partynextdoor'], 'userId': 2},
            {'_id': '004', 'likes': 3, 'comments': ['jungle'],
                'src': 'http://www.chartattack.com/wp-content/uploads/2015/02/Drake-Jungle.png',
                'tags': ['meek', 'meager', 'mill', 'jungle'], 'userId': 2},
            {'_id': '005', 'likes': 701, 'comments': ['know yourself'],
                'src': 'http://assets.audiomack.com/daddykristina/b16489a03775b9ea1ed1b69078e788b3.jpeg',
                'tags': ['drake'], 'userId': 3},
        ];

        var service = {};

        service.findAllContentForUser = function(userId, callback) {
            var userContent = [];
            for (var i = 0; i < _stored_content.length; i++) {
                var content = _stored_content[i];
                if (content.userId === userId) {
                    userContent.push(content);
                }
            }
            callback(userContent);
        };

        service.createContentForUser = function(userId, content, callback) {
            content._id = new Date().getTime();
            content.userId = userId;
            _stored_content.push(content);
            callback(content);
        };

        service.deleteContentById = function(contentId, callback) {
            for (var i = 0; i < _stored_content.length; i++) {
                var content = _stored_content[i];
                if (content._id === contentId) {
                    _remove(_stored_content, i);
                    callback(_stored_content);
                    break; // keeps the stack frame since the break hasn't happened TODO(bobby)
                }
            }
        };

        service.updateContentById = function(contentId, newContent, callback) {
            for (var i = 0; i < _stored_content.length; i++) {
                var content = _stored_content[i];
                if (content._id === contentId) { // can abstract this loop w/ a callback for diff actions. TODO(bobby)
                    _stored_content[i] = newContent;
                    _stored_content[i]._id = content._id;
                    _stored_content[i].userId = content.userId;
                    callback(content);
                    break; // keeps the stack frame since the break hasn't happened TODO(bobby)
                }
            }
        };

        return service;
    }
})();