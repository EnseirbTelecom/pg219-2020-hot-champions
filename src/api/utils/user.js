function inscription(firstName, email, pseudo, lastName, password){
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

