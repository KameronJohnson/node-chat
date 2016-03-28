var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

//middleware
app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("NodeChat listening at", addr.address + ":" + addr.port);
});

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
})

io.sockets.on('connection', function(socket) {
  //send message event
  socket.on('send message', function(data) {
    io.sockets.emit('new message', {msg: data});
  });
});