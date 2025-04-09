import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import BookForm from "../components/BookForm";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import TrainSchedule from "../components/TrainSchedule";
import useStore from "../../store/trains";
const HomePageResult = () => {
  // Get form data from location.state or fallback to localStorage if empty
  const { station } = useStore();
  const [trains, setTrains] = useState([]); // Tàu chiều đi
  const [trainsReturn, setTrainsReturn] = useState([]); // Tàu chiều về
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [loadingReturn, setLoadingReturn] = useState(false); // Trạng thái tải dữ liệu chiều về
  const [error, setError] = useState(null); // Lỗi nếu có

  const [isFetching, setIsFetching] = useState(false);

  const fetchTrains = async () => {
    console.log("Gửi request chiều đi:", {
      departureStationId: station.departureStation,
      arrivalStationId: station.arrivalStation,
      departureDate: station.departureDate,
    });
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/trains/search",
        {
          params: {
            departureStation: station.departureStation, // Dữ liệu bạn muốn gửi
            arrivalStation: station.arrivalStation,
            departureDate: station.departureDate,
          }
         
        }
      );
      console.log("Dữ liệu trả về từ API:", response.data);
      setTrains(response.data);
    } catch (error) {
      setError("Có lỗi xảy ra khi tải dữ liệu.");
      console.error("Lỗi chiều đi:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm lấy dữ liệu tàu chiều về (nếu là khứ hồi)
  const fetchTrainsReturn = async () => {
    if (station.ticketType === "roundTrip") {
      console.log("Đang gọi hàm fetchTrainsReturn..."); // Kiểm tra xem hàm có được gọi không
      setLoadingReturn(true); // Bắt đầu tải dữ liệu chiều về
      try {
        const response = await axios.get(
          "http://localhost:3000/api/trains/search",
          {
            // Thêm base URL
            params: {
              departureStationId: station.arrivalStationId, // Sửa tên param
              arrivalStationId: station.departureStationId, // Sửa tên param
              departureDate: station.returnDate,
            },
          }
        );
        console.log("Dữ liệu trả về từ API chiều về:", response.data); // Kiểm tra dữ liệu trả về
        setTrainsReturn(response.data);
      } catch (error) {
        setError("Có lỗi xảy ra khi tải dữ liệu chiều về.");
        console.error("Lỗi chiều về:", error);
      } finally {
        setLoadingReturn(false); // Kết thúc tải dữ liệu chiều về
      }
    }
  };
  useEffect(() => {
    console.log("Fetching trains with station details:", station);

    console.log(station.departureDate);

    console.log("dcm");

    // Kiểm tra các ID ga là số và ngày đi hợp lệ
    if (
      station.departureStation && // Kiểm tra ga đi
      station.arrivalStation && // Kiểm tra ga đến
      station.departureDate && // Kiểm tra ngày đi
      !isNaN(new Date(station.departureDate)) // Kiểm tra ngày đi có hợp lệ không
    ) {
      console.log("Calling fetchTrains...");
      fetchTrains(); // Gọi API lấy dữ liệu tàu chiều đi
    } else {
      console.log("Conditions not met for calling fetchTrains.");
    }

    // Kiểm tra vé khứ hồi
    if (
      station.ticketType === "roundTrip" && // Kiểm tra ticketType là vé khứ hồi
      station.returnDate // Kiểm tra ngày về
    ) {
      console.log("Calling fetchTrainsReturn...");
      fetchTrainsReturn(); // Gọi API lấy dữ liệu tàu chiều về
    } else {
      console.log("Conditions not met for calling fetchTrainsReturn.");
    }
  }, [station]); // Lắng nghe sự thay đổi của `station`

 
  

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
  console.log(station);

  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#f7f7f7" }}>
      <Header />
      <Carousel />
      <main className="">
        <BookForm cart={cart} onAddToCart={handleAddToCart}  />
        <TrainSchedule
          onAddToCart={handleAddToCart}
          trains={trains}
          trainsReturn={trainsReturn}
          loading={loading}
          loadingReturn={loadingReturn}
          error={error}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomePageResult;
