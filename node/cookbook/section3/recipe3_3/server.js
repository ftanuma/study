var http=require('http');
var fs=require('fs');
var path=require('path');
var profiles=require('./profiles');
var buildXml = require('./buildXml');
var index = fs.readFileSync('index.html');

var mimes = {xml: "application/xml", json: "application/json"};

function output(content, format, rootNode) {
    if(!format || format === 'json'){
        return JSON.stringify(content);
    }

    if(format === 'xml'){
        return buildXml(content, rootNode);
    }
}

var routes = {
    'profiles' : function(format){
        return output(Object.keys(profiles), format);
    },
    '/profile': function(format, basename) {
        return output(profiles[basename], format, basename);
    }
};

//
//
//
http.createServer(function (req, res) {
    var dirname = path.dirname(req.url);
    var extname = path.extname(req.url);
    var basename = path.basename(req.url, extname);
    extname = extname.replace('.','');// remove period

    console.log('url = ' + req.url);
    console.log('dirname = ' + dirname);
    console.log('basename = ' + basename);

    res.setHeader("Content-Type", mimes[extname] || 'text/html');
    if (routes.hasOwnProperty(dirname)){
        console.log('calling ' + dirname);
        res.end(routes[dirname](extname, basename));  // calling output()
        return;
    }

    if(routes.hasOwnProperty(basename)){
        console.log('calling ' + basename);
        res.end(routes[basename](extname));
        return;
    }

    console.log('returning index.html');
    res.end(index);
}).listen(8080);

