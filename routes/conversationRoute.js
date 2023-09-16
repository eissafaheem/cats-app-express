const express = require("express");
const router = express.Router();
const {
    addConversation,
    getAllConversation,
    deleteConversation,
    pinConversation,
    searchConversation
} = require("./../controllers/conversationController");


router.route("/").post(addConversation).get(getAllConversation);
router.route("/:id").delete(deleteConversation);
router.route("/pin", ).put(pinConversation);
router.route("/search").get(searchConversation);

module.exports = router;