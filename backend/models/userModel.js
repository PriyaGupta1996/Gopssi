const mongoose = require("mongoose")
const userModel = mongoose.Schema({
    name: { type: String, requried: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true },
    pic: { type: String, default:"https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1655296909~hmac=b27d7ad89bd383bd8b60ab4f63395479" },
},
    {
        timestamps: true
    })

const Users = mongoose.model("User", userModel) //Mongoose automatically looks for the plural, lowercased version of your model name.
module.exports = Users
