var gitSemverTags = require('git-semver-tags', [options]);
 
gitSemverTags(function(err, tags) {
  console.log(tags);
  //=> [ 'v2.0.0', 'v1.0.0' ]
});

// Utilizar funcionalidades del Ecmascript 6
'use strict'
// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/characters', { useNewUrlParser: true }, function (err) {
    if (err) throw err;

    console.log('Successfully connected');
});

var userSchema = mongoose.Schema({
        _id : String
});

var userModel = mongoose.Schema({ _id: String });
var characters = mongoose.model('characters',userSchema);

// *Cargamos el fichero app.js con la configuración de Express
// var app = require('./app');


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

app.get('/users/:id', function(req,res) {
    var nick = req.params.id;

    characters.findOne({ user : nick }, function(err, character) {
        if (err) throw err;

        if (character == null) {
            res.status(404);
          }


        console.log(character);
        
        res.status(200);
        res.send(JSON.stringify(character, null, '<br>'))
    });
});

https.createServer(credentials, app).listen(https.port, function () {
    console.log('Example app with https listening on port ' + https.port +
     '! Go to https://localhost:' + https.port + '/')
  });

app.listen(app.port, function () {
    console.log('Example app listening on port ' + app.port +
     '! Go to http://localhost:' + app.port + '/')
  });