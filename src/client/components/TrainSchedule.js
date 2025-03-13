import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiAlignJustify } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import icon from "../../assets/img/train-icon.png";
import "../../styles/TrainSchedule.css";
import { BsArrowRight } from "react-icons/bs";

// Hàm chuyển đổi ngày từ yyyy-mm-dd sang dd/mm/yyyy
const formatDate = (date) => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const TrainSchedule = () => {
  const location = useLocation();
  const { departureDate, departureStation, arrivalStation } =
    location.state || {};

  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableTrains, setAvailableTrains] = useState(0); // Trạng thái số tàu còn vé

  // Trạng thái lưu thông tin ghế đang được chọn cho từng chuyến tàu
  const [selectedSeats, setSelectedSeats] = useState({}); // Lưu trạng thái ghế đã chọn

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
    return <div className="text-center mt-5">Đang tải dữ liệu...</div>;
  }

  // Hàm xử lý khi chọn ghế
  const handleSeatClick = (trainId, seatType, e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của <a> nếu có
    // Ngăn chặn hành động refresh trang khi click vào button
    setSelectedSeats((prevState) => ({
      ...prevState,
      [trainId]: seatType === prevState[trainId] ? null : seatType, // Nếu ghế đã chọn, bỏ chọn, nếu chưa chọn, chọn ghế này
    }));
  };

  return (
    <div className="container-fluid mt-2">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 p-0">
          <div className="card shadow mb-4">
            <div className="card-header text-primary d-flex justify-content-between p-2">
              <h5 className="card-title text-main m-0" style={{ fontWeight: "bold" }}>
                <i className="bi bi-list"></i>
                <FiAlignJustify />
                {/* Hiển thị các thông tin chuyến tàu */}
                {departureDate && departureStation && arrivalStation
                  ? `Chiều đi: ngày ${formatDate(departureDate)} từ ${departureStation} đến ${arrivalStation}`
                  : "Thông tin hành trình"}
              </h5>
              <div className="text-primary" style={{ fontWeight: "bold" }}>
                <strong>{availableTrains}</strong> Tàu còn vé cho ngày này
              </div>
            </div>
            <div className="card-body">
              <form>
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
                            <p className="text-muted tongtime">{train.duration}</p>
                            <p className="text-warning giamgia">{train.discount}</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="font-weight-bold gadi">{train.departureTime}</div>
                            <span className="text-center">
                              <BsArrowRight className="muiten" />
                            </span>
                            <div className="font-weight-bold gaden">{train.arrivalTime}</div>
                          </div>
                          <div className="d-flex justify-content-between text-muted mt-1">
                            <div className="gadi1">{train.departureStation}</div>
                            <div className="gaden1">{train.arrivalStation}</div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        {train.seats.map((seat, index) => (
                          <div className="col text-center" key={index}>
                            <button
                              className="btn btn-info"
                              onClick={(e) => handleSeatClick(train.id, seat.type, e)} // Chọn ghế
                              style={{
                                backgroundColor:
                                  selectedSeats[train.id] === seat.type ? "green" : "", // Màu sắc thay đổi khi chọn ghế
                              }}
                            >
                              {seat.type}
                            </button>
                            <div className="text-warning">{seat.available} Chỗ còn</div>
                            <div className="text-muted">từ {seat.price}</div>
                          </div>
                        ))}
                      </div>

                      {/* Dòng thứ 2 sẽ chỉ hiển thị khi ghế được chọn */}
                      {selectedSeats[train.id] && (
                        <div className="row mt-4">
                          <div className="col text-center">
                            <strong>Thông tin chi tiết ghế</strong>
                            <div>
                              {selectedSeats[train.id] === "Ngồi mềm" && "Thông tin cho ghế Ngồi mềm"}
                              {selectedSeats[train.id] === "Nằm khoang 6" && "Thông tin cho ghế Nằm khoang 6"}
                              {selectedSeats[train.id] === "Nằm khoang 4" && "Thông tin cho ghế Nằm khoang 4"}
                            </div>
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
        <div className="col-lg-3">
          {/* Các phần tử khác (giỏ vé hoặc đăng ký hội viên nếu có) */}
        </div>
      </div>
    </div>
  );
};

export default TrainSchedule;
