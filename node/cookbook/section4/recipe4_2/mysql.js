var mysql = require('mysql');

var ignore = [mysql.ERROR_DB_CREATE_EXISTS, mysql.ERROR_TABLE_EXISTS_ERROR];

var client = mysql.createClient({
    usr: 'root',
    password: 'xxxx',
//    debug: true
});

client.on('error', function(err){
    if(ignore.indexOf(err.number) > -1) {
        console.log('ignore error: ' + err);
        return;
    }
    throw err;
});

client.query('CREATE DATABASE quotes');
client.useDatabase('quotes');

client.query('CREATE TABLE quotes.quotes (' +
             'id INT NOT NULL AUTO_INCREMENT, ' +
             'author VARCHAR(128) NOT NULL, ' +
             'quote TEXT NOT NULL, PRIMARY KEY(id)' +
             ')'
            );

client.query('INSERT  INTO quotes.quotes (' +
             'author, quote) ' +
             'VALUES ("tanu fumi", "it\'s not good");'
            );
client.end();
             
