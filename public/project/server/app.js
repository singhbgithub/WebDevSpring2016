(function() {
    'use strict';
    module.exports = function (app, mongoose) {
        var userSchema = require(__dirname + '/models/user.schema.js')(mongoose);
        var userModel = require(__dirname + '/models/user.model.js')(mongoose, userSchema);
        var contentModel = require(__dirname + '/models/content.model.js')(mongoose);
        require(__dirname + '/services/user.service.js')(app, userModel);
        require(__dirname + '/services/content.service.js')(app, contentModel);
    };
})();
