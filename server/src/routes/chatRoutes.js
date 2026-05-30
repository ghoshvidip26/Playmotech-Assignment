const express = require('express');
const chatRouter = express.Router();
const { askCoach } = require('../controller/chatController')
const authMiddleware = require('../middleware/adminMiddleware');

chatRouter.post("/:sessionId", authMiddleware, askCoach);

module.exports = chatRouter;