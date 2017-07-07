const express = require('express');
const Path = require('path');
const http = require('http');
const socketIO = require('socket.io');


var app = express();
const port = process.env.PORT || 3000;
const PublicPath = Path.join(__dirname,'../public');

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(PublicPath));

io.on('connection',(socket)=>{
    console.log('new connection');
    
    
//    socket.emit('newMessage',{
//        from:'Saravjot Singh',
//        text:"kidddaa???",
//        At:new Date()   
//    });
    
    
    socket.on('createMessage',(data)=>{
        console.log('Create message');
        console.log(data);
        io.emit('newMessage',{
            from:data.from,
            text:data.text,
            at:new Date().getTime()
        });
        
    });
    
    
    socket.on('disconnect',()=>{
       console.log("client Disconnected"); 
    });

});




server.listen(port,()=>{
    console.log(`Listening on${port}`);
})