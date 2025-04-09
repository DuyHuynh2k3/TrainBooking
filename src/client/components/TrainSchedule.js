import React, { useState } from "react";
import icon from "../../assets/img/train-icon.png";
import "../../styles/TrainSchedule.css";
import { BsArrowRight } from "react-icons/bs";
import SeatSelect from "./SeatSelect";
import TripInfo from "./TripInfo";
import useStore from "../../store/trains";

const TrainSchedule = ({
  onAddToCart,
  trains,
  trainsReturn,
  loading,
  loadingReturn,
  error,
}) => {
  const { station } = useStore();
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

  const { departureStation, arrivalStation, departureDate, returnDate } =
    station;
  const isRoundTrip = station.ticketType === "roundTrip";

  // Trạng thái lưu thông tin ghế đang được chọn cho từng chuyến tàu
  const [selectedSeats, setSelectedSeats] = useState({}); // Lưu trạng thái ghế đã chọn
  const [selectedSeatPrices, setSelectedSeatPrices] = useState({}); // Lưu giá ghế đã chọn
  const [selectedCar, setSelectedCar] = useState(null); // Lưu toa tàu được chọn
  const [selectedSeatType, setSelectedSeatType] = useState(null); // Lưu loại ghế được chọn

  if (trains.length === 0) {
    return <p>Không có chuyến tàu chiều đi nào phù hợp.</p>;
  }

  function isValidDate(date) {
    return date && !isNaN(new Date(date).getTime()); // Kiểm tra ngày hợp lệ
  }

  // Tải dữ liệu tàu chiều đi
  console.log(departureDate, departureStation, arrivalStation);
  console.log("hii",trains);

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
  if (loading || loadingReturn) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(trains);
  console.log("Dữ liệu trains:", trains); // Kiểm tra cấu trúc dữ liệu
  console.log(
    "Dữ liệu từng tàu:",
    trains.map((train) => train.schedule)
  ); // Kiểm tra thông tin schedule của từng tàu

  return (
    <div className="container-fluid mt-2">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 p-0">
          {/* Phần lịch trình chiều đi */}
          <div className="card shadow mb-4">
            <div className="card-header text-primary d-flex justify-content-between p-2">
              <TripInfo stationtype={"Chiều Đi"} />
              <div className="text-primary" style={{ fontWeight: "bold" }}>
                <strong>{Array.isArray(trains) ? trains.length : 0}</strong> Tàu
                chiều đi còn vé cho ngày này
              </div>
            </div>
            <div className="card-body">
              <form className="">
                {Array.isArray(trains) && trains.length > 0 ? (
                  trains.map((train) => (
                    <div key={train.trainID} className="card shadow-sm mb-4">
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
                              {train.train_name} {/* Tên tàu từ dữ liệu */}
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between">
                              <p className="text-muted tongtime">
                                {train.duration}
                              </p>
                              <p className="text-warning giamgia">
                                {train.discount || "Không có giảm giá"}{" "}
                                {/* Giảm giá (nếu có) */}
                              </p>
                            </div>
                            {/* Duyệt qua từng lịch trình trong mảng schedule */}
                            {train.schedule && train.schedule.length > 0 ? (
                              train.schedule.map((schedule, index) => (
                                <div
                                  key={schedule.schedule_id}
                                  className="d-flex justify-content-between"
                                >
                                  <div className="font-weight-bold gadi">
                                    {isValidDate(schedule.departTime)
                                      ? new Date(
                                          schedule.departTime
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })
                                      : "Giờ xuất phát không hợp lệ"}
                                  </div>
                                  <span className="text-center">
                                    <BsArrowRight className="muiten" />
                                  </span>
                                  <div className="font-weight-bold gaden">
                                    {isValidDate(schedule.arrivalTime)
                                      ? new Date(
                                          schedule.arrivalTime
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })
                                      : "Giờ đến không hợp lệ"}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p>Không có lịch trình tàu</p>
                            )}

                            <div className="d-flex justify-content-between text-muted mt-1">
                              {/* Kiểm tra sự tồn tại của schedule */}
                              <div className="gadi1">
                                {train.schedule && train.schedule.length > 0
                                  ? // Lấy ngày đi từ departTime của schedule
                                    isValidDate(train.schedule[0]?.departTime)
                                    ? `${new Date(
                                        train.schedule[0]?.departTime
                                      ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                      })} từ ${
                                        train.train_stop.find(
                                          (stop) => stop.stop_order === 1
                                        )?.station?.station_name
                                      }`
                                    : "Ngày xuất phát không hợp lệ"
                                  : "Không có thông tin lịch trình xuất phát"}
                              </div>
                              <div className="gaden1">
                                {train.schedule && train.schedule.length > 0
                                  ? // Lấy ngày đến từ arrivalTime của schedule
                                    isValidDate(train.schedule[0]?.arrivalTime)
                                    ? `${new Date(
                                        train.schedule[0]?.arrivalTime
                                      ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                      })} đến ${
                                        train.train_stop.find(
                                          (stop) =>
                                            stop.stop_order ===
                                            Math.max(
                                              ...train.train_stop.map(
                                                (stop) => stop.stop_order
                                              )
                                            )
                                        )?.station?.station_name
                                      }`
                                    : "Ngày đến không hợp lệ"
                                  : "Không có thông tin lịch trình đến"}
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
                                stationtype={"Chiều Đi"}
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
                ) : (
                  <p></p>
                )}
              </form>
            </div>
          </div>
          {/* Phần lịch trình chiều về (nếu là khứ hồi) */}
          {isRoundTrip && (
            <div className="card shadow mb-4">
              <div className="card-header text-primary d-flex justify-content-between p-2">
                <TripInfo stationtype={"Chiều Về"} />
                <div className="text-primary" style={{ fontWeight: "bold" }}>
                  <strong>
                    {Array.isArray(trainsReturn) ? trainsReturn.length : 0}
                  </strong>{" "}
                  Tàu chiều về còn vé cho ngày này
                </div>
              </div>
              <div className="card-body">
                <form>
                  {loadingReturn ? (
                    <div className="text-center mt-3">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Đang tải...</span>
                      </div>
                    </div>
                  ) : Array.isArray(trainsReturn) && trainsReturn.length > 0 ? (
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
                                  stationtype={"Chiều Về"}
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
                  ) : (
                    <p></p>
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
