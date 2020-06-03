const Users = require("../schema/mongoose.js")

function history(req,res){
    if(Users.find({email: req.body.email},{location:1})){
        res.status(200).json(Users.find({email: req.body.email},{location:1}));
    }
    else{
        res.status(406).json({error: "No location found"})
    }
} 

function archiverLocation(req,res){
    Users.find({email : req.body.email},{status = true}, function(err, user){
        if (err){
            res.status(406).json({error: "No location found"})
        }
        else{
            user.location.status = false; 
            user.save(function(err){
                if (err) {
                    res.status(400).json({error: "Request Error"});
                }
                else{
                    res.status(200).json({user})
                }
            })
        }
    })

}

function addLocation(req,res){
    newLocation.latitude = req.body.latitude;
    newLocation.longitude = req.body.longitude;
    newLocation.time = req.body.time;
    newLocation.status = req.body.status;
    Users.update({email: req.body.email},{$set: {location :newLocation}}, function(err, user){
        if (err){
            res.status(400).json({error: "Request error."})
        }
        else{
            res.status(200).json({user})
        }
    })
} 

function deleteLocation(req,res){
}

exports.history = history;
exports.archiverLocation = archiverLocation;
exports.addLocation = addLocation;
exports.deleteLocation = deleteLocation;