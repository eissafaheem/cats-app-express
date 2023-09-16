const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            "Name is required"
        ]
    },
    users:{
        type: [mongoose.Schema.ObjectId],
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