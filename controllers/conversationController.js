const Conversation = require("./../models/conversationModel")
const asyncHandler = require("express-async-handler")

const addConversation = asyncHandler(async (req, res) => {
    const {
        name,
        users,
        lastMessage,
        isPinned
    } = req.body;

    const conversation = await Conversation.create({
        name,
        users,
        lastMessage,
        isPinned
    });

    res.status(200).json(conversation);
});

const getAllConversation = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const conversations = await Conversation.find({
        users: {
            $elemMatch: { $eq: userId }
        }
    });
    res.status(200).json(conversations)
});

const deleteConversation = (req, res) => {
    res.send("ok")
};

const pinConversation = (req, res) => {
    res.send("ok")
};

const searchConversation = (req, res) => {
    res.send("ok")
};

module.exports = {
    addConversation,
    getAllConversation,
    deleteConversation,
    pinConversation,
    searchConversation
};