(function() {
    'use strict';
    module.exports = function (app) {
        var model = require(__dirname + '/models/user.model.js')();
        require(__dirname + '/services/user.service.js')(app, model);
    };
})();