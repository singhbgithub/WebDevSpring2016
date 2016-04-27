(function() {
    'use strict';

    module.exports = function(mongoose) {
        var tagSchema = mongoose.Schema({
            // ID explicitly declared to be manually set based on the userId and contentId.
            '_id': {'type': String, 'required': true},
            // user id of the person that created the tag
            'userId': {'type': String, 'required': true},
            'contentId': {'type': String, 'required': true},
            'name': {'type': String, 'minlength': 1, 'maxlength': 32, 'required': true}
        }, {'collection': 'project.tag'});
        return tagSchema;
    };
})();
