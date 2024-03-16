const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const chatController = require("../controllers/chatController"); 

// Protected routes with verifyJWT middleware
router.use(verifyJWT);

// Send message (text or media)
router.post("/messages", chatController.sendMessage);

// Get messages for a chat
router.get("/messages/:chatId", chatController.getMessages);

module.exports = router;
