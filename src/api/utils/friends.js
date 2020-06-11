const Users = require("../schema/mongoose.js")
const jwt = require("jwt-simple")
const config = require("../config/config");

async function friendList(req,res){
    const token = req.query.token;
    const user = jwt.decode(token,config.secret)
    const us = await Users.find({email : user.email});
    const fri = await Users.find({email : user.email},{friends:1}, async function(err, friend){//email: "max@gmail.com"},{friends:1}, function(err, friend){
        //console.log("user vaut: " + us)
        if (us.length == 0){
            return res.status(403).json({error: "User not found."})
            //console.log("User not found")
        }
        else{
            //.log("friends " + friend)
            var friendList = new Array;
            var newFriend = "";
            for (i in friend[0].friends){
                //console.log("i vaut: " + friend[0].friends[i])
                var friendi = friend[0].friends[i]
                const friendLocation = await Users.findOne({email: friendi.email}, {location:1}) //location: {status: true}}}, {location:1})
                const pseudo = await Users.findOne({email: friendi.email}, {pseudo:1})
                console.log("fiendloca : " + friendLocation.location)
                for (j in friendLocation.location)
                var friendLocationj = friendLocation.location[j]
                console.log("fiendlocaJ : " + friendLocationj)
                if (friendLocationj){
                    if(friendLocationj.status == true){
                        newFriend = {"pseudoFriend": pseudo, "status": friendi.status, "location":{"lat": friendLocationj.latitude, "long": friendLocationj.longitude}}
                        friendList.push(newFriend);
                    }
                }
                else{
                    newFriend = {"pseudoFriend": pseudo, "status": friendi.status};
                    friendList.push(newFriend);
                }
            }
            const token = jwt.encode(friend,config.secret);
            const msg = {"text":"Successfull Authentification","jwt.token":token,"friend":friendList}
            return res.status(200).json(msg)
            //console.log("amis: " + friend)
        }
    })
}

async function acceptFriend(req,res){
    const token = req.body.token;
    const user = jwt.decode(token,config.secret)
    const newFriend = {"email":req.body.emailFriend,"status":1}
    const us = await Users.findOne({email: newFriend.email}, async function(err, user){//req.body.email}, async function(err, user){
        if (err){
            return res.status(400).json({error: "Request error"})
        }
    })
    const us1 = await Users.findOne({email: user.email}, async function(err, user){//req.body.email}, async function(err, user){
        if (err){
            return res.status(400).json({error: "Request error"})
        }
    })
    if (!us){
        return res.status(403).json({error: "User not found."})
        console.log("User to add not found")
    }
    if (!us1){
        return res.status(401).json({error: "Token missing or invalid"})
        console.log("User to add not found")
    }
    await Users.updateOne({ email: user.email}, { $pull: { friends: {email:req.body.emailFriend }} })
    await Users.updateOne({email: user.email},{$push: {friends :newFriend}})//updateOne({_id: "1","friends.email":"jojo@gmail.com"},{$set {status : newFriend.status}}, {upsert : true})
    await Users.updateOne({ email: newFriend.email}, { $pull: { friends: {email:user.email }} })
    await Users.updateOne({email: newFriend.email},{$push: {friends :{"email":user.email,"status":1}}})
    return res.status(200).json({"text":"Successfull Authentification"})


}

async function askFriend(req,res){
    const token = req.body.token;
    const user = jwt.decode(token,config.secret)
    console.log("Ask user: " + user)
    const us = await Users.findOne({email: user.email})//req.body.emailFriend}, async function(err){
        if(!us){
            return res.status(403).json({error: "User not found."})
            console.log("User adding not found")
        }
        else{
            const newFriend = {"email":user.email,"status":0} //Celui qui obtient l'invitation
            const newFriend2 = {"email":req.body.emailFriend,"status":-1} //Celui qui envoie l'invitation
            //newFriend.email = "jaja@gmail.com" //req.body.emailFriend;
            //newFriend.status = 0;
            const us1 = await Users.find({email: req.body.emailFriend})//req.body.email}, async function(err, user){
                if (us1.length == 0){
                    return res.status(403).json({error: "User not found."})
                    console.log("User to add not found")
                }
                else{
                    const us2 = await Users.find({email: req.body.emailFriend,"friends.email" : user.email})
                    if(us2.length == 0){
                        await Users.updateOne({email: user.email},{$push: {friends :newFriend2}})
                        await Users.updateOne({email: req.body.emailFriend},{$push: {friends :newFriend}})
                        return res.status(200).json({"text":"Successfull Authentification"})
                        console.log("is ok")


                      }
                      else{
                        console.log("Invitation already done before")
                        return res.status(408).json({error: "Invitation already done"})
                      }
                }

        }

}

async function deleteFriend(req,res){
    const token = req.body.token;
    const user = jwt.decode(token,config.secret)
    const us = await Users.findOne({email:user.email}, async function(err, user){//req.body.id}, async function(err, user){
        if (err){
            return res.status(400).json({error: "Request Error"})
        }
    })
    if (!us){
      return res.status(403).json({error: "Token missing or invalid"})
    }
    const us2 = await Users.findOne({email:req.body.emailFriend}, async function(err, user){//req.body.id}, async function(err, user){
        if (err){
            return res.status(400).json({error: "Request error"})
        }
    })
    if (!us2){
      return res.status(401).json({error: "User not found"})
    }
    console.log("ok1")
    await Users.updateOne({ email: user.email}, { $pull: { friends: {email:req.body.emailFriend }} })//req.body.id }, { $pull: { email: req.body.email } })
    console.log("ok2")
    await Users.updateOne({email: req.body.emailFriend},{$pull: { friends: {email:user.email }} })
    console.log("ok3")
    return res.status(200).json({"text":"Successfull Authentification"})


}


exports.friendList = friendList;
exports.acceptFriend = acceptFriend;
exports.askFriend = askFriend;
exports.deleteFriend = deleteFriend;
