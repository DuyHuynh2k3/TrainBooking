const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors()); // Cho phép các yêu cầu từ nguồn gốc khác

// Đường dẫn đến tệp db.json
const dbPath = path.join(__dirname, "db.json");

const getDataFromDB = () => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Lỗi khi đọc tệp db.json:", error);
    return null;
  }
};

// API lấy tất cả bài viết
app.get("/blogs", (req, res) => {
  const { category } = req.query;
  const data = getDataFromDB();
  let blogs = data.blogs;

  if (category) {
    const formattedCategory = category.replace(/-/g, " ");
    blogs = blogs.filter(
      (blog) => blog.category.toLowerCase() === formattedCategory.toLowerCase()
    );
  }

  if (blogs.length > 0) {
    res.json(blogs);
  } else {
    res.status(404).json({ message: "Không tìm thấy bài viết nào." });
  }
});

// API lấy blog theo ID
app.get("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const data = getDataFromDB();
  const blog = data.blogs.find((b) => b.id === parseInt(id));

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: "Bài viết không tìm thấy." });
  }
});

// Dữ liệu tàu mẫu
const trains = [
  {
    id: 1,
    name: "SE8",
    departureTime: "06:00",
    arrivalTime: "13:39",
    departureStation: "20/03 từ Hà Nội",
    arrivalStation: "21/03 đến Sài Gòn",
    duration: "7 giờ, 39 phút",
    seats: [
      { type: "Ngồi mềm", available: 13, price: "270,000 đ" },
      { type: "Nằm khoang 6", available: 63, price: "369,000 đ" },
      { type: "Nằm khoang 4", available: 30, price: "481,000 đ" }
    ],
    discount: "Giảm tới 20%",
  },
  {
    id: 2,
    name: "SE22",
    departureTime: "10:20",
    arrivalTime: "18:33",
    departureStation: "20/03 từ Hà Nội",
    arrivalStation: "21/03 đến Sài Gòn",
    duration: "8 giờ, 13 phút",
    seats: [
      { type: "Nằm khoang 6", available: 0, price: "369,000 đ" },
      { type: "Ngồi mềm", available: 4, price: "317,000 đ" },
      { type: "Nằm khoang 4", available: 69, price: "545,000 đ" }
    ],
    discount: "Giảm tới 20%",
  }
];

// API lấy danh sách tàu
app.get("/api/trains", (req, res) => {
  res.json(trains);
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
