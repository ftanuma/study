var http = require('http');
var username = 'dave';
var password = 'hoge';
var realm = 'Node Cookbook';

http.createServer(function(req, res) {
    var auth, login;

    if(!req.headers.authorization) {
        authenticate(res);
        return;
    }

    auth = req.headers.authorization.replace(/^Basic /, '');
    auth = (new Buffer(auth, 'base64').toString('utf8'));

    login = auth.split(':'); // username to [0], password to [1]

    if (login[0] === username && login[1] === password) {
        res.end('I like soft cheese!');
        return;
    }

    authenticate(res);
}).listen(8080);

function authenticate(res) {
    res.writeHead(401, {
        'WWW-Authenticate': 'Basic realm="' + realm + '"'
    });
    res.end(' Need Authentication ');
}
