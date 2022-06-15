const mongoose = require("mongoose")
const userModel = mongoose.Schema({
    name: { type: String, requried: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true },
    pic: { type: String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUIOJUSPGIWdaRmeUqgbRAYwfugtpgySi3Qv34NKI8JeXDzFGFOgpA7s-T2WKUqHnCgP8&usqp=CAU" },
},
    {
        timestamps: true
    })

const Users = mongoose.model("User", userModel) //Mongoose automatically looks for the plural, lowercased version of your model name.
module.exports = Users
