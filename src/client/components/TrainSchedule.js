import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import icon from "../../assets/img/train-icon.png";
import "../../styles/TrainSchedule.css";
import { BsArrowRight } from "react-icons/bs";
import SeatSelect from "./SeatSelect";
import TripInfo from "./TripInfo";

const TrainSchedule = ({ onAddToCart }) => {
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
  const {
    departureDate,
    returnDate,
    departureStation,
    arrivalStation,
    isRoundTrip,
  } = location.state || {};
  console.log("📥 Dữ liệu nhận từ location.state:", location.state);

  const [trains, setTrains] = useState([]); // Danh sách tàu chiều đi
  const [trainsReturn, setTrainsReturn] = useState([]); // Danh sách tàu chiều về
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu chiều đi
  const [loadingReturn, setLoadingReturn] = useState(false); // Trạng thái tải dữ liệu chiều về
  const [availableTrains, setAvailableTrains] = useState(0); // Số tàu còn vé chiều đi
  const [availableTrainsReturn, setAvailableTrainsReturn] = useState(0); // Số tàu còn vé chiều về

  // Trạng thái lưu thông tin ghế đang được chọn cho từng chuyến tàu
  const [selectedSeats, setSelectedSeats] = useState({}); // Lưu trạng thái ghế đã chọn
  const [selectedSeatPrices, setSelectedSeatPrices] = useState({}); // Lưu giá ghế đã chọn
  const [selectedCar, setSelectedCar] = useState(null); // Lưu toa tàu được chọn
  const [selectedSeatType, setSelectedSeatType] = useState(null); // Lưu loại ghế được chọn

  // Tải dữ liệu tàu chiều đi
  useEffect(() => {
    if (!departureDate || !departureStation || !arrivalStation) return;

    // Kiểm tra ngày về phải >= ngày đi nếu là khứ hồi
    if (
      isRoundTrip &&
      (!returnDate || new Date(returnDate) < new Date(departureDate))
    ) {
      console.error("Ngày về phải lớn hơn hoặc bằng ngày đi!");
      return;
    }

    setLoading(true);
    axios
      .get("http://localhost:5000/api/trains", {
        params: { departureDate, departureStation, arrivalStation },
      })
      .then((response) => {
        setTrains(response.data);
        setLoading(false);
        setAvailableTrains(
          response.data.filter((train) =>
            train.seats.some((seat) => seat.available > 0)
          ).length
        );
      })
      .catch((error) => {
        console.error("Có lỗi khi tải dữ liệu tàu chiều đi:", error);
        setLoading(false);
      });

    if (isRoundTrip) {
      setLoadingReturn(true);
      axios
        .get("http://localhost:5000/api/trains", {
          params: {
            departureDate: returnDate,
            departureStation: arrivalStation,
            arrivalStation: departureStation,
          },
        })
        .then((response) => {
          setTrainsReturn(response.data);
          setLoadingReturn(false);
          setAvailableTrainsReturn(
            response.data.filter((train) =>
              train.seats.some((seat) => seat.available > 0)
            ).length
          );
        })
        .catch((error) => {
          console.error("Có lỗi khi tải dữ liệu tàu chiều về:", error);
          setLoadingReturn(false);
        });
    }
  }, [
    departureDate,
    returnDate,
    departureStation,
    arrivalStation,
    isRoundTrip,
  ]);
  console.log(
    "📤 Gửi request chiều đi:",
    departureDate,
    departureStation,
    arrivalStation
  );
  console.log(
    "📤 Gửi request chiều về:",
    returnDate,
    arrivalStation,
    departureStation
  );
  console.log(trainsReturn);
  console.log("🔄 isRoundTrip:", isRoundTrip);

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

  // Hiển thị spinner nếu đang tải dữ liệu
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-2">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 p-0">
          {/* Phần lịch trình chiều đi */}
          <div className="card shadow mb-4">
            <div className="card-header text-primary d-flex justify-content-between p-2">
              <TripInfo
                departureDate={departureDate}
                departureStation={departureStation}
                arrivalStation={arrivalStation}
                isReturnTrip={false}
              />
              <div className="text-primary" style={{ fontWeight: "bold" }}>
                <strong>{availableTrains}</strong> Tàu còn vé cho ngày này
              </div>
            </div>
            <div className="card-body">
              <form className="">
                {trains.map((train) => (
                  <div key={train.id} className="card shadow-sm mb-4">
                    <div className="card-body shadow-lg">
                      {/* Nội dung tàu chiều đi */}
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
                              {train.departureDate} từ {train.departureStation}
                            </div>
                            <div className="gaden1">
                              {train.arrivalDate} đến {train.arrivalStation}
                            </div>
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
                                  handleSeatClick(
                                    train.id,
                                    seat.type,
                                    seat.price,
                                    e
                                  )
                                }
                              >
                                {seat.type}
                              </button>
                              <button
                                className="btn border-0 seatprice p-0"
                                onClick={(e) =>
                                  handleSeatClick(
                                    train.id,
                                    seat.type,
                                    seat.price,
                                    e
                                  )
                                }
                              >
                                Từ {seat.price}
                              </button>
                              <button
                                className="btn border-0 seatavailabel p-0"
                                onClick={(e) =>
                                  handleSeatClick(
                                    train.id,
                                    seat.type,
                                    seat.price,
                                    e
                                  )
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
                              setSelectedCar={setSelectedCar}
                              selectedSeatType={selectedSeatType}
                              cars={cars}
                              trainName={train.name}
                              onAddToCart={onAddToCart}
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

          {/* Phần lịch trình chiều về (nếu là khứ hồi) */}
          {isRoundTrip && (
            <div className="card shadow mb-4">
              <div className="card-header text-primary d-flex justify-content-between p-2">
                <TripInfo
                  departureDate={returnDate}
                  departureStation={arrivalStation}
                  arrivalStation={departureStation}
                  isReturnTrip={true} // Chiều về
                />
                <div className="text-primary" style={{ fontWeight: "bold" }}>
                  <strong>{availableTrainsReturn}</strong> Tàu còn vé cho ngày
                  về
                </div>
              </div>
              <div className="card-body">
                <form className="">
                  {loadingReturn ? (
                    <div className="text-center mt-3">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Đang tải...</span>
                      </div>
                    </div>
                  ) : (
                    trainsReturn.map((train) => (
                      <div key={train.id} className="card shadow-sm mb-4">
                        <div className="card-body shadow-lg">
                          {/* Nội dung tàu chiều về */}
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
                                  {train.departureDate}
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
                                  {train.departureDate} từ{" "}
                                  {train.departureStation}
                                </div>
                                <div className="gaden1">
                                  {train.arrivalDate} đến {train.arrivalStation}
                                </div>
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
                                      handleSeatClick(
                                        train.id,
                                        seat.type,
                                        seat.price,
                                        e
                                      )
                                    }
                                  >
                                    {seat.type}
                                  </button>
                                  <button
                                    className="btn border-0 seatprice p-0"
                                    onClick={(e) =>
                                      handleSeatClick(
                                        train.id,
                                        seat.type,
                                        seat.price,
                                        e
                                      )
                                    }
                                  >
                                    Từ {seat.price}
                                  </button>
                                  <button
                                    className="btn border-0 seatavailabel p-0"
                                    onClick={(e) =>
                                      handleSeatClick(
                                        train.id,
                                        seat.type,
                                        seat.price,
                                        e
                                      )
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
                                  setSelectedCar={setSelectedCar}
                                  selectedSeatType={selectedSeatType}
                                  cars={cars}
                                  trainName={train.name}
                                  onAddToCart={onAddToCart}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default TrainSchedule;
