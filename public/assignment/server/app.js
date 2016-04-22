(function() {
    'use strict';
    module.exports = function (app, mongoose) {
        // Load user model & service.
        var userSchema = require(__dirname + '/models/user.schema.js')(mongoose);
        var userModel = require(__dirname + '/models/user.model.js')(mongoose, userSchema);
        require(__dirname + '/services/user.service.js')(app, userModel);

        // Load security service. FIXME(bobby): remove project dependency *shudder*
        var projectUserSchema = require('../../project/server/models/user.schema.js')(mongoose);
        var projectUserModel = require('../../project/server/models/user.model.js')(mongoose, projectUserSchema);
        require(__dirname + '/services/security.service.js')(app, projectUserModel);
        // Load form model & service.
        var fieldSchema = require(__dirname + '/models/field.schema.js')(mongoose);
        var formSchema = require(__dirname + '/models/form.schema.js')(mongoose, fieldSchema);
        var formModel = require(__dirname + '/models/form.model.js')(mongoose, fieldSchema, formSchema);
        require(__dirname + '/services/form.service.js')(app, formModel);
        // Load field service.
        require(__dirname + '/services/field.service.js')(app, formModel);
    };
})();
