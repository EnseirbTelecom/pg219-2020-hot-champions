const Users = require("../schema/mongoose.js")
const jwt = require("jwt-simple")
const config = require("../config/config");

async function history(req,res){
    const token = req.body.token;
    const user = jwt.decode(token,config.secret)
    const loc = await Users.findOne({email: user.email},{location:1})
    if (!loc){
      return res.status(403).json({error: "Token missing or invalid"})
    }
    const loca = new Array;
    for (i in loc.location){
        var loci = loc.location[i]
        if (!loci){
          return res.status(406).json({error: "No location found"})
        }
        var newLoc = {"latitude":loci.latitude,"longitude":loci.longitude, "time": loci.time}
        loca.push(newLoc);
    }
    if (loca.lentgh == 0){
      return res.status(406).json({error: "No location found"})
    }
    const msg = {"text":"Successfull Authentification","location":loca}
    return res.status(200).json({msg});
}

async function archiverLocation(req,res){
    const token = req.body.token;
    const user = jwt.decode(token,config.secret)
    const loc = await Users.findOne({email : user.email, "location.status": true}, async function(err, rep){
        if (err){
            return res.status(400).json({error: "Request Error"})
        }
      })
    console.log("loc vaut : " + loc)
    if (!loc){
      return res.status(406).json({error: "No location found"});
    }
            await Users.updateOne({email: user.email, "location.status": true},{$set: {"location.status": false}}, function(err, user){
                if (err) {
                    return res.status(400).json({error: "Request Error"});
                }
                else{
                    return res.status(200).json({"text":"Successfull Authentification"})
                }
            });


}

async function addLocation(req,res){
    const token = req.body.token;
    const user = jwt.decode(token,config.secret)
    const newLocation = {
        'latitude' : req.body.latitude,
        'longitude': req.body.longitude,
        'time' : req.body.time,
        'status' : req.body.status
    }
    const us = await Users.findOne({email:user.email}, async function(err, user){
        if (err){
            return res.status(400).json({error: "Request Error"})
        }
    })
    if (!us){
      return res.status(403).json({error: "Token missing or invalid"})
    }
    await Users.updateOne({email: user.email}, {$push: {location: newLocation}})
    return res.status(200).json({"text":"Successfull Authentification"})

}

async function deleteLocation(req,res){
  const token = req.body.token;
  const user = jwt.decode(token,config.secret)
  const us = await Users.findOne({email: user.email}, async function(err, user){
        if (err){
            return res.status(400).json({error: "Request error"})
        }
    })
        if (!us){
            return res.status(401).json({error: "Token missing or invalid"})
            console.log("User not found")
        }
        await Users.update({ email: user.email }, { $pull: {location: { latitude: req.body.latitude , longitude: req.body.longitude}} })
        return res.status(200).json({"text":"Successfull Authentification"})


}

exports.history = history;
exports.archiverLocation = archiverLocation;
exports.addLocation = addLocation;
exports.deleteLocation = deleteLocation;
