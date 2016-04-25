(function() {
    'use strict';

    module.exports = function(mongoose) {
        var contentSchema = mongoose.Schema({
            'userId': {'type': String, 'required': true},
            'src': {'type': String, 'required': true},
            'likes': {'type': Number, 'default': 0},
            'comments': [String],
            'tags': [String]
        }, {'collection': 'project.content'});
        return contentSchema;
    };
})();
