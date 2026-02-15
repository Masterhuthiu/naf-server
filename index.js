const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("NAF signaling server running");
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (room) => {
        socket.join(room);
        socket.to(room).emit("userJoined", socket.id);
    });

    socket.on("disconnecting", () => {
        const rooms = [...socket.rooms];
        rooms.forEach((room) => {
            socket.to(room).emit("userLeft", socket.id);
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
