const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const easyrtc = require("easyrtc"); // Dùng thư viện này thay cho NAF/server

const app = express();
const server = http.createServer(app);

// Cấu hình Socket.io với CORS để tránh bị chặn khi gọi từ client khác
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Phục vụ các file tĩnh (nếu bạn để file index.html ở cùng thư mục)
app.use(express.static(__dirname));

// Khởi tạo EasyRTC - Đây là bước thay thế cho naf(io)
// Nó sẽ tự động xử lý việc kết nối giữa các người chơi
const rtc = easyrtc.listen(app, io, {
    logLevel: "debug",
    checkKey: "naf-default"
}, function (err, rtcRef) {
    console.log("EasyRTC Server đã sẵn sàng!");
});

// Lắng nghe cổng
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log("--- NAF Server đang chạy tại ---");
    console.log(`Cổng: ${PORT}`);
    console.log("-------------------------------");
});