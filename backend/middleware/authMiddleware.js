const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")
const asyncHandler = require("express-async-handler")

const protect = asyncHandler(async (req, res, next) => {

    //we will be sending the token in the header of the object. 
    // Bearer eheirner
    // hence splitting it to get the token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //console.log(decoded)
            req.user = await User.findById(decoded.id).select("-password") // return without the password
            next()
        }
        catch (error) {
            res.status(401)
            throw new Error("Not Authorized, Token Failed")
        }
    }
    if (!token) {
        res.status(401)
        throw new Error("Not Authorized, Token Failed")
    }


})

module.exports = protect


