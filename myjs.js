var socket=io();
var $chatarea=$('.chat');
var $sendButton=$('#sendButton');
var $form=$('.form');
var $textArea=$('.text');
var $signin=$('.sign');
var $userText=$('#username');
var $signinform=$('.signin');
var $chatContainer=$('.application');
var $onlineUsers=$('#onlineUsers');
var $getuserButton=$("#getUser");
$getuserButton.on('click',function(e){

e.preventDefault();
var username=$userText.val();
if(username.trim()!=""){

socket.emit('new user',username);


  $signinform.hide();
  $chatContainer.show();
}

});

socket.on('get newuser',function(data){
var html="";
for (var i = 0; i < data.length; i++) {
  html+="<li class='list-group-item'>"+data[i]+"</li>";
$onlineUsers.html(html);
}


});

$form.on('submit',function(){
var msg=$textArea.val();
socket.emit('sendMessage',msg);
$('input').val('');
return false;
}) ;

socket.on('newMessage',function(data){
var message="<div class='well'><strong>"+data.username+" :</strong> "+data.message+"</div>";
$chatarea.append(message);
$chatarea.scrollTop(1E10);
});
