const Users = require("../schema/mongoose.js")
const jwt = require("jwt-simple")

async function history(req,res){
    const loc = await Users.find({email: req.body.email},{location:1})
    if(loc.length != 0){
        return res.status(200).json({loc});
    }
    else{
        return res.status(406).json({error: "No location found"})
    }
} 

async function archiverLocation(req,res){
    const loc = await Users.find({email : req.body.email, status: true}, async function(err, user){
        console.log(loc)
        if (err){
            return res.status(406).json({error: "No location found"})
        }
        else{
            await Users.update({email: req.body.email, location: {status: true}},{$set: {location:{status: false}}}, function(err, user){
                if (err) {
                    return res.status(400).json({error: "Request Error"});
                }
                else{
                    return res.status(200).json({user})
                }
            }); 
        }
    })
}

async function addLocation(req,res){
    const newLocation = {
        'latitude' : req.body.latitude,
        'longitude': req.body.longitude,
        'time' : req.body.time,
        'status' : req.body.status
    }
    await Users.updateOne({email: req.body.email}, {$push: {location: newLocation}}, async function(err, user){
        if (err){
            return res.status(400).json({error: "Request error."})
        }
        else{
            return res.status(200).json({user})
        }
    })
} 

async function deleteLocation(req,res){
    await Users.find({email: req.body.email}, async function(err, user){
        if (err){
            return res.status(403).json({error: "User not found."})
        }
        else{
            await Users.update({ email: req.body.email }, { $pull: {location: { lat: req.body.lat , long: req.body.lat}} })
            return res.status(200)
        }
    })
        
}

exports.history = history;
exports.archiverLocation = archiverLocation;
exports.addLocation = addLocation;
exports.deleteLocation = deleteLocation;