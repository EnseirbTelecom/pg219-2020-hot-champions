function inscription(req,res){
    const user = {
        "firstName" : req.body.firstName,
        "email" : req.body.email,
        "password" : base64UrlEncode(req.body.password),
        "lastName" : req.body.lastName,
        "pseudo" : req.body.pseudo,
        "birthDate" : req.body.birthDate
    }
    if(db.find(req.body.email)){
        return res.status(402).json({ error: "User already exist." })
    }else{
        db.insertOne(user)
            .then(res.status(404).json({ error: "Entity not found." }))
            .catch(err => console.log("err" + err))
        return res.status(200).json({user})
    }
}

function connexion(req,res){
    if(db.findOne(req.body.email)){
        pass = base64UrlDecode(db.password)
        if(req.body.password == pass){
            return res.status(200).json({user})
        }else{
            return res.status(405).json({error: "wrong password"})
        }
    }else{
        return res.status(403).json({error: "user not found"})
    }
}

function userLocation(req,res){
    if(db.find(req.body.email)){
        if(db.find({location: true}, {location: 1})){
            res.status(200).json(location)
        }
        else{
            res.status(405).json({error: "wrong password"})
        }
    }else{
        res.status(403).json({error: "user not found"})
    }
}