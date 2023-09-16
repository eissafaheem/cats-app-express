const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const cors = require("cors");
const connectDb = require("./config/dbConnection")

app.use(cors());
app.use(express.json());
connectDb();

app.use('/api/user', require('./routes/userRoute'));
app.use("/api/conversation", require("./routes/conversationRoute"))
app.use("/api/message", require("./routes/messageRoute"))


const server = app.listen(process.env.PORT || 5000, () => {
    console.log("Listening...");
})

const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log("Connected");
})

