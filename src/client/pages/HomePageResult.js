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

  const fetchTrainData = useCallback(async () => {
    try {
      const params = {
        departureStation: station.departureStation,
        arrivalStation: station.arrivalStation,
        departureDate: station.departureDate,
        returnDate:
          station.ticketType === "roundTrip" ? station.returnDate : undefined,
      };

      console.log("🔎 Đang fetch dữ liệu với params:", params);

      const response = await axios.get(
        "http://localhost:3000/api/trains/search",
        { params }
      );

      console.log("✅ Dữ liệu trả về từ API:", response.data);

      const outboundData = Array.isArray(response.data?.outbound)
        ? response.data.outbound
        : [];
      const returnData = Array.isArray(response.data?.return)
        ? response.data.return
        : [];

      setTrains(outboundData);
      setTrainsReturn(
        station.ticketType === "roundTrip" ? returnData : []
      );
    } catch (error) {
      console.error("❌ Lỗi khi fetch dữ liệu:", error);
      setError("Đã xảy ra lỗi khi tải dữ liệu tàu.");
      setTrains([]);
      setTrainsReturn([]);
    } finally {
      setLoading(false);
      setLoadingReturn(false);
    }
  }, [station]);

  useEffect(() => {
    const isValid =
      station.departureStation &&
      station.arrivalStation &&
      station.departureDate;

    if (!isValid) {
      setError("Vui lòng nhập đầy đủ thông tin tìm kiếm.");
      return;
    }

    if (
      station.ticketType === "roundTrip" &&
      (!station.returnDate ||
        new Date(station.returnDate) < new Date(station.departureDate))
    ) {
      setError("Ngày về phải sau ngày đi.");
      return;
    }

    setLoading(true);
    setLoadingReturn(station.ticketType === "roundTrip");
    setError(null);

    fetchTrainData();
  }, [station, fetchTrainData]);

  // Xóa chiều về nếu người dùng chuyển sang 1 chiều
  useEffect(() => {
    if (station.ticketType !== "roundTrip") {
      setTrainsReturn([]);
    }
  }, [station.ticketType]);

  // Lưu giỏ vé vào localStorage
  useEffect(() => {
    localStorage.setItem("cartTickets", JSON.stringify(cart));
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
        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}
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
