var csv = require('ya-csv');
var writer = csv.createCsvFileWriter('data.csv');

var data = [['a','b','c'],['d','e','f']];

data.forEach(function(rec){
    writer.writeRecord(rec);
});
