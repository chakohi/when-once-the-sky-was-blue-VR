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

app.get("/performance", (req, res) => {
  res.sendFile(path.join(__dirname, "public/", "main.html"));
});

console.log('Server Running in Port: ',port);
