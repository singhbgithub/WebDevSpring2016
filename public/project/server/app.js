(function() {
    'use strict';
    module.exports = function (app, mongoose, userModel) {
        var reviewSchema = require(__dirname + '/models/review.schema.js')(mongoose);
        var tagSchema = require(__dirname + '/models/tag.schema.js')(mongoose);
        var messageSchema = require(__dirname + '/models/message.schema.js')(mongoose);
        var contentSchema = require(__dirname + '/models/content.schema.js')(mongoose);
        var reviewModel = require(__dirname + '/models/review.model.js')(mongoose, reviewSchema);
        var tagModel = require(__dirname + '/models/tag.model.js')(mongoose, tagSchema);
        var messageModel = require(__dirname + '/models/message.model.js')(mongoose, messageSchema);
        var contentModel = require(__dirname + '/models/content.model.js')(mongoose, contentSchema);
        require(__dirname + '/services/user.service.js')(app, userModel);
        require(__dirname + '/services/security.service.js')(app, userModel);
        require(__dirname + '/services/review.service.js')(app, reviewModel);
        require(__dirname + '/services/tag.service.js')(app, tagModel);
        require(__dirname + '/services/message.service.js')(app, messageModel);
        require(__dirname + '/services/content.service.js')(app, contentModel);
    };
})();
