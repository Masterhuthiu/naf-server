const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const naf = require("networked-aframe/server");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

// ⭐ quan trọng nhất: bật signaling chuẩn của Networked-AFrame
naf(io);

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log("NAF server running on", PORT);
});
