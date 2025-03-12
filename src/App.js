import React, { useEffect, useState } from "react";
import AppRoutes from "./Routes"; // Đảm bảo đường dẫn chính xác
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Gọi API từ Next.js backend
    fetch("http://localhost:3000/api/hello")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi gọi API");
        }
        return response.json();
      })
      .then((data) => {
        // Hiển thị lời chào trên console frontend
        console.log("Frontend: Xin chào từ Next.js backend!");
        setMessage(data.message); // Cập nhật state với dữ liệu từ backend
      })
      .catch((error) => console.error("Lỗi khi gọi API:", error));
  }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
