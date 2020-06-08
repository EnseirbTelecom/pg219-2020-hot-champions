const Users = require("../schema/mongoose.js")

async function friendList(req,res){
    const us = await Users.find({email : req.body.email});
    await Users.find({email : req.body.email},{friends:1}, function(err, friend){//email: "max@gmail.com"},{friends:1}, function(err, friend){
        console.log("friends: " + us)
        if (us.length == 0){
            return res.status(403).json({error: "User not found."})
            //console.log("User not found")
        }
        else{
            return res.status(200).json(friend)
            //console.log("amis: " + friend)
        }
    })
}

async function acceptFriend(req,res){
    const newFriend = {"email":"","status":""}
    newFriend.email = "jaja@gmail.com"//req.body.email;
    newFriend.status = 1;
    await Users.find({email: newFriend.email}, async function(err, user){//req.body.email}, async function(err, user){
        if (err){
            //return res.status(403).json({error: "User not found."})
        }
        else{
            await Users.updateOne({ email: "max@gmail.com"}, { $pull: { friends: {email:"jaja@gmail.com" }} })
            await Users.updateOne({email: "max@gmail.com"},{$push: {friends :newFriend}})//updateOne({_id: "1","friends.email":"jojo@gmail.com"},{$set {status : newFriend.status}}, {upsert : true})
            await Users.updateOne({ email: "jaja@gmail.com"}, { $pull: { friends: {email:"max@gmail.com" }} })
            await Users.updateOne({email: "jaja@gmail.com"},{$push: {friends :{"email":"max@gmail.com","status":1}}})
            //return res.status(200)
        }
    })
}

async function askFriend(req,res){
    const us = await Users.find({email: "jaja@gmail.com"})//req.body.emailFriend}, async function(err){
        if(us.length == 0){
            //return res.status(403).json({error: "User not found."})
            console.log("User adding not found")
        }
        else{
            const newFriend = {"email":"jaja@gmail.com","status":0}
            //newFriend.email = "jaja@gmail.com" //req.body.emailFriend;
            //newFriend.status = 0;
            const us1 = await Users.find({email: "max@gmail.com"})//req.body.email}, async function(err, user){
                if (us1.length == 0){
                    //return res.status(403).json({error: "User not found."})
                    console.log("User to add not found")
                }
                else{
                    const us2 = await Users.find({email:"max@gmail.com","friends.email" : "jaja@gmail.com"})
                    if(us2.length == 0){
                        await Users.updateOne({email: "max@gmail.com"},{$push: {friends :newFriend}}, function(err, user){//req.body.email},{$set: {friends :newFriend}}, function(err, user){
                            if (err){
                                //return res.status(400).json({error: "Request error."})
                                console.log("Request error")
                            }
                            else{
                                //return res.status(200).json({user})
                                console.log("is ok")
                            }
                        })
                      }
                      else{
                        console.log("Invitation already done before")
                      }
                }

        }

}

async function deleteFriend(req,res){
    await Users.find({id_: "1"}, async function(err, user){//req.body.id}, async function(err, user){
        if (err){
            //return res.status(403).json({error: "User not found."})
        }
        else{
            await Users.updateOne({ email: "max@gmail.com"}, { $pull: { friends: {email:"jaja@gmail.com" }} })//req.body.id }, { $pull: { email: req.body.email } })
            updateOne({email: "jaja@gmail.com"},{$pull: { friends: {email:"max@gmail.com" }} })
            //return res.status(200)
        }
    })
}


exports.friendList = friendList;
exports.acceptFriend = acceptFriend;
exports.askFriend = askFriend;
exports.deleteFriend = deleteFriend;
