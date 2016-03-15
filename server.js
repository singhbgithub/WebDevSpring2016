(function() {
    'use strict';
    var express = require('express'),
        bodyParser = require('body-parser'),
        multer = require('multer'),
        assignmentServerModule = require(__dirname + '/public/Assignment/server/app.js'),
        app = express(),
        ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
        port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

    app.use(express.static(__dirname + '/public'));

    // For parsing application/json
    app.use(bodyParser.json());
    // For parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // For parsing multipart/form-data
    app.use(multer());

    // Load the server component for the assignment's directory.
    assignmentServerModule(app);

    app.listen(port, ipaddress);
})();