const express = require('express');
const Path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message.js');

var app = express();
const port = process.env.PORT || 3000;
const PublicPath = Path.join(__dirname, '../public');

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(PublicPath));

io.on('connection', (socket) => {
            console.log('new connection');


            socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));


            socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));


            socket.on('createMessage', (data, callback) => {
                console.log('Create message', data);
                io.emit('newMessage', generateMessage(data.from, data.text));
                callback();

            });


    
            socket.on('getLocationMessage', (coords) => {
                    io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));
                    });
                

                socket.on('disconnect', () => {
                    console.log("client Disconnected");
                });

            });




        server.listen(port, () => {
            console.log(`Listening on ${port}`);
        })
