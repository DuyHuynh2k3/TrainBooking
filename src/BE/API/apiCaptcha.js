require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
app.use(cors());

const RECAPTCHA_SECRET_KEY = "6LeMDe8qAAAAAALXtP0bLX4i0pgwsILerescMmG1";

// Dữ liệu mẫu (thay cho MySQL)
const tickets = [
  { code: "ABC123", passenger_name: "Nguyễn Văn A", train_number: "SE1", departure_time: "2024-04-01 08:00:00" },
  { code: "XYZ789", passenger_name: "Trần Thị B", train_number: "SE2", departure_time: "2024-04-02 09:00:00" },
];

// API kiểm tra mã vé và CAPTCHA
app.post("/api/find-ticket", async (req, res) => {
  console.log("📥 Dữ liệu nhận từ frontend:", req.body);

  // Kiểm tra nếu req.body bị rỗng
  if (Object.keys(req.body).length === 0) {
    console.error("Lỗi: req.body bị rỗng!");
    return res.status(400).json({ success: false, message: "Lỗi: Dữ liệu gửi lên bị rỗng!" });
  }

  const { ticketCode, captchaToken } = req.body;

  if (!ticketCode || !captchaToken) {
    return res.status(400).json({ success: false, message: "Thiếu dữ liệu!" });
  }

  try {
    // Kiểm tra CAPTCHA với Google API
    const captchaResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        },
      }
    );

    console.log("Phản hồi từ Google:", captchaResponse.data);

    if (!captchaResponse.data.success) {
      return res.status(400).json({ success: false, message: "CAPTCHA không hợp lệ!" });
    }

    // Kiểm tra mã vé
    const ticket = tickets.find(t => t.code === ticketCode);

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Mã vé không tồn tại!" });
    }

    res.json({ success: true, data: ticket });

  } catch (error) {
    console.error("Lỗi xác thực CAPTCHA:", error);
    res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
  }
});

// Chạy server
app.listen(5000, () => {
  console.log("Server đang chạy trên http://localhost:5000");
});
