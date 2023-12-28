const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, please Login");
        }

        //Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        //get user id from token
        const user = await User.findById(verified.id).select("-password");
        console.log(user);
        if (!user) {
            throw new Error("User Not Found");
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, please Login");
    }
});

module.exports = protect;