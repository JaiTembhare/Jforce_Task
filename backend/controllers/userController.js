const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const Token = require("../models/tokenModel");
const crypto = require("crypto");
const User = require("../models/userModel");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//Register User
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, phone } = req.body;
    //Validation;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all required fields.");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be upto 6 characters");
    }

    //check if user email alredy exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("Email already has been registred");
    }

    //create a user
    const user = await User.create({ name, email, password, phone });

    //Genrate Token
    const token = generateToken(user._id);

    //Send HTTP-Only Cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), //1 Day
        sameSite: "none",
        secure: true,
    });

    if (user) {
        const { _id, name, email, phone } = user;
        res.status(201).json({
            _id,
            name,
            email,
            phone,
            token,
        });
    } else {
        res.status(400);
        throw new Error("Invalid User");
    }
});


//Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add email and password");
    }
    //check if User Exist
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("User not found, please signup");
    }
    if (user.isVoted ) {
        res.status(400);
        throw new Error("You have Already Voted.");
    }

    //User Exist, check if password is Correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    //Genrate Token
    const token = generateToken(user._id);

    //Send HTTP-Only Cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), //1 day
        // expires: new Date(Date.now() + 1000 * 5),
        sameSite: "none",
        secure: true,
    });

    if (user && passwordIsCorrect) {
        const { _id, name, email, phone, isAdmin, isVoted } = user;
        if (!isAdmin) {
            res.status(200).json({
                _id,
                name,
                email,
                phone,
                isVoted,
                token,
            });
        } else {
            if (isAdmin) {
                res.status(200).json({
                    _id,
                    name,
                    email,
                    phone,
                    isAdmin,
                    token,
                    message: "Welcome Admin"
                });
            } else {
                res.status(400);
                throw new Error("Invalid email or password");
            }
        }

    }
});

//Logout User
const logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message: "Successfully Logged Out" });
});




module.exports = {
    registerUser: registerUser,
    loginUser: loginUser,
    logout: logout
}