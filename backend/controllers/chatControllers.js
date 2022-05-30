const expressAsyncHandler = require("express-async-handler")
const asyncHandler = require("express-async-handler")
const Chat = require("../models/chatModel")
const Users = require("../models/userModel")


const accessChat = asyncHandler(async (req, res) => {

    const { userId } = req.body
    if (!userId) {
        console.log("UserId params not sent with request")
    }
    else if (req.user._id.toString() !== userId) {
        console.log("Hey")
        // console.log("first", typeof (JSON.stringify(req.user._id)))
        // console.log("second", typeof (userId))
        let isChat = await Chat.find({
            isGroupChat: false, //should not be a group chat but a private chat
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },  // logged in user
                { users: { $elemMatch: { $eq: userId } } },//requested user
            ]
        }).populate("users", " -password").populate("latestMessage"); // populate the users array of chat table with all details of users except password

        // console.log("hey", JSON.stringify(isChat))
        // xyz;

        isChat = await Users.populate(isChat, { path: "latestMessage.sender", select: "name pic email" }) // didnt understand much
        //console.log("helooo", JSON.stringify(isChat))
        if (isChat.length > 0) {

            res.send(isChat[0])
        }
        else {
            let chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId]
            }

            //storing in database

            try {

                const createdChat = await Chat.create(chatData)
                const fullChat = await Chat.findOne({ id: createdChat._id }).populate("users", " - password")

                res.status(200).send(fullChat)
            }
            catch (error) {
                res.status(400)
                throw new Error(error.message)
            }
        }
    }
    else {
        res.status(400)
        res.send("Cannot process this request, you need to make freinds.")
    }
})

const fetchChats = asyncHandler(async (req, res) => {
    try { //find all the chats of logged in user
        console.log(req.user._id)
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updated: -1 }).then(async (results) => {
                results = await Users.populate(results, { path: "latestMessage.sender", select: "name pic email" })

                res.status(200).send(results)
            })
    }
    catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})

const createGroupChat = asyncHandler(async (req, res) => {

    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the details" })
    }
    else {
        let users = JSON.parse(req.body.users);
        if (users.length < 2) {
            res.status(400).send("More than one user is required to create group")
        }

        users.push(req.user)

        try {
            const groupChat = await Chat.create({
                chatName: req.body.name,
                users: users,
                IsGroupChat: true,
                groupAdmin: req.user

            })

            const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
            res.status(200).send(fullGroupChat)
        }

        catch (error) {

        }
    }



})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body

    const updateChat = await Chat.findByIdAndUpdate(
        chatId, { chatName: chatName }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

    if (!updateChat) {
        res.status(404)
        throw new Error("Chat Not Found")
    }
    else {
        res.status(200).send(updateChat)
    }
})

const groupAdd = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body

    const checkUser = await Chat.findById(chatId,
        {
            users: { $elemMatch: { $eq: userId } }
        })
    //console.log(checkUser.users ? checkUser.users.length >)
    if (checkUser.users?.length > 0) {
        res.status(400)
        return res.send("User already part of group")

    }
    const added = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId }
    }, { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password")

    if (!added) {
        res.status(404)
        res.send("Chat Not Found")
    }
    else {
        res.status(200).send(added)
    }

})

const groupRemove = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body

    const checkUser = await Chat.findById(chatId,
        {
            users: { $elemMatch: { $eq: userId } }
        })
    //console.log(checkUser.users ? checkUser.users.length >)
    if (checkUser.users?.length < 1) {
        res.status(400)
        return res.send("User does not exist in the group")

    }
    const removed = await Chat.findByIdAndUpdate(chatId, {
        $pull: { users: userId }
    }, { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password")

    if (!removed) {
        res.status(404)
        res.send("Chat Not Found")
    }
    else {
        res.status(200).send(removed)
    }

})
module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, groupAdd, groupRemove }


