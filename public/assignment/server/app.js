(function() {
    'use strict';
    module.exports = function (app, mongoose) {
        // Load user model & service.
        var userModel = require(__dirname + '/models/user.model.js')(mongoose);
        require(__dirname + '/services/user.service.js')(app, userModel);
        // Load form model & service.
        var formModel = require(__dirname + '/models/form.model.js')(mongoose);
        require(__dirname + '/services/form.service.js')(app, formModel);
        // Load field model & service.
        require(__dirname + '/services/field.service.js')(app, formModel);
    };
})();
