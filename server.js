var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
	console.log('a user connected', socket.id);

	socket.on('planet', function(planetData){
		// console.log('planet', planetData);
		socket.broadcast.emit('planet', planetData);
		socket.emit('planet', planetData);
	})
})

http.listen(3000, function(){
	console.log('listening on *:3000');
})