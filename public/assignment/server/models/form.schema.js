(function() {
    'use strict';

    module.exports = function(mongoose, fieldSchema) {
        var formSchema = mongoose.Schema({
                'userId': {'type': String, 'required': true},
                'title': {'type': String, 'default': 'New Form'},
                'fields': [fieldSchema],
                'created': {'type': Date, 'default': Date.now()},
                'updated': {'type': Date, 'default': Date.now()}
            }, {'collection': 'form'});
        return formSchema;
    };
})();
