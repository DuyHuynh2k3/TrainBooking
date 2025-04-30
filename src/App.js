import React, { useEffect, useState } from "react";
import AppRoutes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Gọi API từ Next.js backend
<<<<<<< Updated upstream
    fetch(`http://api.goticket.click/api/hello`)
=======
    fetch(`http://localhost:3000/api/hello`)
>>>>>>> Stashed changes
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
