(function() {
    'use strict';
    var express = require('express'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        multer = require('multer'),
        assignmentServerModule = require(__dirname + '/public/assignment/server/app.js'),
        projectServerModule = require(__dirname + '/public/project/server/app.js'),
        app = express(),
        ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
        port = process.env.OPENSHIFT_NODEJS_PORT || 3000,
        connectionString = 'mongodb://127.0.0.1:27017/webdev2016';

    // Root of the site.
    app.use(express.static(__dirname + '/public'));
    // For parsing application/json
    app.use(bodyParser.json());
    // For parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // For parsing multipart/form-data
    app.use(multer());

    // Connect to the database dependent on environment.
    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    mongoose.connect(connectionString);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // Load the server for the assignment directory.
        assignmentServerModule(app, mongoose);
        // Load the server for the project directory. Really should have a separate db for project.
        projectServerModule(app, mongoose);
        app.listen(port, ipaddress);
    });
})();