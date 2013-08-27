var https = require('https');
var fs = require('fs');

var opts = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

https.createServer(opts, function(req, res) {
    console.log(req);
    res.writeHead(200);
    res.end('This is secure!');
}).listen(8080);
