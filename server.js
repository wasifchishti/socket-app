var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function (socket) {

	console.log('User connected via socket.io!');

	socket.on('disconnect', function () {
		var userData = clientInfo[socket.id];

		// Check if the user has data
		if(typeof clientInfo[socket.id] !== 'undefined') {
			socket.leave(userData.room);

			io.to(userData.room).emit('message' , {
				name: 'System',
				text: userData.name + ' has left!',
				timestamp: moment.valueOf()
			});
			delete clientInfo[socket.id];
		}
	});

	// Request to join the room
	socket.on('joinRoom', function (req) {

		clientInfo[socket.id] = req;
		socket.join(req.room);

		// Send the user joined message to everyone in the room
		socket.broadcast.to(req.room).emit('message' , {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		});
	});

	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);

		message.timestamp = moment().valueOf();

		// Only send the message to the users who are in the same room as current user
		io.to(clientInfo[socket.id].room).emit('message', message);
	});

	// Initial system message
	socket.emit('message', {
		name: 'System',
		text: "Welcome to the chat application!",
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function (){
	console.log('Server started!');
});