import React, { useEffect, useState } from "react";
import icon from "../../assets/img/train-icon.png";
import "../../styles/TrainSchedule.css";
import { BsArrowRight } from "react-icons/bs";
import SeatSelect from "./SeatSelect";
import TripInfo from "./TripInfo";
import useStore from "../../store/trains";
import SeatSelectHardSleeper6 from "./SeatSelectHardSleeper6";
import SeatSelectHardSleeper4 from "./SeatSelectHardSleeper4";
import SeatSelectSoftSeat from "./SeatSelectSoftSeat";

const TrainSchedule = ({
  onAddToCart,
  trains,
  trainsReturn,
  loading,
  loadingReturn,
  error,
}) => {
  const { station } = useStore();

  const { departureStation, arrivalStation, departureDate, returnDate } =
    station;
  const isRoundTrip = station.ticketType === "roundTrip";
  console.log(isRoundTrip);

  // Trạng thái lưu thông tin ghế đang được chọn cho từng chuyến tàu
  const [selectedSeats, setSelectedSeats] = useState({}); // Lưu trạng thái ghế đã chọn
  const [selectedSeatPrices, setSelectedSeatPrices] = useState({}); // Lưu giá ghế đã chọn
  const [selectedCar, setSelectedCar] = useState(null); // Lưu toa tàu được chọn
  const [selectedSeatType, setSelectedSeatType] = useState(null); // Lưu loại ghế được chọn
  const [enrichedTrains, setEnrichedTrains] = useState([]);
  
  const seatTypeDisplayName = {
    soft: "Ngồi mềm",
    hard_sleeper_4: "Nằm khoang 4",
    hard_sleeper_6: "Nằm khoang 6",
  };

  console.log(trains);
  console.log("hihih", station);

  function isValidDate(date) {
    return date && !isNaN(new Date(date).getTime()); // Kiểm tra ngày hợp lệ
  }
  const fetchSeatAvailability = async ({
    trainID,
    travelDate,
    fromStationID,
    toStationID,
  }) => {
    try {
      const query = new URLSearchParams({
        trainID,
        travel_date: travelDate,
        from_station_id: fromStationID,
        to_station_id: toStationID,
      });

      const res = await fetch(`/api/seats?${query.toString()}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Lỗi khi lấy dữ liệu ghế");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Lỗi khi fetch seat availability:", error.message);
      return [];
    }
  };

  useEffect(() => {
    async function loadSeatsForAllTrains() {
      const results = {};
      const normalize = (str) => str?.toLowerCase().trim();
  
      await Promise.all(
        trains.map(async (train) => {
          const departureStationID = train.train_stop.find(
            (stop) =>
              normalize(stop.station.station_name) ===
              normalize(station.departureStation)
          )?.station.station_id;
  
          const arrivalStationID = train.train_stop.find(
            (stop) =>
              normalize(stop.station.station_name) ===
              normalize(station.arrivalStation)
          )?.station.station_id;
  
          if (!departureStationID || !arrivalStationID) {
            console.warn(
              `❗Không tìm thấy station ID cho tàu ${train.train_name}:`,
              {
                departureStation: station.departureStation,
                arrivalStation: station.arrivalStation,
              }
            );
            results[train.trainID] = [];
            return;
          }
  
          const seats = await fetchSeatAvailability({
            trainID: train.trainID,
            travelDate: station.departureDate,
            fromStationID: departureStationID,
            toStationID: arrivalStationID,
          });
  
          console.log("✅ Ghế lấy về:", seats);
          results[train.trainID] = seats;
        })
      );
  
      const trainsWithSeats = trains.map((train) => ({
        ...train,
        seats: results[train.trainID] || [],
      }));
  
      setEnrichedTrains(trainsWithSeats);
    }
  
    if (Array.isArray(trains) && trains.length > 0 && station) {
      console.log("🚀 Bắt đầu fetch ghế cho từng chuyến tàu...");
      loadSeatsForAllTrains();
    } else {
      setEnrichedTrains([]);
    }
  }, [trains, station]);
  


  // Tải dữ liệu tàu chiều đi
  console.log(departureDate, departureStation, arrivalStation);
  console.log("hii", trains);

  // Hàm xử lý khi chọn ghế
  const handleSeatClick = (trainId, seatType, seatPrice, e) => {
    e.preventDefault();

    console.log("✅ CLICKED", { trainId, seatType, seatPrice });

    setSelectedSeats((prevState) => ({
      ...prevState,
      [trainId]: prevState[trainId] === seatType ? null : seatType,
    }));

    setSelectedSeatPrices((prevState) => ({
      ...prevState,
      [trainId]: prevState[trainId] === seatType ? null : seatPrice,
    }));

    setSelectedSeatType(seatType);
  };

  const renderSeatComponent = (train, stationtype = "Chiều Đi") => {
    const dynamicCars = [];
    if (Array.isArray(train.seats)) {
      train.seats.forEach((seatType) => {
        if (Array.isArray(seatType.coaches)) {
          seatType.coaches.forEach((coach) => {
            if (!dynamicCars.some((c) => c.id === coach.coach)) {
              dynamicCars.push({
                id: coach.coach,
                name: `Toa ${coach.coach}`,
                seatType: seatType.seat_type,
              });
            }
          });
        }
      });
    }

    dynamicCars.sort((a, b) => b.id.localeCompare(a.id));

    switch (selectedSeatType) {
      case "hard_sleeper_6":
        return (
          <SeatSelectHardSleeper6
            stationtype={stationtype}
            selectedSeat={selectedSeats[train.trainID]}
            setSelectedSeat={(seat) =>
              setSelectedSeats((prev) => ({
                ...prev,
                [train.trainID]: seat,
              }))
            }
            seatPrice={selectedSeatPrices[train.trainID]}
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
            selectedSeatType={selectedSeatType}
            cars={dynamicCars}
            trainName={train.train_name}
            onAddToCart={onAddToCart}
            allSeats={train.seats}
          />
        );
    
      case "hard_sleeper_4":
        return (
          <SeatSelectHardSleeper4
            stationtype={stationtype}
            selectedSeat={selectedSeats[train.trainID]}
            setSelectedSeat={(seat) =>
              setSelectedSeats((prev) => ({
                ...prev,
                [train.trainID]: seat,
              }))
            }
            seatPrice={selectedSeatPrices[train.trainID]}
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
            selectedSeatType={selectedSeatType}
            cars={dynamicCars}
            trainName={train.train_name}
            onAddToCart={onAddToCart}
            allSeats={train.seats}
          />
        );
    
      case "soft":
        return (
          <SeatSelectSoftSeat
            stationtype={stationtype}
            selectedSeat={selectedSeats[train.trainID]}
            setSelectedSeat={(seat) =>
              setSelectedSeats((prev) => ({
                ...prev,
                [train.trainID]: seat,
              }))
            }
            seatPrice={selectedSeatPrices[train.trainID]}
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
            selectedSeatType={selectedSeatType}
            cars={dynamicCars}
            trainName={train.train_name}
            onAddToCart={onAddToCart}
            allSeats={train.seats}
          />
        );
    
      default:
        return (
          <SeatSelect
            stationtype={stationtype}
            selectedSeat={selectedSeats[train.trainID]}
            setSelectedSeat={(seat) =>
              setSelectedSeats((prev) => ({
                ...prev,
                [train.trainID]: seat,
              }))
            }
            seatPrice={selectedSeatPrices[train.trainID]}
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
            selectedSeatType={selectedSeatType}
            cars={dynamicCars}
            trainName={train.train_name}
            onAddToCart={onAddToCart}
            allSeats={train.seats}
          />
        );
    };
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
                {Array.isArray(enrichedTrains) && enrichedTrains.length > 0 ? (
                  enrichedTrains.map((train) => (
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
                          {enrichedTrains.map((train) => (
                            <div key={train.trainID}>
                              {/* Các info về tàu */}
                              <div className="row">
                                {Array.isArray(train.seats) &&
                                train.seats.length > 0 ? (
                                  train.seats.map((seat, index) => (
                                    <div
                                      className="col p-0"
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
                                            train.trainID,
                                            seat.seat_type,
                                            seat.price,
                                            e
                                          )
                                        }
                                      >
                                        {seatTypeDisplayName[seat.seat_type] ||
                                          seat.seat_type}
                                      </button>
                                      <button
                                        className="btn border-0 seatprice p-0"
                                        onClick={(e) =>
                                          handleSeatClick(
                                            train.trainID,
                                            seat.seat_type,
                                            seat.price,
                                            e
                                          )
                                        }
                                      >
                                        Từ {seat.price.toLocaleString()}đ
                                      </button>
                                      <button
                                        className="btn border-0 seatavailabel p-0"
                                        onClick={(e) =>
                                          handleSeatClick(
                                            train.trainID,
                                            seat.seat_type,
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
                                  ))
                                ) : (
                                  <p>Không có dữ liệu ghế</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {selectedSeats[train.trainID] && (
                          <div className="row mt-4">
                            <div className="col text-center">
                              {renderSeatComponent(train, "Chiều Đi")}
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
