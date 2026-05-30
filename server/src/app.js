const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/userRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const chatRoutes = require('./routes/chatRoutes')
require('dotenv').config()

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Mongo Connected")).catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/chat", chatRoutes)

app.get("/", (req, res) => {
    res.send("API running");
})

app.listen(process.env.PORT, () => {
    console.log("Server started")
})