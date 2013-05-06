var connect = require('connect');
var form = require('fs').readFileSync('form.html');
var util = require('util');

var app = connect()
.use(connect.bodyParser())
.use(connect.limit('1kb'))
.use(function(req, res){
    if(req.method === 'GET'){
	res.writeHead(200, {'Content-type' : 'text/html'});
	res.end(form);
    }
    else if(req.method === 'POST'){
	console.log('User POSTed following data:\n' + req.body.toString());
	res.end('You POSTed:\n' + util.inspect(req.body));
    }
}).listen(8080);
