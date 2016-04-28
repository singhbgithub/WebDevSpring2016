(function() {
    'use strict';

    module.exports = function(mongoose) {
        var messageSchema = mongoose.Schema({
            'timestamp': {'type': Date, 'default': Date.now()},
            'fromUserId': {'type': String, 'required': true},
            'toUserId': {'type': String, 'required': true},
            // Messages are about a particular piece of content. It's data that defines the user to
            // user relationship in addition to the actual message text.
            'contentId': {'type': String, 'required': true},
            'subject': {'type': String, 'maxlength': 32, 'required': true},
            'text': {'type': String, 'maxlength': 128, 'required': true}
        }, {'collection': 'project.message'});
        return messageSchema;
    };
})();
