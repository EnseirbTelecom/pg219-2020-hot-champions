const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id : String,
    email : String,
    firstName : String,
    lastName : String,
    pseudo : String,
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