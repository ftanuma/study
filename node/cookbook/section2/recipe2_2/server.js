var http = require('http');
var formidable = require('formidable');
var form = require('fs').readFileSync('form.html');
//var querystring = require('querystring');
//var util = require('util');
//var maxData = 48 * 1024;// bytes

http.createServer(function (req, res){
    if(req.method === 'GET'){
	res.writeHead(200, {'Content-type' : 'text/html'});
	res.end(form);
    }
    else if(req.method === 'POST'){
//	console.log(req.url);
//	console.log(req.headers);
	var incoming = new formidable.IncomingForm();
	incoming.uploadDir = 'uploads';
	incoming.on('file', function (field, file) {
	    if(!file.size){
		return;
	    }
	    res.write(file.name + ' is received\n');
	}).on('fileBegin', function(field,file){
	    if(file.name){
		file.path += '-' + file.name;
	    }
	}).on('field', function (field, value) {
	    res.write(field + ' : ' + value + '\n');
	}).on('end', function() {
	    res.end('received all files');
	});
	incoming.parse(req);   
    }
}).listen(8080);
