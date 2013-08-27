var fs = require('fs');
var path = require('path');
var ExifImage = require('exif').ExifImage;

fs.readdir('./', function(err, files) {
    files.forEach(function(filename) {
        var extname = path.extname(filename);
//        console.log(extname);
        if (extname == '.JPG' || extname == '.jpg'){
            console.log('Start parsing EXIF data of ' + filename);
            parseExif(filename);
        }
    });
});

function parseExif(filename){         
    try {
        console.log('Start parsing EXIF data of ' + filename);
        new ExifImage( { image : filename }, function (error, exifData) {
            if(error)
                console.log('Error:' + error.message);
            else{
                console.log('End parsing EXIF data of ' + filename);
                console.log(exifData);
                return exifData;
            }
        });
    } catch (error) {
        console.log('Error:' + error.message);
    }
}
