const socketIo = require("socket.io")
const SocketIoEvents = require("./SocketEvents")
const Message = require("../models/messageModel");

function initSocketIo(server) {
    const io = socketIo(server, {
        cors: {
            origin: "*"
        }
    })

    io.on(SocketIoEvents.CONNECTION, (socket) => {
        console.log("socket.id", socket.id)

        socket.on(SocketIoEvents.JOIN_MY_ROOM, (userDetails) => {
            socket.join(userDetails._id);
            console.log("joined", userDetails._id)
            socket.in(userDetails._id).emit(SocketIoEvents.JOINED, userDetails._id);
        })

        socket.on(SocketIoEvents.SEND_MESSAGE, async (data) => {
            const usersArray = data.conversation.users;
            for (let i = 0; i < usersArray.length; i++) {
                console.log("message sent to", usersArray[i].name)
                console.log(data.message);
                const message = await Message.findById(data.message._id).populate("sender");
                console.log(message)
                socket.in(usersArray[i]._id).emit(SocketIoEvents.RECIEVE_MESSAGE, data);
            }
        })

        socket.on("disconnect", () => {
            console.log("disconnect")
        })
    })
}

module.exports = initSocketIo;