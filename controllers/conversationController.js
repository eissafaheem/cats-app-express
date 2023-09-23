const Conversation = require("./../models/conversationModel");
const asyncHandler = require("express-async-handler");

const addConversation = asyncHandler(async (req, res) => {
  const { name, users, lastMessage, isPinned } = req.body;

  const conversation = await Conversation.create({
    name,
    users,
    lastMessage,
    isPinned,
  })

  const newConversation = await Conversation.findById(conversation._id).populate("users");

  res.status(200).json(newConversation);
});

const getAllConversation = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const conversations = await Conversation.find({
    users: {
      $elemMatch: { $eq: _id },
    },
  }).populate("users", "name email avatarId pawints");
  console.log(conversations)
  res.status(200).json(conversations);
});

const updateConversation = asyncHandler(async (req, res) => {
    const conversationId = req.params.id;
    const { name, users, lastMessage, isPinned } = req.body;
    console.log(req.body);
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      res.status(404);
      throw new Error("Conversation not found");
    }

    if (name) {
      conversation.name = name;
    }
    if (users.length) {
      conversation.users = users;
    }
    if (lastMessage) {
      conversation.lastMessage = lastMessage;
    }
    if (isPinned !== undefined) {
      conversation.isPinned = isPinned;
    }

    await conversation.save();
    res.status(200).json(conversation);
});

const deleteConversation = (req, res) => {
  res.send("ok");
};

const pinConversation = (req, res) => {
  res.send("ok");
};

const searchConversation = (req, res) => {
  res.send("ok");
};

module.exports = {
  addConversation,
  getAllConversation,
  updateConversation,
  deleteConversation,
  pinConversation,
  searchConversation,
};
