var socket = io();




socket.on('connect', function () {
    console.log('Connect to Server');

    
     socket.on('newMessage', function (data) {
//        console.log('New message arrived');
//        console.log(data);
         
         var formattedTime = moment(data.At).format('h:mm a');

        var li = jQuery('<li></li>');
        li.text(`${data.from} ${formattedTime}: ${data.text}`);

        jQuery('#messages').append(li)
    });

});

socket.on('newLocationMessage', function (data) {
    
    var formattedTime = moment(data.At).format('h:mm a');

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>')
    li.text(`${data.from} ${formattedTime}: `);
    a.attr('href', data.url);
    li.append(a);
    jQuery('#messages').append(li);
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
        jQuery('[name=message]').val('');
        
    });


});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending Location...');
    
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('getLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
})
