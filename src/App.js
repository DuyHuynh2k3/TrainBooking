import React, { useEffect, useState } from "react";
import AppRoutes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { getApiBaseUrl } from "./utils/api"; // Import hàm tiện ích

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Gọi API từ Next.js backend
    fetch(`${getApiBaseUrl()}api/hello`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi gọi API");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Frontend: Xin chào từ Next.js backend!");
        setMessage(data.message);
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
