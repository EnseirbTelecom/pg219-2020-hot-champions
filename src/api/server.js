const express = require("express");
const mongoose = require("mongoose");
const app = express();


const port = 8800;
app.listen(port);
console.log("Listening on port", port);


const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/database';

// On ouvre une connexion à notre base de données
MongoClient.connect(url)
  // On commence par récupérer la collection que l'on va utiliser et la passer
  .then(function (user) {
    return user.db("FriendFinder").collection("users");
  })
  .then((users) => {

    function insertUser(firstName, email, pseudo, lastName, password){
        const user = {
            "firstName" : firstName,
            "email" : email,
            "password" : password,
            "lastName" : lastName,
            "pseudo" : pseudo,
        }
        users.insertOne(user)
            .then(res.status(404).json({ error: "Entity not found." }))
            .catch(err => console.log("err" + err))
    }

    app.post("/user",(req, res) => {    //inscription
        if (user.findOne({"email": req}, (err, product) => {return 0})){
            insertUser(firstName,email,pseudo,lastName,password)
            // ajouter acceder à la page de d'accueil
        }
        else{
            res.status(402).json({ error: "User already exist." })
        }
    })

    app.get("/user",(req, res) => {    //connexion
        user.findOne({"email": req}, (err, product) => {return 0})
        if (user.findOne({"email": req}, (err, product) => {return 0})){
            if(user.findOne({"password": req}, (err, product) => {return 0})){
                // ajouter acceder à la page de d'accueil
            }
            else{
                res.status(405).json({ error: "Wrong password." })
            }
        }
        else{
            res.status(403).json({ error: "User not found." })
        }                
    })

  })
  .catch(function (err) {
    throw err;
  })
