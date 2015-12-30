var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join the room' + room);

$('.room-title').text(room);

socket.on('connect', function () {
	console.log('Connected to socket.io server!');

	// Make the request to join the room user picked
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = $('.messages');
	var $message = $('<li class="list-group-item"></li>');

	console.log('New message:');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format("h:mm a") + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
});

// Handles submitting of new message
var $form = $('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('#message');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});
