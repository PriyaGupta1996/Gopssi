const mongoose = require("mongoose")


const userModel = mongoose.Schema({
    name: { type: String, requried: true },
    email: { type: String, requried: true },
    password: { type: String, requried: true },
    pic: { type: String, requried: true, default: "https://i.pinimg.com/736x/aa/42/7a/aa427a67d5dc8bc31629fbe50cc62abd.jpg" },
},
    {
        timeStamps: true
    })

const Users = mongoose.model("User", userModel)
module.exports = Users