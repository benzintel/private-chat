var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('subscribe', function(room) {
    console.log('joining room', room);
    socket.join(room);
  });

  socket.on('send message', function(data) {
    console.log('sending room post', data.room);
    socket.broadcast.to(data.room).emit('conversation private post', {
        message: data.message
    });
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
