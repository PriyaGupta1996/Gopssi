const mongoose = require('mongoose')
const chatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        IsGroupChat: { type: Boolean, default: false },
        users: [{
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        }],
        latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
        groupAdmin: { type: String, trim: true }
    },
    {
        timestamps: true
    }
);


const Chats = mongoose.model("Chat", chatModel)
module.exports = Chats 