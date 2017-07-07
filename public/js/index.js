var socket = io();


socket.on('connect', function () {
    console.log('Connect to Server');

    socket.on('newMessage',function(data){
        console.log('New message arrived');
        console.log(data);
    })

});

socket.on('disconnect', function () {
    console.log("server disconnected");
});

socket.emit('createMessage',{
    from:"Sahil",
    text:'vadia tu sna'
})



 