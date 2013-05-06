var http = require('http');
var form = require('fs').readFileSync('form.html');
var querystring = require('querystring');
var util = require('util');
var maxData = 48;// bytes

http.createServer(function (req, res){
    if(req.method === 'GET'){
	res.writeHead(200, {'Content-type' : 'text/html'});
	res.end(form);
    }
    else if(req.method === 'POST'){
//	console.log(req.url);
//	console.log(req.headers);
	var postData = '';

	req.on('data', function (chunk) {
//	    console.log('this is chunck: ' + chunk);
	    postData += chunk;

	    if(postData.length > maxData){
		postData = '';
		this.pause(); // what is "this" ? --> req
		if(req === this){
		    console.log('hooooooo');
		}
//		console.log(this);
		res.writeHead(413); // 415 Request Entity Too Large
		res.end('Too big POST data');
	    }
	}).on('end', function() {
	    if(!postData){
		res.end();
		return;
	    }
	    var postDataObject = querystring.parse(postData);
//	    console.log('User posted following data\n' + postData);
	    res.end('Data posted by you:\n' + util.inspect(postDataObject));
	});
    }
}).listen(8080);
