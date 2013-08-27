var http = require('http');
var clientHtml = require('fs').readFileSync('now_client.html');
var plainHttpServer = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type' : 'text/html' });
    res.end(clientHtml);
}).listen(8080);

var everyone = require('now').initialize(plainHttpServer);
everyone.set('origins', ['localhost:8080', '127.0.0.1']);

everyone.now.base64 = function (sentence, cb) {
    cb(new Buffer(sentence).toString('base64'));
}

everyone.on('connect', function () {
    this.now.square(6);
});
       
       
