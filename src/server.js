let http = require('http');
let socketio = require('socket.io');
let fs = require('fs');

let clients = [];

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
    clients.map((client) => client.emit('server-notification', notification));
};

let server = http.createServer(clientHandler);
let io = socketio.listen(server);

io.sockets.on('connection', (client) => {

    console.log('New client connected');    
    clients.push(client);
    console.log('Total connected clients: ', clients.length);

    client.on('submit-notification', pushNotification);

    client.on('disconnect', () => {

        console.log('Client disconncted');
        
        let index = clients.indexOf(client);
        clients.splice(index, 1);
        console.log('Total connected clients: ', clients.length);
    });
});

server.listen(9090);
console.log('Server started on 9090');
