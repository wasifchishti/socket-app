var socket = io();

socket.on('connect', function () {
	console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {
	console.log('New message:');
	console.log(message.text);

	$('.messages').append('<p> ' + message.text + '</p>');
});

// Handles submitting of new message
var $form = $('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	socket.emit('message', {
		text: $form.find('#message').val()
	});

	$('#message').val('');
});