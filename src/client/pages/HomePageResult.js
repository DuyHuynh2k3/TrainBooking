import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BookForm from "../components/BookForm";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import TrainSchedule from "../components/TrainSchedule";
import { useLocation } from "react-router-dom";

const HomePageResult = () => {
  const location = useLocation();
  const {
    departureDate,
    departureStation,
    arrivalStation,
    returnDate,
    isRoundTrip,
  } = location.state || {}; // Lấy dữ liệu hoặc set default

  console.log("📥 Dữ liệu nhận được:", location.state);

  const [cart, setCart] = useState([]);

  const handleAddToCart = (ticket, index = null) => {
    setCart((prevCart) => {
      let newCart;
      if (index !== null) {
        // Xóa vé tại vị trí index
        newCart = prevCart.filter((_, i) => i !== index);
      } else if (ticket === null) {
        // Xóa vé cuối cùng
        newCart = prevCart.slice(0, -1);
      } else {
        // Thêm vé mới vào giỏ
        newCart = [...prevCart, ticket];
      }

      console.log("🛒 Giỏ vé sau khi cập nhật:", newCart);
      return newCart;
    });
  };
  console.log("🛒 Giỏ vé trước khi mua:", cart);
  console.log("📥 Props nhận được trong BookForm:", {
    departureDate,
    departureStation,
    arrivalStation,
    returnDate,
    isRoundTrip,
  });
 
  
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cartTickets", JSON.stringify(cart));
    }
  }, [cart]);

   useEffect(() => {
    // Lấy giỏ hàng từ localStorage khi component mount
    const savedCart = localStorage.getItem("cartTickets");
    if (savedCart) {
      setCart(JSON.parse(savedCart)); // Khôi phục giỏ hàng
    }
  }, []);

  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#f7f7f7" }}>
      <Header />
      <Carousel />
      <main className="">
        <BookForm
          cart={cart}
          onAddToCart={handleAddToCart}
          departureDate={departureDate}
          departureStation={departureStation}
          arrivalStation={arrivalStation}
          returnDate={returnDate}
          isRoundTrip={isRoundTrip}
        />
        <TrainSchedule
          ddepartureDate={departureDate}
          departureStation={departureStation} 
          arrivalStation={arrivalStation} 
          returnDate={returnDate}
          isRoundTrip={isRoundTrip}
          onAddToCart={handleAddToCart}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomePageResult;
