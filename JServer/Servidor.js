var express = require('express');
var fs = require('fs');

var privateKey = fs.readFileSync('certs/server.key');
var certificate = fs.readFileSync('certs/server.crt');

var credentials = {key: privateKey, cert: certificate};

var https = require('https');
https.port = 4443;

var app = express(credentials);
app.port = 4080;

class Poligono {
    constructor(alto, ancho) {
      this.alto = alto;
      this.ancho = ancho;
    }
};

app.get('/', function(req,res) {
    var arrayPol = [];
    for(i=0;i<50;i++)
        arrayPol[i] = new Poligono(i,50-i);

    var pol = new Poligono(1,1);
    res.send(arrayPol);
});

https.createServer(credentials, app).listen(https.port, function () {
    console.log('Example app with https listening on port ' + https.port +
     '! Go to https://localhost:' + https.port + '/')
  });

app.listen(app.port, function () {
    console.log('Example app listening on port ' + app.port +
     '! Go to http://localhost:' + app.port + '/')
  });