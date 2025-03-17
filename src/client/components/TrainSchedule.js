import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiAlignJustify } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import icon from "../../assets/img/train-icon.png";
import "../../styles/TrainSchedule.css";
import { BsArrowRight } from "react-icons/bs";
import SeatSelect from "./SeatSelect";

// Hàm chuyển đổi ngày từ yyyy-mm-dd sang dd/mm/yyyy
const formatDate = (date) => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const TrainSchedule = () => {

  const cars = [
    { id: 1, type: "Toa 1", seatType: "Ngồi mềm" },
    { id: 2, type: "Toa 2", seatType: "Ngồi mềm" },
    { id: 3, type: "Toa 3", seatType: "Nằm khoang 6" },
    { id: 4, type: "Toa 4", seatType: "Nằm khoang 6" },
    { id: 5, type: "Toa 5", seatType: "Nằm khoang 6" },
    { id: 6, type: "Toa 6", seatType: "Nằm khoang 4" },
    { id: 7, type: "Toa 7", seatType: "Nằm khoang 4" },
    { id: 8, type: "Toa 8", seatType: "Nằm khoang 4" },
    { id: 9, type: "Toa 9", seatType: "Nằm khoang 4" },
  ];

  
  const location = useLocation();
  const { departureDate, departureStation, arrivalStation } =
    location.state || {};

  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableTrains, setAvailableTrains] = useState(0); // Trạng thái số tàu còn vé

  // Trạng thái lưu thông tin ghế đang được chọn cho từng chuyến tàu
  const [selectedSeats, setSelectedSeats] = useState({}); // Lưu trạng thái ghế đã chọn
  const [selectedSeatPrices, setSelectedSeatPrices] = useState({}); // Lưu giá ghế đã chọn
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedSeatType, setSelectedSeatType] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/trains")
      .then((response) => {
        setTrains(response.data); // Lưu dữ liệu vào state
        setLoading(false); // Đã tải xong

        const available = response.data.filter((train) =>
          train.seats.some((seat) => seat.available > 0)
        ).length;
        setAvailableTrains(available); // Cập nhật số tàu còn vé
      })
      .catch((error) => {
        console.error("Có lỗi khi tải dữ liệu tàu:", error);
        setLoading(false); // Dừng trạng thái tải
      });
  }, []); // [] để chỉ gọi một lần khi component mount

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Đang tải...</span>
        </div>
      </div>
    );
  }

  // Hàm xử lý khi chọn ghế
  const handleSeatClick = (trainId, seatType, seatPrice, e) => {
    e.preventDefault();
    
    setSelectedSeats((prevState) => ({
      ...prevState,
      [trainId]: prevState[trainId] === seatType ? null : seatType,
    }));
  
    setSelectedSeatPrices((prevState) => ({
      ...prevState,
      [trainId]: prevState[trainId] === seatType ? null : seatPrice, 
    }));
    // Cập nhật loại ghế được chọn
    setSelectedSeatType(seatType);

    // Tìm toa tàu tương ứng với loại ghế
    const foundCar = cars.find((car) => car.seatType === seatType);
    if (foundCar) {
      setSelectedCar(foundCar.id); // Lưu ID toa tàu được chọn
    } else {
      setSelectedCar(null); // Nếu không tìm thấy toa tàu, đặt lại state
    }

  };
  return (
    <div className="container-fluid mt-2">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 p-0">
          <div className="card shadow mb-4">
            <div className="card-header text-primary d-flex justify-content-between p-2">
              <h5
                className="card-title text-main m-0"
                style={{ fontWeight: "bold" }}
              >
                <i className="bi bi-list"></i>
                <FiAlignJustify />
                {/* Hiển thị các thông tin chuyến tàu */}
                {departureDate && departureStation && arrivalStation
                  ? `Chiều đi: ngày ${formatDate(
                      departureDate
                    )} từ ${departureStation} đến ${arrivalStation}`
                  : "Thông tin hành trình"}
              </h5>
              <div className="text-primary" style={{ fontWeight: "bold" }}>
                <strong>{availableTrains}</strong> Tàu còn vé cho ngày này
              </div>
            </div>
            <div className="card-body">
              <form className="">
                {/* Bọc mỗi tàu trong một card riêng biệt */}
                {trains.map((train) => (
                  <div key={train.id} className="card shadow-sm mb-4">
                    <div className="card-body shadow-lg">
                      <div className="d-flex align-items-center border-bottom mt-1">
                        <div style={{ position: "relative" }}>
                          <img
                            alt="Train icon"
                            src={icon}
                            width="100"
                            className="mr-4"
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: "30px",
                              left: "50%",
                              transform: "translateX(-50%)",
                              color: "black",
                              fontWeight: "bold",
                              padding: "5px 10px",
                              borderRadius: "5px",
                            }}
                          >
                            {train.name} {/* Tên tàu từ dữ liệu */}
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <p className="text-muted tongtime">
                              {train.duration}
                            </p>
                            <p className="text-warning giamgia">
                              {train.discount}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="font-weight-bold gadi">
                              {train.departureTime}
                            </div>
                            <span className="text-center">
                              <BsArrowRight className="muiten" />
                            </span>
                            <div className="font-weight-bold gaden">
                              {train.arrivalTime}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between text-muted mt-1">
                            <div className="gadi1">
                              {train.departureStation}
                            </div>
                            <div className="gaden1">{train.arrivalStation}</div>
                          </div>
                          <a
                            href="/"
                            className="chitietkm text-primary"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            Chi tiết khuyến mãi
                          </a>
                        </div>
                      </div>
                      <div className="row mt-4">
                      {train.seats &&
                  train.seats.map((seat, index) => (
                    <div
                      className="col text-center p-0"
                      key={index}
                      style={{
                        border: "1px solid orange",
                        height: "70px",
                      }}
                    >
                      <button
                        className="btn border-0 seattype p-0"
                        onClick={(e) =>
                          handleSeatClick(train.id, seat.type, seat.price, e)
                        }
                      >
                        {seat.type}
                      </button>
                      <button
                        className="btn border-0 seatprice p-0"
                        onClick={(e) =>
                          handleSeatClick(train.id, seat.type, seat.price, e)
                        }
                      >
                        Từ {seat.price}
                      </button>
                      <button
                        className="btn border-0 seatavailabel p-0"
                        onClick={(e) =>
                          handleSeatClick(train.id, seat.type, seat.price, e)
                        }
                        style={{
                          backgroundColor: "#f5f5f5",
                          height: "68px",
                        }}
                      >
                        {seat.available} Chỗ còn
                      </button>
                    </div>
                  ))}
                      </div>
                      {/* Dòng thứ 2 sẽ chỉ hiển thị khi ghế được chọn */}
                      {selectedSeats[train.id] && (
                        <div className="row mt-4">
                          <div className="col text-center">
                            <SeatSelect
                              selectedSeat={selectedSeats[train.id]}
                              setSelectedSeat={(seat) =>
                                setSelectedSeats((prev) => ({
                                  ...prev,
                                  [train.id]: seat,
                                }))
                              }
                              seatPrice={selectedSeatPrices[train.id]}
                              selectedCar={selectedCar}
                              setSelectedCar={setSelectedCar} // Truyền hàm cập nhật selectedCar
                              selectedSeatType={selectedSeatType}
                              cars={cars} // Truyền dữ liệu toa tàu vào SeatSelect
                              trainName={train.name} // Truyền train.name xuống component con
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default TrainSchedule;
