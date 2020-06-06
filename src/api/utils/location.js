const Users = require("../schema/mongoose.js")

async function history(req,res){
    if(await Users.find({email: req.body.email},{location:1})){
        return res.status(200).json(Users.find({email: req.body.email},{location:1}));
    }
    else{
        return res.status(406).json({error: "No location found"})
    }
} 

async function archiverLocation(req,res){
    await Users.find({email : req.body.email},{status = true}, function(err, user){
        if (err){
            return res.status(406).json({error: "No location found"})
        }
        else{
            user.location.status = false; 
            user.save(function(err){
                if (err) {
                    return res.status(400).json({error: "Request Error"});
                }
                else{
                    return res.status(200).json({user})
                }
            })
        }
    })

}

async function addLocation(req,res){
    newLocation.latitude = req.body.latitude;
    newLocation.longitude = req.body.longitude;
    newLocation.time = req.body.time;
    newLocation.status = req.body.status;
    await Users.update({email: req.body.email},{$set: {location :newLocation}}, function(err, user){
        if (err){
            return res.status(400).json({error: "Request error."})
        }
        else{
            return res.status(200).json({user})
        }
    })
} 

async function deleteLocation(req,res){
    await Users.find({id_: req.body.id}, async function(err, user){
        if (err){
            return res.status(403).json({error: "User not found."})
        }
        else{
            await Users.location.update({ _id: req.body.id }, { $pull: { lat: req.body.lat , long: req.body.lat} })
            return res.status(200)
        }
    })
        
}

exports.history = history;
exports.archiverLocation = archiverLocation;
exports.addLocation = addLocation;
exports.deleteLocation = deleteLocation;