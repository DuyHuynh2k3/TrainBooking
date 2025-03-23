const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors()); // Cho phép các yêu cầu từ nguồn gốc khác


// Dữ liệu tàu mẫu
const trains = [
  // 🚆 Chiều Hà Nội -> Sài Gòn
  {
    id: 1,
    name: "SE8",
    departureDate: "20/03",
    departureStation: "Hà Nội",
    departureTime: "06:00",
    arrivalDate: "21/03",
    arrivalStation: "Sài Gòn",
    arrivalTime: "13:39",
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
    departureDate: "20/03",
    departureStation: "Hà Nội",
    arrivalDate: "21/03",
    arrivalStation: "Sài Gòn",
    departureTime: "10:20",
    arrivalTime: "18:33",
    duration: "8 giờ, 13 phút",
    seats: [
      { type: "Ngồi mềm", available: 10, price: "260,000 đ" },
      { type: "Nằm khoang 6", available: 20, price: "359,000 đ" },
      { type: "Nằm khoang 4", available: 15, price: "470,000 đ" }
    ],
    discount: "Giảm tới 15%",
  },

  // 🚆 Chiều Sài Gòn -> Hà Nội
  {
    id: 3,
    name: "SE8",
    departureDate: "21/03",
    departureStation: "Sài Gòn",
    arrivalDate: "22/03",
    arrivalStation: "Hà Nội",
    departureTime: "06:00",
    arrivalTime: "13:39",
    duration: "7 giờ, 39 phút",
    seats: [
      { type: "Ngồi mềm", available: 20, price: "275,000 đ" },
      { type: "Nằm khoang 6", available: 50, price: "375,000 đ" },
      { type: "Nằm khoang 4", available: 25, price: "490,000 đ" }
    ],
    discount: "Giảm tới 10%",
  },
  {
    id: 4,
    name: "SE22",
    departureDate: "21/03",
    departureStation: "Sài Gòn",
    arrivalDate: "22/03",
    arrivalStation: "Hà Nội",
    departureTime: "09:00",
    arrivalTime: "17:15",
    duration: "8 giờ, 15 phút",
    seats: [
      { type: "Ngồi mềm", available: 8, price: "265,000 đ" },
      { type: "Nằm khoang 6", available: 30, price: "365,000 đ" },
      { type: "Nằm khoang 4", available: 18, price: "475,000 đ" }
    ],
    discount: "Giảm tới 12%",
  },

  // 🚆 Thêm chuyến khác để test
  {
    id: 5,
    name: "TN1",
    departureDate: "22/03",
    departureStation: "Hà Nội",
    arrivalDate: "23/03",
    arrivalStation: "Đà Nẵng",
    departureTime: "08:00",
    arrivalTime: "20:00",
    duration: "12 giờ",
    seats: [
      { type: "Ngồi mềm", available: 40, price: "180,000 đ" },
      { type: "Nằm khoang 6", available: 30, price: "250,000 đ" },
      { type: "Nằm khoang 4", available: 20, price: "350,000 đ" }
    ],
    discount: "Giảm tới 5%",
  },
  {
    id: 6,
    name: "TN2",
    departureDate: "23/03",
    departureStation: "Đà Nẵng",
    arrivalDate: "24/03",
    arrivalStation: "Hà Nội",
    departureTime: "10:00",
    arrivalTime: "22:00",
    duration: "12 giờ",
    seats: [
      { type: "Ngồi mềm", available: 35, price: "190,000 đ" },
      { type: "Nằm khoang 6", available: 25, price: "260,000 đ" },
      { type: "Nằm khoang 4", available: 15, price: "360,000 đ" }
    ],
    discount: "Không giảm giá",
  }
];

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

app.get("/api/trains", (req, res) => {
  console.log("📜 Dữ liệu tàu hiện tại:", trains);

  console.log("🛠 Nhận request:", req.query); // In toàn bộ query nhận từ FE

  const { departureDate, departureStation, arrivalStation } = req.query;

  if (!departureDate || !departureStation || !arrivalStation) {
    return res.status(400).json({ message: "Thiếu thông tin cần thiết!" });
  }

  // Chuyển từ "YYYY-MM-DD" -> "DD/MM"
  const dateParts = departureDate.split("-");
  const formattedDepartureDate = `${dateParts[2]}/${dateParts[1]}`; 

  console.log("🔍 Tìm kiếm tàu:", { departureDate, departureStation, arrivalStation });
  console.log(`🛠 So sánh ngày: "${formattedDepartureDate}" với dữ liệu tàu`);

  const filteredTrains = trains.filter(train => 
    train.departureDate === formattedDepartureDate &&
    train.departureStation.trim().toLowerCase() === departureStation.trim().toLowerCase() &&
    train.arrivalStation.trim().toLowerCase() === arrivalStation.trim().toLowerCase()
  );

  console.log("🚆 Kết quả tìm kiếm:", filteredTrains);

  if (filteredTrains.length > 0) {
    res.json(filteredTrains);
  } else {
    res.status(404).json({ message: "Không tìm thấy chuyến tàu phù hợp." });
  }
});


// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
