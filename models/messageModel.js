const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: [
                true,
                "Content is required"
            ]
        },
        senderId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [
                true,
                "Sender is required"
            ]
        },
        conversationId: {
            type: mongoose.Schema.ObjectId,
            ref: "Conversation",
            required: [
                true,
                "Conversation Id is required"
            ]
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Message", messageSchema);