// create express web server
const express = require('express'); 
const app = express();
const path = require("path");
//choose port
const port = 3000;
const server = app.listen(process.env.PORT || port);

// using production build of main react app
app.use(express.static(path.join(__dirname, "public/")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/", "opening.html"));
});

app.get("/lobby", (req, res) => {
  res.sendFile(path.join(__dirname, "public/", "lobby.html"));
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


console.log('Server Running in Port: ',port);
