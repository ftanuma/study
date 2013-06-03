// var profiles = require('./profiles');
// var parser = new (require('xml2js')).Parser({
//     trim: true,
//     explicitArray: false
// });


module.exports = function buildXml(rootObj, rootName){
    var xml = '<?xml version=1.0 encoding="UTF-8"?>\n';
    rootName = rootName || 'xml';
    xml += '<' + rootName + '>\n';

    (function traverse(obj) {
//        console.log("travarse");
//        console.log(obj);
        Object.keys(obj).forEach(function (key) {
//            console.log('key is ' + key);
            var open = '<' + key + '>';
            var close = '</' + key + '>\n';
            var nonObj = (obj[key] && {}.toString.call(obj[key]) != "[object Object]");
            var isArray = Array.isArray(obj[key]);
            var isFunc = (typeof obj[key] == "function");

            if(isArray){
                obj[key] .forEach(function (xmlNode){
                    var childNode = {};
                    childNode[key] = xmlNode;
                    traverse(childNode);
                });
                return;
            }

            xml += open;

//            console.log('mark');
  //          console.log(obj[key]);
    //        console.log({}.toString.call(obj[key]));

            if(nonObj){
                xml += (isFunc) ? obj[key]() : obj[key];
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
