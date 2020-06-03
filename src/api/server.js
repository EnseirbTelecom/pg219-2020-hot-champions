const express = require("express");
const mongoose = require("mongoose");
const app = express();

const user = require('./utils/user.js');
const friend = require('./utils/friends.js');

const port = 8800;
app.listen(port);
console.log("Listening on port", port); 

// Connexion à notre base de données
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true,  useUnifiedTopology: true } );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("\nConnecté à la bdd !");
});
module.exports = db;


// Definition des routes

const router = express.Router();
app.use('/', function(req, res) {
  res.send('hello world');
});
app.use("/user", router);
app.use("/user/location", router);
app.use("/location", router);
app.use("/friends", router);
