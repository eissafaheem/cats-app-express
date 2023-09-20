const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const initSocketIo = require("./socket/socketIo");

app.use(cors());
app.use(express.json());
connectDb();

app.use('/api/user', require('./routes/userRoute'));
app.use("/api/conversation", require("./routes/conversationRoute"))
app.use("/api/message", require("./routes/messageRoute"))

app.use(errorHandler);

const server = app.listen(process.env.PORT || 5000, () => {
    console.log("Listening...");
})

initSocketIo(server);

