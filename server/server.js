const express = require('express');
const Path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message.js');

const {
    isRealString
} = require('./utils/validation.js')
const {
    Users
} = require('./utils/users.js');
var app = express();
const port = process.env.PORT || 3000;
const PublicPath = Path.join(__dirname, '../public');

var users = new Users();

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(PublicPath));

io.on('connection', (socket) => {


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {

            return callback('Name and Room neded');
        } else {
            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);

            io.to(params.room).emit('updateUserList', users.getUserList(params.room));

            socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));

            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        }
    });






    socket.on('createMessage', (data, callback) => {
//        console.log('Create message', data);
        var user = users.getUser(socket.id);
        if(user && isRealString(data.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, data.text));    
        }
        
        callback();

    });



    socket.on('getLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));    
        }
        
        
    });


    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left.`));
        }
    });

});




server.listen(port, () => {
    console.log(`Listening on ${port}`);
})
