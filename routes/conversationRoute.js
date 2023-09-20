const express = require("express");
const router = express.Router();
const {
    addConversation,
    getAllConversation,
    deleteConversation,
    pinConversation,
    searchConversation
} = require("./../controllers/conversationController");
const validateAccessToken = require("../middleware/validateTokenHandler");

router.use(validateAccessToken);
router.route("/").post(addConversation).get(getAllConversation);
router.route("/:id").delete(deleteConversation);
router.route("/pin", ).put(pinConversation);
router.route("/search").get(searchConversation);

module.exports = router;