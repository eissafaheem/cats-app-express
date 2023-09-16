const express = require("express");
const router = express.Router();
const {
    addMessage,
    getAllMessage,
    deleteMessage
} = require("./../controllers/messageController");
const validateAccessToken = require("../middleware/validateTokenHandler");

router.use(validateAccessToken)
router.route("/").post(addMessage);
router.route("/").get(getAllMessage);
router.route("/:id").delete(deleteMessage);

module.exports = router;