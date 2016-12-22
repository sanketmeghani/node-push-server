let http = require('http');
let socketio = require('socket.io');
let fs = require('fs');

let clientSockets = [];

let clientHandler = (request, response) => {

    fs.readFile(__dirname + '/../index.html', (error, data) => {

        if (error) {
            response.writeHead(500);
            return response.end('Unable to load index.html');
        }

        response.writeHead(200);
        response.end(data);
    });
};

let pushNotification = (notification) => {

    console.log('Pushing notification', JSON.stringify(notification));
    clientSockets.map((socket) => socket.emit('server-notification', notification));
};

let server = http.createServer(clientHandler);
let io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
    
    socket.on('push', pushNotification);
    clientSockets.push(socket);
});

server.listen(9090);
console.log('Server started on 9090');
