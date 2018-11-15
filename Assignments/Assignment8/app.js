var express = require('express')
var app = express()

//set the template engine ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))


//routes
//show the index ejs file
app.get('/', function(req, res){
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000, function(){
    console.log("running on port 3000");
})



//socket.io instantiation
var io = require("socket.io")(server)

//keeping track of users -- number and names
var userCount = 0;
var onlineUsers=[];


io.on('connection', function(socket){
    //default username
	socket.username = "Anonymous";
    //console.log(socket)
    //increases the count by 1 to reflect new person going to website
     userCount++;
    //adds unique id and the correspoding username to array
    onlineUsers.push({'id':socket.id,'username':socket.username});

    //changes the username associated with each person's unique id
     socket.on('change_username', function(data){
        var index = 0;
        //finds the unique id of the person changing their username and then changes the username associated with the id
        for (var i = 0; i < onlineUsers.length; i++){
            if (onlineUsers[i].id == socket.id){
                index = i;
            }
        }
        onlineUsers[index].username = data.username;
        //console.log(socket.username);
        //updated the new userlist on the webpage to reflect the username change
        io.sockets.emit('userList',{userList: onlineUsers});

    })
    //update the count when someone comes online
    io.sockets.emit('userCount',{userCount: userCount});
    //update the list of users when someone comes online
    io.sockets.emit('userList',{userList: onlineUsers});
    
    //when someone leaves the website, the usercount should go down and then the userlist should be updated
    socket.on('disconnect',function(){
        userCount--;
        var removeIndex = 0;
        for (var i =0; i < onlineUsers.length;i++){
            if(onlineUsers[i].id == socket.id) {
                index=i;
            }  
        }
        onlineUsers.splice(index);
            
        //updating count and user list
        io.sockets.emit('userCount',{userCount:userCount});
        io.sockets.emit('userList',{userList: onlineUsers});
    })

	

    socket.on('new_message', function(data){
        //broadcast the new message
        var userIndex = 0;
        for (var i = 0; i< onlineUsers.length; i ++){
            if (onlineUsers[i].id == socket.id) {
                userIndex = i;
            }
        }
        io.sockets.emit('new_message', {message : data.message, username : onlineUsers[userIndex].username});
    })

    //broacasts when someone is typing a message
    socket.on('typing', function(data){
        var userIndex = 0;
        for (var i = 0; i< onlineUsers.length; i ++){
            if (onlineUsers[i].id == socket.id) {
                userIndex = i;
            }
        }
    	socket.broadcast.emit('typing', {username : onlineUsers[userIndex].username})
    })
})

