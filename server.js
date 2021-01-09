// create express web server
const express = require('express'); 
const app = express();
const path = require("path");
//choose port
const port = 3000;
const server = app.listen(process.env.PORT || port);
var socket = require('socket.io');
var io = socket(server, {'transports': ['websocket', 'polling']});




// using production build of main react app
app.use(express.static(path.join(__dirname, "public/")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/", "opening.html"));
});

app.get("/lobby", (req, res) => {
  res.sendFile(path.join(__dirname, "public/", "lobby.html"));
});
app.get("/performance", (req, res) => {
  res.sendFile(path.join(__dirname, "public/", "main.html"));
});
app.get("/scene1", (req, res) => {
  res.sendFile(path.join(__dirname, "public/", "francis1.html"));
});
app.get("/scene2", (req, res) => {
  res.sendFile(path.join(__dirname, "public/", "francis2.html"));
});
app.get("/scene3", (req, res) => {
  res.sendFile(path.join(__dirname, "public/", "francis3.html"));
});

var userCount = 0;
io.sockets.on('connection', function (socket) {
  console.log('new connection: ' + socket.id);
  userCount++;
  console.log('User Count: ',userCount)
  socket.on('disconnect',function(){
    console.log(' the following user just left :( ->' + socket.id);
    userCount--;
    console.log('User Count: ',userCount)
  
  })

});

console.log('Server Running in Port: ',port);
