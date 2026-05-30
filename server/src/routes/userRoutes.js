const express = require('express');
const userRouter = express.Router();
const { register, userLogin } = require('../controller/userController');

userRouter.post('/login', userLogin);
userRouter.post('/register', register);

module.exports = userRouter;