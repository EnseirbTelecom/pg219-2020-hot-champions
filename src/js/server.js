const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/database';

// On ouvre une connexion à notre base de données
MongoClient.connect(url)
  // On commence par récupérer la collection que l'on va utiliser et la passer
  .then(function (user) {
    return user.db("FrieindFinder").collection("users");
  })
  .then((users) => {
    // Rajouter vos routes et les traitements
    app.post("/user",(req,res) => { 
        user.findOne({"email": req}, (err, product) => {return 0})
        if (user.findOne({"email": req}, (err, product) => {return 0})){
            users.insertOne(user)
            .then(  : res.status(404).json({ error: "Entity not found." }))
            .catch(err => console.log("err" + err))
        }
        else{
        }                
    })

  })
  .catch(function (err) {
    throw err;
  });