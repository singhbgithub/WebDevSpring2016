(function() {
    'use strict';
    var express = require('express'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        multer = require('multer'),
        passport = require('passport'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
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
    
    // Configure session for the server.
    app.use(cookieParser());
    app.use(session({
        'secret': process.env.SESSION_SECRET || 'themotion',
        'cookie': { maxAge: (60000 * 24 * 30)},
        'resave': true,
        'saveUninitialized': true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

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
        // FIXME(bobby): find a workaround for the 2 lines below.
        var projectUserSchema = require(__dirname + '/public/project/server/models/user.schema.js')(mongoose);
        var projectUserModel = require(__dirname + '/public/project/server/models/user.model.js')(mongoose, projectUserSchema);
        // Load the server for the assignment directory.
        assignmentServerModule(app, mongoose, projectUserModel);
        // Load the server for the project directory. Really should have a separate db for project.
        projectServerModule(app, mongoose, projectUserModel);
        app.listen(port, ipaddress);
    });
})();