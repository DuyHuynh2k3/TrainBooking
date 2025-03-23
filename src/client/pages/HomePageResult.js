import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BookForm from "../components/BookForm";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import TrainSchedule from "../components/TrainSchedule";
import useStore from "../../store/trains";
const HomePageResult = () => {
  // Get form data from location.state or fallback to localStorage if empty
  const { station, setstation } = useStore(); 
  console.log(station);


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

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cartTickets", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#f7f7f7" }}>
      <Header />
      <Carousel />
      <main className="">
        <BookForm
          cart={cart}
          onAddToCart={handleAddToCart}/>
        <TrainSchedule
          onAddToCart={handleAddToCart}/>
      </main>
      <Footer />
    </div>
  );
};

export default HomePageResult;
