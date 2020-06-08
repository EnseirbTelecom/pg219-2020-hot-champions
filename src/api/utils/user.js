const Users = require("../schema/mongoose.js")
const jwt = require("jwt-simple")
const config = require("../config/config");
const base64url = require('base64url');

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
    const user = {"_id":id ,"email" : email, "password" : password, "firstName" : firstName, "lastName" : lastName, "pseudo": pseudo, "birthDate" : birthDate};
    const userInfo = {"email" : email, "firstName" : firstName, "lastName" : lastName, "pseudo": pseudo, "birthDate" : birthDate};
    const us = await Users.find({email: email});
    if(us.length == 0){
        await Users.create(user)
            //.then(res.status(404).json({ error: "Entity not found." }))
            .catch(err => console.log("err" + err))
        const token = jwt.encode(userInfo,config.secret);
        id++;
        const msg = {"text ":"Successfull Authentification", "jwt.token":token,"user":userInfo}
        //console.log(jwt.decode(token,config.secret))
        return res.status(200).json(msg)
    }else{
        return res.status(402).json({ error: "User already exist." })
    }
}

async function connexion(req,res){
    const us = await Users.findOne({email: req.body.email});
    if(us){
        const pass = await Users.find({email: req.body.email, password: {$eq: base64url.encode(req.body.password)}});
        if(pass.length !=0 ){
            const user = {"email":us.email,"pseudo":us.pseudo,"firstName":us.firstName,"lastName":us.lastName,"birthDate":us.birthDate};
            const token = jwt.encode(user,config.secret);
            const msg = {"text":"Successfull Authentification","jwt.token":token,"user":user}
            return res.status(200).json({msg})
        }else{
            return res.status(405).json({error: "wrong password"})
        }
    }else{
        return res.status(403).json({error: "user not found"})
    }
}

async function userLocation(req,res){
    const us = await Users.find({email: req.body.email})
    if(us.length !=0 ){
        const loc = await Users.find({email: req.body.email, location: {status: true}}, {location: 1})
        if(loc.length != 0){
            const loca = {"lat":loc.lat, "long":loc.long, "time": loc.time};
            const token = jwt.encode(loca,config.secret);
            const msg = {"text":"Successfull Authentification","jwt.token":token,"location":loca}
            return res.status(200).json({msg})
        }
        else{
            return res.status(405).json({error: "No location found."})
        }
    }else{
        return res.status(403).json({error: "user not found"})
    }
}

exports.inscription = inscription;
exports.connexion = connexion;
exports.userLocation = userLocation;