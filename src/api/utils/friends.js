const Users = require("../schema/mongoose.js") 

function friendList(req,res){
    Users.find({email: 'toto@email.fr' /*req.body.email*/},{friends:1}, function(err, friend){
        if (err){
            res.status(403).json({error: "User not found."})
        }
        else{
            res.status(200).json(friend)
        }
    })
}  

function acceptFriend(req,res){
    newFriend.email = req.body.email;
    newFriend.status = 1;
    Users.find({id_: req.body.id}, function(err, user){
        if (err){
            res.status(403).json({error: "User not found."})
        }
        else{
            Users.friend.upsert(friend, newFriend, true)
        }
    })
}

function askFriend(req,res){
    Users.find({email: req.body.emailFriend}, function(err){
        if(err){
            res.status(403).json({error: "User not found."})
        }
        else{
            newFriend.email = req.body.emailFriend;
            newFriend.status = 0;
            Users.find({email: req.body.email}, function(err, user){
                if (err){
                    res.status(403).json({error: "User not found."})
                }
                else{
                    Users.update({email: req.body.email},{$set: {friends :newFriend}}, function(err, user){
                        if (err){
                            res.status(400).json({error: "Request error."})
                        }
                        else{
                            res.status(200).json({user})
                        }
                    })
                }
            })
        }
    })
} 

function deleteFriend(req,res){
}


exports.friendList = friendList;
exports.acceptFriend = acceptFriend;
exports.askFriend = askFriend;
exports.deleteFriend = deleteFriend;