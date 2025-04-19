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
  const [selectedSeatsReturn, setSelectedSeatsReturn] = useState({});
  const [selectedSeatPrices, setSelectedSeatPrices] = useState({}); // Lưu giá ghế đã chọn
  const [selectedSeatPricesReturn, setSelectedSeatPricesReturn] = useState({});
  const [selectedCar, setSelectedCar] = useState(null); // Lưu toa tàu được chọn
  const [selectedSeatType, setSelectedSeatType] = useState(null); // Lưu loại ghế được chọn
  const [enrichedTrains, setEnrichedTrains] = useState([]);
  const [enrichedTrainsReturn, setEnrichedTrainsReturn] = useState([]);

  const seatTypeDisplayName = {
    soft: "Ngồi mềm",
    hard_sleeper_4: "Nằm khoang 4",
    hard_sleeper_6: "Nằm khoang 6",
  };

  console.log("aa",trains);
console.log("bb",trainsReturn);


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

  // Chiều đi
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
              `❗Không tìm thấy station ID cho tàu ${train.train_name}`
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
      console.log("🚆 Bắt đầu fetch ghế cho chiều đi...");
      loadSeatsForAllTrains();
    } else {
      setEnrichedTrains([]);
    }
  }, [trains, station]);

  // Chiều về (khứ hồi)
  useEffect(() => {
    async function loadSeatsForAllTrainsReturn() {
      const results = {};
      const normalize = (str) => str?.toLowerCase().trim();

      await Promise.all(
        trainsReturn.map(async (train) => {
          const departureStationID = train.train_stop.find(
            (stop) =>
              normalize(stop.station.station_name) ===
              normalize(station.arrivalStation)
          )?.station.station_id;

          const arrivalStationID = train.train_stop.find(
            (stop) =>
              normalize(stop.station.station_name) ===
              normalize(station.departureStation)
          )?.station.station_id;

          if (!departureStationID || !arrivalStationID) {
            console.warn(
              `❗Không tìm thấy station ID chiều về cho tàu ${train.train_name}`
            );
            results[train.trainID] = [];
            return;
          }

          const seats = await fetchSeatAvailability({
            trainID: train.trainID,
            travelDate: station.returnDate,
            fromStationID: departureStationID,
            toStationID: arrivalStationID,
          });

          results[train.trainID] = seats;
        })
      );

      const trainsWithSeatsReturn = trainsReturn.map((train) => ({
        ...train,
        seats: results[train.trainID] || [],
      }));

      setEnrichedTrainsReturn(trainsWithSeatsReturn);
    }

    if (
      Array.isArray(trainsReturn) &&
      trainsReturn.length > 0 &&
      station.ticketType === "roundTrip"
    ) {
      console.log("🚆 Bắt đầu fetch ghế cho chiều về...");
      loadSeatsForAllTrainsReturn();
    } else {
      setEnrichedTrainsReturn([]);
    }
  }, [trainsReturn, station]);

  // Tải dữ liệu tàu chiều đi
  console.log(departureDate, departureStation, arrivalStation);
  console.log("hii", trains);

  const handleSeatClick = (trainId, seatType, seatPrice, e, tripType) => {
    e.preventDefault();
  
    console.log("✅ CLICKED", { trainId, seatType, seatPrice, tripType });
  
    // Xử lý cho chiều đi hoặc chiều về
    if (tripType === "return") {
      // Cập nhật ghế cho chiều về
      setSelectedSeatsReturn((prevState) => ({
        ...prevState,
        [trainId]: prevState[trainId] === seatType ? null : seatType,
      }));
  
      setSelectedSeatPricesReturn((prevState) => ({
        ...prevState,
        [trainId]: prevState[trainId] === seatType ? null : seatPrice,
      }));
    } else {
      // Cập nhật ghế cho chiều đi
      setSelectedSeats((prevState) => ({
        ...prevState,
        [trainId]: prevState[trainId] === seatType ? null : seatType,
      }));
  
      setSelectedSeatPrices((prevState) => ({
        ...prevState,
        [trainId]: prevState[trainId] === seatType ? null : seatPrice,
      }));
    }
  
    // Cập nhật kiểu ghế đã chọn (cho chiều đi hoặc chiều về)
    setSelectedSeatType(seatType);
  };
  
  console.log("Dữ liệu cho chiều đi:", enrichedTrains); 
console.log("Dữ liệu cho chiều về:", enrichedTrainsReturn); // Kiểm tra dữ liệu chiều về


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
  

    const schedule = train.schedule?.[0];
    const departTime = schedule?.departTime;
    const arrivalTime = schedule?.arrivalTime;

    // Kiểm tra là chiều đi hay chiều về
    const isReturn = stationtype === "Chiều Về"; // Nếu là "Chiều Về" thì chọn chiều về
  
    // Chọn state phù hợp với chiều đi hoặc chiều về
    const selectedSeat = isReturn
      ? selectedSeatsReturn[train.trainID] // Sử dụng state chiều về
      : selectedSeats[train.trainID]; // Sử dụng state chiều đi
  
    // Hàm setSelectedSeat cho cả 2 chiều đi và chiều về
    const setSelectedSeat = (seat) => {
      if (isReturn) {
        setSelectedSeatsReturn((prev) => ({
          ...prev,
          [train.trainID]: seat,
        }));
      } else {
        setSelectedSeats((prev) => ({
          ...prev,
          [train.trainID]: seat,
        }));
      }
    };
    const trainid = train.trainID
    const seatPrice = isReturn
      ? selectedSeatPricesReturn[train.trainID] // Giá vé chiều về
      : selectedSeatPrices[train.trainID]; // Giá vé chiều đi
  
    // Dữ liệu props cho tất cả các component seat
    const componentProps = {
      trainid,
      stationtype, // "Chiều Đi" hoặc "Chiều Về"
      selectedSeat,
      setSelectedSeat,
      seatPrice,
      selectedCar,
      setSelectedCar,
      selectedSeatType: selectedSeatType, // Kiểu ghế
      cars: dynamicCars,
      trainName: train.train_name,
      departTime, // Thêm giờ đi
      arrivalTime, // Thêm giờ đến
      onAddToCart: (ticketData) => {
        // Thêm tripType vào vé trước khi thêm vào giỏ
        const ticketWithTripType = {
          ...ticketData,
          tripType: isReturn ? "return" : "depart",
          price: isReturn ? selectedSeatPricesReturn[train.trainID] : selectedSeatPrices[train.trainID],
          departureDate: station.departureDate,
          returnDate: station.returnDate,
          departureStation: station.departureStation,
          arrivalStation: station.arrivalStation,
          selectedSeatType
        };
        onAddToCart(ticketWithTripType);
      },
      allSeats: train.seats,
    };
  
    // Chuyển component tương ứng với kiểu ghế
    switch (selectedSeatType) {
      case "hard_sleeper_6":
        return (
          <SeatSelectHardSleeper6
            {...componentProps}
          />
        );
      case "hard_sleeper_4":
        return (
          <SeatSelectHardSleeper4
            {...componentProps}
          />
        );
      case "soft":
        return (
          <SeatSelectSoftSeat
            {...componentProps}
          />
        );
      default:
        return (
          <SeatSelect
            {...componentProps}
          />
        );
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
                                          timeZone: "UTC",
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
                                          timeZone: "UTC", // ⭐ Quan trọng: Giữ nguyên giờ UTC
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
                                            e,
                                            "departure"
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
                                            e,"departure"
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
                                            e,"departure"
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
                  {Array.isArray(enrichedTrainsReturn) &&
                  enrichedTrainsReturn.length > 0 ? (
                    enrichedTrainsReturn.map((train) => (
                      <div key={train.trainID} className="card shadow-sm mb-4">
                        <div className="card-body shadow-lg">
                          {/* Thông tin tàu tương tự chiều đi */}
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
                                {train.train_name}
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between">
                                <p className="text-muted tongtime">
                                  {train.duration}
                                </p>
                                <p className="text-warning giamgia">
                                  {train.discount || "Không có giảm giá"}
                                </p>
                              </div>
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
                                            timeZone: "UTC",
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
                                            timeZone: "UTC",
                                          })
                                        : "Giờ đến không hợp lệ"}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>Không có lịch trình tàu</p>
                              )}

                              <div className="d-flex justify-content-between text-muted mt-1">
                                <div className="gadi1">
                                  {train.schedule && train.schedule.length > 0
                                    ? isValidDate(train.schedule[0]?.departTime)
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
                                    ? isValidDate(
                                        train.schedule[0]?.arrivalTime
                                      )
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
                                style={{ textDecoration: "none" }}
                              >
                                Chi tiết khuyến mãi
                              </a>
                            </div>
                          </div>

                          {/* Danh sách ghế chiều về */}
                          <div className="row mt-4">
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
                                        e,
                                        "return"
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
                                        e,
                                        "return"
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
                                        e,
                                        "return"
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

                          {selectedSeatsReturn?.[train.trainID] && (
                            <div className="row mt-4">
                              <div className="col text-center">
                                {renderSeatComponent(train, "Chiều Về")}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Không có dữ liệu tàu chiều về</p>
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
