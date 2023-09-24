const Message = require("../models/messageModel");
const asyncHandler = require("express-async-handler");

const addMessage = asyncHandler(async (req, res) => {
    const {
        content,
        conversationId
    } = req.body;
    const sender = req.user._id;
    const message = await Message.create({
        content,
        sender,
        conversationId
    });

    const newMessage = await Message.findById(message._id).populate("sender");

    res.status(200).json(newMessage)
});

const getAllMessage = asyncHandler(async (req, res) => {
    const {
        conversationId
    } = req.params;
    const messages = await Message.find({conversationId}).populate("sender");
    res.status(200).json(messages)
});

const getMessageById = asyncHandler(async (req, res) => {
    const {
        messageId
    } = req.params;
    const messages = await Message.findById(messageId).populate("sender");
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