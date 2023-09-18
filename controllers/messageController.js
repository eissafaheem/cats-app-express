const Message = require("../models/messageModel");
const asyncHandler = require("express-async-handler");

const addMessage = asyncHandler(async (req, res) => {
    const {
        content,
        conversationId
    } = req.body;
    const senderId = req.user._id;
    const message = await Message.create({
        content,
        senderId,
        conversationId
    });
    res.status(200).json(message)
});

const getAllMessage = asyncHandler(async (req, res) => {
    const {
        conversationId
    } = req.params;
    const messages = await Message.find({conversationId});
    res.status(200).json(messages)
});

const deleteMessage = (req, res) => {
    res.send("ko");
}

module.exports = {
    addMessage,
    getAllMessage,
    deleteMessage
};