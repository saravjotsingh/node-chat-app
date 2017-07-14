var socket = io();

function scrollToBottom(){
    //selector
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    
    //height
    var clientHeight =  messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight(); 
    var preMessageHeight = newMessage.prev().innerHeight();
    
    
    if(clientHeight + scrollTop + newMessageHeight + preMessageHeight >=  scrollHeight){
        messages.scrollTop(scrollHeight);
    }
};



socket.on('connect', function () {
//    console.log('Connect to Server');
    var params = jQuery.deparam(window.location.search);
    socket.emit('join',params,function(err){
       if(err){
           alert(err);
           window.location.href = "/"
       }else{
          console.log('no error'); 
       }
    });


    socket.on('newMessage', function (data) {


        var formattedTime = moment(data.At).format('h:mm a');

//        var li = jQuery('<li></li>');
//        li.text(`${data.from} ${formattedTime}: ${data.text}`);
//
//        jQuery('#messages').append(li)
        
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template,{
            text:data.text,
            from:data.from,
            At:formattedTime
        });
        
        
        jQuery('#messages').append(html)
        scrollToBottom();
    });

});

socket.on('newLocationMessage', function (data) {

    var formattedTime = moment(data.At).format('h:mm a');

//    var li = jQuery('<li></li>');
//    var a = jQuery('<a target="_blank">My Current Location</a>')
//    li.text(`${data.from} ${formattedTime}: `);
//    a.attr('href', data.url);
//    li.append(a);
//    jQuery('#messages').append(li);
var template = jQuery("#location-message-template").html();
    
    var html = Mustache.render(template,{
        from:data.from,
        url:data.url,
        At:formattedTime
    });
    
    jQuery('#messages').append(html);
    scrollToBottom();
});




socket.on('disconnect', function () {
    console.log("server disconnected");
});


socket.on('updateUserList',function(users){
    var ol = jQuery('<ol></ol>');
    users.forEach(function(users){
        ol.append(jQuery('<li></li>').text(users))
    });
    
    jQuery("#users").html(ol)
    
})




jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
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

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

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
