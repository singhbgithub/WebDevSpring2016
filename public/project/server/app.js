(function() {
    'use strict';
    module.exports = function (app, mongoose, userModel) {
        var contentSchema = require(__dirname + '/models/content.schema.js')(mongoose);
        var contentModel = require(__dirname + '/models/content.model.js')(mongoose, contentSchema);
        require(__dirname + '/services/user.service.js')(app, userModel);
        require(__dirname + '/services/content.service.js')(app, contentModel);
    };
})();
