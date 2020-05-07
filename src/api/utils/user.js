function inscription(req,res){
    const user = {
        "firstName" : req.body.firstName,
        "email" : req.body.email,
        "password" : req.body.password,
        "lastName" : req.body.lastName,
        "pseudo" : req.body.pseudo,
    }
    if(users.findOne(req.body.email)){
        "User already exist"
    }else{
        users.insertOne(user)
            .then(res.status(404).json({ error: "Entity not found." }))
            .catch(err => console.log("err" + err))
    }
}

function connexion(req,res){
    if(users.findOne(req.body.email)){
        if(req.body.emeil == users.password){

        }else{
            "wrong password"
        }
    }else{
        "user not found"
    }
}

    //Utiliser jwt + hash code pour mdp