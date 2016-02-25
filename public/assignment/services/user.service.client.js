(function(){
    angular.module('FormBuilderApp').factory('UserService', UserService);

    function UserService() {
        // Array Remove - By John Resig (MIT Licensed)
        Array.prototype.remove = function(from, to) {
            var rest = this.slice((to || from) + 1 || this.length);
            this.length = from < 0 ? this.length + from : from;
            return this.push.apply(this, rest);
        };
        var _users = []; // Declare empty array as required in assignment, though seems extraneous
        _users = [
            {
                "_id":123,
                "firstName":"Alice",
                "lastName":"Wonderland",
                "username":"alice",
                "password":"alice",
                "roles": ["student"]
            },
            {
                "_id":234,
                "firstName":"Bob",
                "lastName":"Hope",
                "username":"bob",
                "password":"bob",
                "roles": ["admin"]
            },
            {
                "_id":345,
                "firstName":"Charlie",
                "lastName":"Brown",
                "username":"charlie",
                "password":"charlie",
                "roles": ["faculty"]
            },
            {
                "_id":456,
                "firstName":"Dan",
                "lastName":"Craig",
                "username":"dan",
                "password":"dan",
                "roles": ["faculty", "admin"]
            },
            {
                "_id":567,
                "firstName":"Edward",
                "lastName":"Norton",
                "username":"ed",
                "password":"ed",
                "roles": ["student"]
            }
        ];

        var service = {};
        service.findUserByCredentials = function(username, password, callback) {
            for (var i = 0; i < _users.length; i++) {
                var user = _users[i];
                if (user.username === username && user.password === password) {
                    callback(user);
                    break; // keeps the stack frame since the break hasn't happened TODO(bobby)
                }
            }
        }

        service.findAllUsers = function(callback) {
            callback(_users);
        }

        service.createUser = function(user, callback) {
            var user_found = false;
            var set_user_found = function () {
                user_found = true;
            };
            service.findUserByCredentials(user.username, user.password, set_user_found);
            if (!user_found) {
                user._id = (new Date).getTime();
                _users.push(user); // Issue with same ref - need to copy obj TODO(bobby)
                callback(user);
            };
        }

        service.deleteUserById = function(userId, callback) {
            for (var i = 0; i < _users.length; i++) {
                var user = _users[i];
                if (user._id === userId) {
                    _users.remove(i);
                    callback(_users);
                    break; // keeps the stack frame since the break hasn't happened TODO(bobby)
                }
            }
        }

        service.updateUser = function(userId, user, callback) {
            for (var i = 0; i < _users.length; i++) {
                var currentUser = _users[i];
                if (currentUser._id === userId) { // can abstract this loop w/ a callback for diff actions. TODO(bobby)
                    _users[i] = user; // Issue here with same ref - need to copy obj TODO(bobby)
                    _users[i]._id = currentUser._id;
                    callback(currentUser);
                    break; // keeps the stack frame since the break hasn't happened TODO(bobby)
                }
            }
        }

        return service;
    }
})();