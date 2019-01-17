var socket = io();

function scrollToBottom(){
    //Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    });

    $('#messages').append(html);
    scrollToBottom();
});

$('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    });
});

var locationBtn = $('#send-Location');

locationBtn.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    var originalBtnName = locationBtn.text();
    locationBtn.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationBtn.removeAttr('disabled').text(originalBtnName);

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationBtn.removeAttr('disabled').text(originalBtnName);
        alert('Unable to share location.');
    });
});