(function() {
    'use strict';

    module.exports = function(mongoose) {
        var reviewSchema = mongoose.Schema({
            // ID explicitly declared to be manually set based on the userId and contentId. 
            '_id': {'type': String, 'required': true},
            'userId': {'type': String, 'required': true},
            'contentId': {'type': String, 'required': true},
            'rating': {'type': Number, 'min': 1, 'max': 10, 'required': true}
        }, {'collection': 'project.review'});
        return reviewSchema;
    };
})();
