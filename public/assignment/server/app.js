(function() {
    'use strict';
    module.exports = function (app) {
        // TODO(bobby): why are we passing in the models?
        var userModel = require(__dirname + '/models/user.model.js')();
        require(__dirname + '/services/user.service.js')(app, userModel);
        var formModel = require(__dirname + '/models/form.model.js')();
        require(__dirname + '/services/form.service.js')(app, formModel);
        require(__dirname + '/services/field.service.js')(app, formModel);
    };
})();