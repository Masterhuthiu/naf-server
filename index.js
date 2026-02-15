const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io"); // <-- đúng cho v4

const app = express();

/* ========= CORS ========= */
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.send("NAF Server is running");
});

/* ========= HTTP ========= */
const server = http.createServer(app);

/* ========= SOCKET.IO ========= */
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    transports: ["websocket", "polling"]
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

/* ========= PORT ========= */
const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
