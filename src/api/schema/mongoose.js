const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id : String,
    email : String,
    password : String,
    firstName : String,
    lastName : String,
    pseudo : String,
    birthDate : String,
    friends : [{
        email : String,
        status : Number,
    }],
    location : [{
        longitude : Number,
        latitude : Number,
        time : {Date, Number},
        status : Boolean,
    }]
});

module.exports = mongoose.model("Users", userSchema);
