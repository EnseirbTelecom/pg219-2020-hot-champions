const Users = require("../schema/mongoose.js")
const jwt = require("jwt-simple")

async function inscription(req,res){
    console.log("je m'inscris");
    //const user = jwt.decode(req.body.user)
    const email = req.body.email;
    const us = await Users.find({email: email})
    if(us.length == 0){
        await Users.create(user)
            //.then(res.status(404).json({ error: "Entity not found." }))
            .catch(err => console.log("err" + err))
        return res.status(200).json({user})
    }else{
        return res.status(402).json({ error: "User already exist." })
    }
}

async function connexion(req,res){
    const us = await Users.find({email: req.body.email});
    if(us.length != 0){
        const pass = await Users.find({email: req.body.email, password: {$eq: base64UrlDecode(req.body.password)}});
        if(pass.length !=0 ){
            return res.status(200).json({user})
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
        const loc = await Users.find({email: req.body.email, status: true}, {location: 1})
        if(loc.length != 0){
            return res.status(200).json(location)
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
