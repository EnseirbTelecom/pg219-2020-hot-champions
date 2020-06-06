const Users = require("../schema/mongoose.js") 

async function friendList(req,res){
    await Users.find({email: req.body.email},{friends:1}, function(err, friend){
        if (err){
            return res.status(403).json({error: "User not found."})
        }
        else{
            return res.status(200).json(friend)
        }
    })
}  

async function acceptFriend(req,res){
    newFriend.email = req.body.email;
    newFriend.status = 1;
    await Users.find({id_: req.body.id}, async function(err, user){
        if (err){
            return res.status(403).json({error: "User not found."})
        }
        else{
            await Users.friend.upsert(friend, newFriend, true)
            return res.status(200)
        }
    })
}

async function askFriend(req,res){
    await Users.find({email: req.body.emailFriend}, async function(err){
        if(err){
            return res.status(403).json({error: "User not found."})
        }
        else{
            newFriend.email = req.body.emailFriend;
            newFriend.status = 0;
            await Users.find({email: req.body.email}, async function(err, user){
                if (err){
                    return res.status(403).json({error: "User not found."})
                }
                else{
                    await Users.update({email: req.body.email},{$set: {friends :newFriend}}, function(err, user){
                        if (err){
                            return res.status(400).json({error: "Request error."})
                        }
                        else{
                            return res.status(200).json({user})
                        }
                    })
                }
            })
        }
    })
} 

async function deleteFriend(req,res){
    await Users.find({id_: req.body.id}, async function(err, user){
        if (err){
            return res.status(403).json({error: "User not found."})
        }
        else{
            await Users.friends.update({ _id: req.body.id }, { $pull: { email: req.body.email } })
            return res.status(200)
        }
    })
}


exports.friendList = friendList;
exports.acceptFriend = acceptFriend;
exports.askFriend = askFriend;
exports.deleteFriend = deleteFriend;