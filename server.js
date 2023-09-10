const express = require("express");
const app = express();

const server = app.listen(5000, ()=>{
    console.log("Listening...");
})

const io = require("socket.io")(server, {
    cors:{
        origin: "*"
    }
})

io.on("connection", (socket)=>{
    // console.log("Connected");
})

