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
        sender: {
            type: String,
            required: [
                true,
                "Sender is required"
            ]
        },
        conversationId: {
            type: mongoose.Schema.ObjectId,
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