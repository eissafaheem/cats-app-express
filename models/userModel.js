const  mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            "User Name is required"
        ]
    },
    email:{
        type: String,
        required: [
            true,
            "User Email is required"
        ]
    },
    password:{
        type: String,
        required: [
            true,
            "User Password is required"
        ]
    },
    avatarId: {
        type: String
    },
    pawints:{
        type: Number
    }
})

module.exports = mongoose.model("User", userSchema)