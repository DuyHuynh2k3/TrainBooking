const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

// Cấu hình CORS cho phép tất cả các nguồn gốc (Origins)
app.use(cors());

// Dữ liệu tàu mẫu
const trains = [
  {
    id: 1,
    name: "SE8",
    departureTime: "06:00",
    arrivalTime: "13:39",
    route: "Sài Gòn -> Nha Trang",
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
    route: "Sài Gòn -> Nha Trang",
    duration: "8 giờ, 13 phút",
    seats: [
      { type: "Nằm khoang 6", available: 0, price: "369,000 đ" },
      { type: "Ngồi mềm", available: 4, price: "317,000 đ" },
      { type: "Nằm khoang 4", available: 69, price: "545,000 đ" }
    ],
    discount: "Giảm tới 20%",
  },
  {
    id: 3,
    name: "SE24",
    departureTime: "08:00",
    arrivalTime: "15:20",
    route: "Sài Gòn -> Nha Trang",
    duration: "7 giờ, 20 phút",
    seats: [
      { type: "Ngồi mềm", available: 15, price: "250,000 đ" },
      { type: "Nằm khoang 6", available: 50, price: "400,000 đ" },
      { type: "Nằm khoang 4", available: 40, price: "490,000 đ" }
    ],
    discount: "Giảm tới 15%",
  },
  {
    id: 4,
    name: "SE30",
    departureTime: "12:00",
    arrivalTime: "19:30",
    route: "Sài Gòn -> Nha Trang",
    duration: "7 giờ, 30 phút",
    seats: [
      { type: "Ngồi mềm", available: 20, price: "280,000 đ" },
      { type: "Nằm khoang 6", available: 45, price: "410,000 đ" },
      { type: "Nằm khoang 4", available: 35, price: "500,000 đ" }
    ],
    discount: "Giảm tới 25%",
  },
  {
    id: 5,
    name: "SE12",
    departureTime: "14:30",
    arrivalTime: "22:00",
    route: "Sài Gòn -> Nha Trang",
    duration: "7 giờ, 30 phút",
    seats: [
      { type: "Ngồi mềm", available: 5, price: "320,000 đ" },
      { type: "Nằm khoang 6", available: 30, price: "380,000 đ" },
      { type: "Nằm khoang 4", available: 50, price: "520,000 đ" }
    ],
    discount: "Giảm tới 10%",
  },
  {
    id: 6,
    name: "SE18",
    departureTime: "16:00",
    arrivalTime: "23:40",
    route: "Sài Gòn -> Nha Trang",
    duration: "7 giờ, 40 phút",
    seats: [
      { type: "Ngồi mềm", available: 8, price: "300,000 đ" },
      { type: "Nằm khoang 6", available: 28, price: "390,000 đ" },
      { type: "Nằm khoang 4", available: 20, price: "510,000 đ" }
    ],
    discount: "Giảm tới 5%",
  },
  {
    id: 7,
    name: "SE28",
    departureTime: "18:00",
    arrivalTime: "01:10",
    route: "Sài Gòn -> Nha Trang",
    duration: "7 giờ, 10 phút",
    seats: [
      { type: "Ngồi mềm", available: 12, price: "260,000 đ" },
      { type: "Nằm khoang 6", available: 40, price: "380,000 đ" },
      { type: "Nằm khoang 4", available: 45, price: "500,000 đ" }
    ],
    discount: "Giảm tới 15%",
  }
];

app.get('/api/trains', (req, res) => {
  res.json(trains);
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
