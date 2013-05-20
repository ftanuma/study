var profiles = require('./profiles');
var parser = new (require('xml2js')).Parser({
    trim: true,
    explicitArray: false
});


function buildXml(rootObj, rootName){
    var xml = '<?xml version=1.0 encoding="UTF-8"?>\n';
    rootName = rootName || 'xml';
    xml += '<' + rootName + '>\n';

    (function traverse(obj) {
//        console.log("travarse");
//        console.log(obj);
        Object.keys(obj).forEach(function (key) {
            console.log('key is ' + key);
            var open = '<' + key + '>';
            var close = '</' + key + '>\n';
            var isTxt = (obj[key] && {}.toString.call(obj[key]) !== '[object Object]');
            xml += open;

            console.log('mark');
            console.log(obj[key]);
            console.log({}.toString.call(obj[key]));
            
            if(isTxt){
                xml += obj[key];
                xml += close;
                return;
            }
            
            xml += '\n';
            traverse(obj[key]);
            xml += close;
        });
    }(rootObj));
    
    xml += '</' + rootName + '>\n';
    return xml;
}

profiles = buildXml(profiles, 'profiles').replace(/name/g, 'fullname');
//console.log(profiles);

parser.parseString(profiles, function(err, obj){
    profiles = obj.profiles;
    profiles.ryan.fullname = "Ryan HogeHoge";
//    console.log(profiles.ryan);
});

//console.log(profiles);

