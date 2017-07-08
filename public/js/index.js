var socket = io();




socket.on('connect', function () {
    console.log('Connect to Server');

    socket.on('newMessage', function (data) {
        console.log('New message arrived');
        console.log(data);

        var li = jQuery('<li></li>');
        li.text(`${data.from}: ${data.text}`);

        jQuery('#messages').append(li)
    });

});



socket.on('disconnect', function () {
    console.log("server disconnected");
});




jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });


});
