const Users = require("../schema/mongoose.js") 

async function inscription(req,res){
    console.log("je m'inscris");
    const user = {
        "firstName" : req.body.firstName,
        "email" : req.body.email,
        "password" : base64UrlEncode(req.body.password),
        "lastName" : req.body.lastName,
        "pseudo" : req.body.pseudo,
        "birthDate" : req.body.birthDate
    }
    const us = await Users.find({email: req.body.email})
    if(us.length == 0){
        await Users.create(user)
            .then(res.status(404).json({ error: "Entity not found." }))
            .catch(err => console.log("err" + err))
        console.log('je suis inscrit')
        return res.status(200).json({user})        
    }else{
        console.log("j'existe deja")
        return res.status(402).json({ error: "User already exist." })
    }
}

async function connexion(req,res){
    //const us = await Users.find({email: 'toto@email.fr' /*req.body.email*/});
    const us = 1;
    console.log(us)
    if(us != 0){
        const pass = await Users.find({email: 'tato@email.fr'},{pasword:1});//base64UrlDecode(Users.password)
        const pass2 = pass.toString();
        console.log(pass2)
        if(/*req.body.password*/ "pass" == pass2){
            console.log('ici')
            //return res.status(200).json({user})
        }else{
            console.log('la')
            //return res.status(405).json({error: "wrong password"})
        }
    }else{
        console.log('coucou')
        //return res.status(403).json({error: "user not found"})
    }
}

async function userLocation(req,res){
    if(await Users.find(req.body.email)){
        if(await Users.find({location: true}, {location: 1})){
            return res.status(200).json(location)
        }
        else{
            return res.status(405).json({error: "wrong password"})
        }
    }else{
        return res.status(403).json({error: "user not found"})
    }
}

exports.inscription = inscription;
exports.connexion = connexion;
exports.userLocation = userLocation;