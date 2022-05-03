const mongoose = require('mongoose')
const chatMode = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        IsGroupChat: { type: Boolean, default: false },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
        groupAdmin: { type: String, trim: true }
    },
    {
        timeStamps: true
    }
);


const Chats = mongoose.Model("Chat", chatModel)
module.exports = Chats;