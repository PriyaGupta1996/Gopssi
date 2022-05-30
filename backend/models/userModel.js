const mongoose = require("mongoose")
const userModel = mongoose.Schema({
    name: { type: String, requried: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true },
    pic: { type: String, default: "https://i.pinimg.com/736x/aa/42/7a/aa427a67d5dc8bc31629fbe50cc62abd.jpg" },
},
    {
        timestamps: true
    })

const Users = mongoose.model("User", userModel) //Mongoose automatically looks for the plural, lowercased version of your model name.
module.exports = Users
