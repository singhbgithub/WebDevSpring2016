(function() {
    'use strict';

    module.exports = function(mongoose) {
        var userSchema = mongoose.Schema({
            'firstName': String,
            'lastName': String,
            'username': {'type': String, 'unique': true, 'required': true},
            'password': {'type': String, 'required': true},
            'emails': [String],
            'phones': [String]
        }, {'collection': 'user'});
        return userSchema;
    };
})();