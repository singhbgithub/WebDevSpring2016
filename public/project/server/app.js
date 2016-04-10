(function() {
    'use strict';
    module.exports = function (app) {
        var userModel = require(__dirname + '/models/user.model.js')();
        var contentModel = require(__dirname + '/models/content.model.js')();
        require(__dirname + '/services/user.service.js')(app, userModel);
        require(__dirname + '/services/content.service.js')(app, contentModel);
    };
})();
