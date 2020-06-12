const Users = require("../schema/mongoose.js")
const jwt = require("jwt-simple")
const config = require("../config/config");
const base64url = require('base64url');
const mongoose = require('mongoose');


let id = 1;
async function inscription(req,res){
    console.log("je m'inscris");
    //const user = jwt.decode(req.body.user)
    const email = req.body.email;
    const password = base64url.encode(req.body.password);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const pseudo = req.body.pseudo;
    const birthDate = req.body.birthDate;
    const user = {"_id": mongoose.Types.ObjectId(),"email" : email, "password" : password, "firstName" : firstName, "lastName" : lastName, "pseudo": pseudo, "birthDate" : birthDate};
    const userInfo = {"email" : email, "firstName" : firstName, "lastName" : lastName, "pseudo": pseudo, "birthDate" : birthDate};
    const us = await Users.find({email: email});
    if(us.length == 0){
        const userData = new Users(user)
        userData.save()
        const token = jwt.encode(userInfo,config.secret);
        id++;
        const msg = {"text ":"Successfull Authentification", "token":token,"user":userInfo}
        return res.status(200).json(msg)
    }else{
        return res.status(402).json({ error: "User already exist." })
    }
}

async function connexion(req,res){
    const us = await Users.findOne({email: req.query.email});
    if(us){
        const pass = await Users.find({email: req.query.email, password: {$eq: base64url.encode(req.query.password)}});
        if(pass.length !=0 ){
            const user = {"email":us.email,"pseudo":us.pseudo,"firstName":us.firstName,"lastName":us.lastName,"birthDate":us.birthDate};
            const token = jwt.encode(user,config.secret);
            console.log(user)
            const msg = {"text":"Successfull Authentification","token":token,"user":user}
            return res.status(200).json({msg})
        }else{
            return res.status(405).json({error: "wrong password"})
        }
    }else{
        return res.status(403).json({error: "user not found"})
    }
}

async function userLocation(req,res){
    const token = req.query.token;
    const email = req.query.email;
    const us = await Users.findOne({email:email});
    const isAuth = jwt.decode(token,config.secret);
    if(us && isAuth){
        const loc = await Users.findOne({email:email}, {location: 1})
        for (i in loc.location){
            loci = loc.location[i]
            console.log("loci : " + loci)
            if (loci.status == true){
              const msg = {"location":{"lat":loci.latitude, "lng":loci.longitude}, "time": loci.time};
              return res.status(200).json({msg})
            }
        }
        return res.status(405).json({error: "No location found."})

    }else{
        return res.status(403).json({error: "user not found"})
    }
}

exports.inscription = inscription;
exports.connexion = connexion;
exports.userLocation = userLocation;
