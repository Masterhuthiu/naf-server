const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const easyrtc = require("easyrtc");
const cors = require("cors");

// 1. Khởi tạo ứng dụng Express
const app = express();

// 2. Cấu hình CORS để cho phép Client (GitHub Pages) truy cập vào
app.use(cors());

// 3. Phục vụ file tĩnh (nếu có)
app.use(express.static(__dirname));

// 4. Endpoint kiểm tra server (Sửa lỗi 404 Not Found)
app.get("/", (req, res) => {
    res.send("NAF Server (EasyRTC) is running successfully!");
});

// 5. Tạo HTTP Server
const server = http.createServer(app);

// 6. Cấu hình Socket.io
// Lưu ý: NAF 0.12.0 hoạt động tốt nhất với Socket.io 4.x
const io = socketIo(server, {
    cors: {
        origin: "*", // Cho phép tất cả các nguồn truy cập
        methods: ["GET", "POST"]
    }
});

// 7. Khởi tạo EasyRTC Server (Linh hồn của NAF)
// EasyRTC sẽ quản lý các 'phòng' (rooms) và truyền tín hiệu WebRTC
const rtc = easyrtc.listen(app, io, {
    logLevel: "debug",
    checkKey: "naf-default",
    demosEnable: false // Tắt các bản demo mặc định của EasyRTC
}, function (err, rtcRef) {
    if (err) {
        console.error("Lỗi khởi tạo EasyRTC:", err);
        return;
    }
    console.log("✅ EasyRTC Server đã sẵn sàng!");
});

// 8. Lắng nghe cổng (Port)
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log(`🚀 Server đang chạy tại cổng: ${PORT}`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log("-----------------------------------------");
});