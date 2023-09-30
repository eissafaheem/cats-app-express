const User = require("./../models/userModel")
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const bcrypt = require("bcrypt");

const createUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        avatarId,
        pawints
    } = req.body;

    const userFromDb = await User.findOne({ email });
    if (userFromDb) {
        res.status(404);
        throw new Error("User already exists!")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        avatarId,
        pawints
    })

    res.status(200).json({
        _id: user._id,
        name,
        email,
        avatarId,
        pawints
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        avatarId,
        pawints
    } = req.body;

    const _id = req.params.id;
    console.log(req.params.id);
    const userFromDb = await User.findOne({_id});
    if (!userFromDb) {
        res.status(404);
        throw new Error("User does not exists!")
    }

    if(name?.length){
        userFromDb.name = name;
    }
    if(email?.length){
        userFromDb.email = email;
    }
    if(password?.length){
        userFromDb.password = password;
    }
    if(avatarId){
        userFromDb.avatarId = avatarId;
    }
    if(pawints){
        userFromDb.pawints = pawints;
    }
    console.log(req.body)
    await userFromDb.save();

    res.status(200).json(userFromDb);
});

const signin = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const userFromDb = await User.findOne({ email });
    if (!userFromDb) {
        res.status(404);
        throw new Error("User does not exist");
    }

    if (await bcrypt.compare(password, userFromDb.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    _id: userFromDb._id,
                    email: userFromDb.email,
                    name: userFromDb.name
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "2 days" }
        )

        res.status(200).json(
            {
                accessToken,
                user: {
                    _id: userFromDb._id,
                    name: userFromDb.name,
                    email: userFromDb.email,
                    avatarId: userFromDb.avatarId,
                    pawints: userFromDb.pawints
                }
            }
        );
    }
    else {
        res.status(401);
        throw new Error("invalid email or password!");
    }

});

const searchUser = async (req, res) => {
    const token = req.params.token;
    const regex = RegExp(token, 'i');
    const users = await User.find({
        $or: [
            { email: { $regex: regex } },
            { name: { $regex: regex } }
        ]
    }).select('-password');

    res.status(200).json(users);
}

const deleteUser = (req, res) => {
    res.send("User deleted")
}

const currentUser = (req, res) => {
    res.json(req.user);
}

module.exports = {
    createUser,
    signin,
    searchUser,
    deleteUser,
    currentUser,
    updateUser
};