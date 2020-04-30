const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 8800;
app.listen(port);
console.log("Listening on port", port);

// Connexion à notre base de données
mongoose.connect(url);

// Definition des routes
const router = express.Router();
app.use("/user", router);
app.use("/user/location", router);
app.use("/location", router);
app.use("/friends", router);

