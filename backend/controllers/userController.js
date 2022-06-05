// If you're using Async/await in an Express app, you want to use a wrapper function like express-async-handler. 
//This lets you write asynchronous code without try/catch blocks.

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt")

const generateToken = require("../config/generateToken");
const { response } = require("express");


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields")
    }


    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10)
    const PassHash = await bcrypt.hash(password, salt)
    const user = await User.create({
        name: name,
        email: email,
        password: PassHash,
        pic: pic,
    })

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error("Server Error,Please try again after sometime")
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.send(400)
        throw new Error("Please Enter All The Fields.")
    }

    const userExists = await User.findOne({ email })
    if (!userExists) {
        res.status(403).send({ message: "Sorry, The Email You Entered Is New To Us, Please Sign Up." })
        throw new Error("Sorry, The Email You Entered Is New To Us, Please Sign Up.")
    }
    else {
        const salt = await bcrypt.genSalt(10)
        const modifiedPass = await bcrypt.hash(userExists.password, salt)
        const result = await bcrypt.compare(userExists.password, modifiedPass)
        if (result == true) {
            res.status(200).json({
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                pic: userExists.pic,
                token: generateToken(userExists._id)
            })
        }
        else {
            res.status(401).send({ message: "Password entered is incorrect, Please Try Again." })
            throw new Error("Password entered is incorrect, Please Try Again.")
        }

    }
})

// /api/user?search=priya
const allUsers = asyncHandler(async (req, res) => {

    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },  // i means case in-sensitivity.
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {};
    console.log(JSON.stringify(keyword))
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
    //   console.log(users)
    res.send(users)
})
module.exports = { registerUser, authUser, allUsers }

