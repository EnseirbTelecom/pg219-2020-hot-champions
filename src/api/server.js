const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express();

const port = 8800;

console.log("Listening on port", port);

app.use(cors());

const urlencodeParser = bodyParser.urlencoded({extended: true});
app.use(urlencodeParser);
app.use(bodyParser.json());

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
app.use('/min', function(req, res) {
  res.send('hello world');
});
app.use('/test', function(req, res) {
  res.send('test ok');
});
app.use("/user", router);
require(__dirname + "/controllers/userController")(router);
app.use("/user/location", router);
app.use("/location", router);
require(__dirname + "/controllers/locationController")(router);
app.use("/friends", router);
require(__dirname + "/controllers/friendsController")(router);


app.listen(port);
db.dropDatabase()
