var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var path =require('path');

var users=[];
app.use(express.static(path.join(__dirname+'/')));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
socket.on('new user',function(username){
users.push(username);
socket.username=username;

    io.emit('get newuser',users);

});
socket.on('sendMessage',function(msg){

  io.emit('newMessage',{message:msg,username:socket.username});


});

  socket.on('disconnect', function(){
    users.splice(users.indexOf(socket.username),1);
        io.emit('get newuser',users);
   console.log('user disconnected');
 });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
