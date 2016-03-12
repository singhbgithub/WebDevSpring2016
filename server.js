(function() {
    'use strict';
    var express = require('express'),
        app = express(),
        ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
        port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

    app.use(express.static(__dirname + '/public'));
    app.listen(port, ipaddress);
})();