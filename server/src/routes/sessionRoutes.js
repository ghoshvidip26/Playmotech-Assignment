const express = require('express');
const sessionRouter = express.Router();
const authMiddleware = require('../middleware/adminMiddleware');
const { createSession, getSession, } = require('../controller/sessionController')
const { upload } = require('../middleware/upload');
sessionRouter.post("/create-session", authMiddleware, upload.single('image'), createSession);
sessionRouter.get("/", authMiddleware, getSession);
module.exports = sessionRouter;