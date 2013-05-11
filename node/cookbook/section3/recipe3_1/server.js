var http = require('http');
var url = require('url');
var profiles = require('./profiles');

var file = require('fs').readFileSync('client.html');

http.createServer(function (req, res){
    var urlObj = url.parse(req.url, true);
    console.log(urlObj);
    var cb = urlObj.query.callback;
    var who = urlObj.query.who;
    var profile;

    if(cb && who){
        profile = cb + "(" + JSON.stringify(profiles[who]) + ")";
        res.end(profile);
    }
    else{
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(file);
    }
}).listen(8080);
