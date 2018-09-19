var express = require('express');
var fs = require('fs');
var Item = require('./item');

var privateKey = fs.readFileSync('certs/server.key');
var certificate = fs.readFileSync('certs/server.crt');

var credentials = {key: privateKey, cert: certificate};

var https = require('https');
https.port = 4443;

var app = express(credentials);
app.port = 4080;

app.get('/', function(req,res) {
    res.send(new Item("iokse"));
});

https.createServer(credentials, app).listen(https.port, function () {
    console.log('Example app with https listening on port ' + https.port +
     '! Go to https://localhost:' + https.port + '/')
  });

app.listen(app.port, function () {
    console.log('Example app listening on port ' + app.port +
     '! Go to http://localhost:' + app.port + '/')
  });