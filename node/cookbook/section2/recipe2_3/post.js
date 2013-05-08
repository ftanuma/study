var http = require('http');
var urlOpts = {
    hots: 'localhost',
    path: '/',
    port: '8080',
    method: 'POST'
};

var request = http.request(urlOpts, function (res) {
    res.on('data', function (chunk) {
	console.log(chunk.toString());
    }).on('error', function (e) {
	console.log('Error: ' + e.stack);
    });
});

process.argv.forEach(function (postItem, index){
    if(index > 1){
	request.write(postItem);
    }
});

request.end();

