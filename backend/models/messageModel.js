const mongoose = require("mongoose")

const messageModel = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chats" }

},
    {
        timeStamps: true
    })

const Messages = mongoose.model("Message", messageModel)
model.export = Messages