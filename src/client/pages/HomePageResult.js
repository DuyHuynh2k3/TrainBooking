import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Header from "../components/Header";
import BookForm from "../components/BookForm";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import TrainSchedule from "../components/TrainSchedule";
import useStore from "../../store/trains";

const HomePageResult = () => {
  const { station } = useStore();

  const [trains, setTrains] = useState([]);
  const [trainsReturn, setTrainsReturn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingReturn, setLoadingReturn] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const fetchTrains = useCallback(async () => {
    console.log("Gửi request chiều đi:", station);
    try {
      setLoading(true);
      setTrains([]); // ✅ clear kết quả cũ trước khi fetch mới
      const response = await axios.get("http://localhost:3000/api/trains/search", {
        params: {
          departureStation: station.departureStation,
          arrivalStation: station.arrivalStation,
          departureDate: station.departureDate,
        },
      });
      console.log("Dữ liệu trả về từ API:", response.data);
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        setTrains(data);
      } else {
        setTrains([]); // ✅ clear nếu API trả về rỗng
      }
    } catch (error) {
      setError("Có lỗi xảy ra khi tải dữ liệu.");
      console.error("Lỗi chiều đi:", error);
      setTrains([]); // ✅ clear nếu lỗi
    } finally {
      setLoading(false);
    }
  }, [station]);

  const fetchTrainsReturn = useCallback(async () => {
    if (station.ticketType === "roundTrip") {
      console.log("Đang gọi hàm fetchTrainsReturn...");
      setLoadingReturn(true);
      setTrainsReturn([]); // ✅ clear kết quả cũ trước khi fetch
      try {
        const response = await axios.get("http://localhost:3000/api/trains/search", {
          params: {
            departureStationId: station.arrivalStationId,
            arrivalStationId: station.departureStationId,
            departureDate: station.returnDate,
          },
        });
        console.log("Dữ liệu trả về từ API chiều về:", response.data);
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setTrainsReturn(data);
        } else {
          setTrainsReturn([]); // ✅ clear nếu rỗng
        }
      } catch (error) {
        setError("Có lỗi xảy ra khi tải dữ liệu chiều về.");
        console.error("Lỗi chiều về:", error);
        setTrainsReturn([]); // ✅ clear nếu lỗi
      } finally {
        setLoadingReturn(false);
      }
    }
  }, [station]);

  useEffect(() => {
    if (
      station.departureStation &&
      station.arrivalStation &&
      station.departureDate &&
      !isNaN(new Date(station.departureDate))
    ) {
      fetchTrains();
    }

    if (station.ticketType === "roundTrip" && station.returnDate) {
      fetchTrainsReturn();
    }
  }, [station, fetchTrains, fetchTrainsReturn]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cartTickets", JSON.stringify(cart));
    }
  }, [cart]);

  const handleAddToCart = (ticket, index = null) => {
    setCart((prevCart) => {
      let newCart;
      if (index !== null) {
        newCart = prevCart.filter((_, i) => i !== index);
      } else if (ticket === null) {
        newCart = prevCart.slice(0, -1);
      } else {
        newCart = [...prevCart, ticket];
      }
      console.log("🛒 Giỏ vé sau khi cập nhật:", newCart);
      return newCart;
    });
  };

  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#f7f7f7" }}>
      <Header />
      <Carousel />
      <main>
        <BookForm cart={cart} onAddToCart={handleAddToCart} />
        <TrainSchedule
          onAddToCart={handleAddToCart}
          trains={trains}
          trainsReturn={trainsReturn}
          loading={loading}
          loadingReturn={loadingReturn}
          error={error}
          station={station}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomePageResult;
