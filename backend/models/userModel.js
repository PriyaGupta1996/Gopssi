const mongoose = require("mongoose")
const userModel = mongoose.Schema({
    name: { type: String, requried: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true },
    pic: { type: String, default: "https://cdn-icons.flaticon.com/png/512/3177/premium/3177440.png?token=exp=1655266111~hmac=96f7b62af1f97c0e104a9c9bd483bf81" },
},
    {
        timestamps: true
    })

const Users = mongoose.model("User", userModel) //Mongoose automatically looks for the plural, lowercased version of your model name.
module.exports = Users
