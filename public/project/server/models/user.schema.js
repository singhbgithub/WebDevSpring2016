(function() {
    'use strict';
    module.exports = function(mongoose) {
        var userSchema = mongoose.Schema({
            'firstName': {'type':String, 'required': true},
            'lastName': {'type':String, 'required': true},
            'username': {'type': String, 'unique': true, 'required': true},
            'password': {'type': String, 'required': true},
            'email': {'type': String, 'unique': true, 'required': true},
            'phone': {'type': String, 'required': true}
        }, {'collection': 'project.user'});
        return userSchema;
    };
})();
