var express = require('express');
var http = require('http');
var crypto = require('crypto');

var userStore = {};
var app = express();

app.use(express.bodyParser());

app.get('/', function (req, res) {
    res.sendfile('regform.html');
    });

app.post('/', function (req, res) {
    if (req.body && req.body.user && req.body.pass){
        //console.log(req.body);
        var hash = crypto
                .createHash('md5')
                .update(req.body.pass)
                .digest('hex');

        userStore[req.body.user] = hash;
        res.send('Thank you for registration, ' + req.body.user);
        console.log(userStore);
    }
});

http.createServer(app).listen(8080);
