const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
    name: {
        type: String
    },
    users:{
        type: [mongoose.Schema.ObjectId],
        ref: "User",
        required: [
            true,
            "Users are required"
        ]
    },
    lastMessage:{
        type: String,
    },
    isPinned: {
        type: Boolean
    }
})

module.exports = mongoose.model("Conversation", conversationSchema);