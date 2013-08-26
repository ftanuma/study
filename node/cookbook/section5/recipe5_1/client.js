var WSClient = require('websocket').client;

new WSClient()
    .on('connect', function(connection) {
        var msg = 'Hello';
        connection.send(msg);
        console.log('Sent: ' + msg);
        
        connection.on('message', function(msg) {
            console.log('Recv:' + msg.utf8Data);
        }).on('close', function(code, desc) {
            console.log('Disconnect: ' + code + ' - ' + desc);
        }).on('error', function(err) {
            console.log('Error: ' + error.String());
        });
    }).on('connectionFailed', function(error) {
        console.log('Connection Error :' + error.String());
    }).connect('ws://localhost:8080/', null, 'http://localhost:8080');
