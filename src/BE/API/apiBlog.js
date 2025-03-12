const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors()); // Cho phép các yêu cầu từ các nguồn gốc khác
const port = 5000;

// Đường dẫn đến tệp db.json
const dbPath = path.join(__dirname, "db.json");

const getDataFromDB = () => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8"); // Đọc tệp JSON
    return JSON.parse(data); // Phân tích dữ liệu JSON
  } catch (error) {
    console.error("Lỗi khi đọc tệp db.json:", error);
    return null; // Nếu có lỗi, trả về null
  }
};

// API lấy tất cả bài viết
app.get("/blogs", (req, res) => {
  const { category } = req.query; // Lấy giá trị category từ query string nếu có

  const data = getDataFromDB();
  let blogs = data.blogs;

  // Nếu có category trong query string, lọc theo category
  if (category) {
    const formattedCategory = category.replace(/-/g, " "); // Chuyển "noi-bo" -> "Nội Bộ"
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

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
