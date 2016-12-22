let http = require('http');
let socketio = require('socket.io');
let fs = require('fs');

let clientHandler = (request, response) => {

    fs.readFile(__dirname + '/../index.html', (error, data) => {

        if (error) {
            response.writeHead(500);
            return response.end('Unable to load index.html');
        }

        response.writeHead(200);
        response.end(data);
    });
}

let server = http.createServer(clientHandler);

server.listen(9090);
console.log('Server started on 9090');