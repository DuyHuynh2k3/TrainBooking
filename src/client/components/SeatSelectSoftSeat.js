// components/SeatSelectHardSleeper6.jsx
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import "../../styles/SeatSelect.css";
import headtrain from "../../assets/img/train1.png";
import train from "../../assets/img/train2.png";

const SeatSelectSoftSeat = ({
  selectedSeat,
  setSelectedSeat,
  seatPrice,
  selectedCar,
  setSelectedCar,
  selectedSeatType,
  cars = [],
  allSeats,
  trainName,
  onAddToCart,
  departureDate,
}) => {
  const [seatsData, setSeatsData] = useState([]);

  const seatTypeLabels = {
    soft: "Ngồi mềm",
  };

  const filteredCars = cars.filter((car) => car.seatType === selectedSeatType);

  const carsWithHeadTrain = [
    ...filteredCars,
    { id: 0, type: "Đầu tàu", seatType: "Đầu tàu", name: trainName },
  ];

  useEffect(() => {
    if (filteredCars.length > 0) {
      setSelectedCar(filteredCars[0].id);
    }
  }, [selectedSeatType]);

  useEffect(() => {
    if (selectedCar && allSeats) {
      const seatTypeData = allSeats.find(
        (st) => st.seat_type === selectedSeatType
      );
      const coachData = seatTypeData?.coaches.find(
        (c) => c.coach === selectedCar
      );

      const seats = Array(48)
        .fill(null)
        .map((_, index) => {
          const seatNumber = (index + 1).toString().padStart(2, "0");
          const realSeat = coachData?.seat_numbers?.find(
            (s) => s.seat_number === seatNumber
          );
          return realSeat || null;
        });

      setSeatsData(seats);
    }
  }, [selectedCar, allSeats, selectedSeatType]);

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeat === seatNumber) {
      setSelectedSeat(null);
      onAddToCart(null);
    } else {
      setSelectedSeat(seatNumber);
      const ticket = {
        trainName,
        seat: seatNumber,
        price: seatPrice,
        car: selectedCar,
        seatType: selectedSeatType,
        departureDate,
      };
      onAddToCart(ticket);
    }
  };

  return (
    <div className="container mt-2">
      <div className="seat-select-container">
        <div className="row d-flex justify-content-center align-items-center mb-3">
          <div className="col-12 pt-3">
            {carsWithHeadTrain.map((car) => (
              <div
                key={car.id}
                className="et-car-block ng-scope"
                onClick={() => car.id !== 0 && setSelectedCar(car.id)}
              >
                <div
                  className={
                    car.id === 0
                      ? "et-car-icon headtrain-right"
                      : `et-car-icon ${
                          selectedCar === car.id
                            ? "et-car-icon-selected"
                            : "et-car-icon-avaiable"
                        }`
                  }
                >
                  <Tooltip
                    title={`Toa số ${car.id === 0 ? "Đầu máy" : car.id} - ${
                      seatTypeLabels[selectedSeatType]
                    } điều hòa`}
                    placement="top"
                  >
                    <img
                      src={car.id === 0 ? headtrain : train}
                      alt={`Car ${car.id}`}
                      className="train-car"
                    />
                  </Tooltip>
                </div>
                <span className="text-primary">
                  {car.id === 0 ? car.name : car.id}
                </span>
              </div>
            ))}
            <p className="mt-2 fw-bold text-primary">
              Toa số {selectedCar}: {seatTypeLabels[selectedSeatType]} điều hòa
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 text-center et-car-floor">
          <div className="et-car-door"></div>

          {/* Left side: 24 seats (4 rows, 6 seats each) */}
          <div className="et-car-nm-64-half-block">
            <div className="et-full-width">
              {[...Array(4)].map((_, rowIndex) => (
                <React.Fragment key={`left-row-${rowIndex}`}>
                  <div className="et-car-nm-64-sit">
                    {seatsData
                      .filter((_, index) => index < 24) // Lấy các ghế chẵn cho bên trái
                      .slice(rowIndex * 6, (rowIndex + 1) * 6)
                      .map((seat, index) => (
                        <div
                          key={index}
                          className="et-car-seat-left et-seat-h-35"
                        >
                          <div className="et-col-16 et-sit-side"></div>
                          <div className="et-col-84 et-sit-sur-outer">
                            <div
                              className={`et-sit-sur text-center ${
                                seat ? "et-sit-empty" : "et-sit-bought"
                              }`}
                              onClick={() =>
                                seat && handleSeatSelect(seat.seat_number)
                              }
                              style={{
                                backgroundColor:
                                  seat && selectedSeat === seat.seat_number
                                    ? "orange"
                                    : "",
                              }}
                            >
                              {seat ? seat.seat_number : ""}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  {rowIndex === 1 && ( // Chỉ thêm lối đi sau hàng 1 (index 1)
                    <div className="et-car-way et-full-width-seat"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="et-car-seperator">
            <div></div>
            <div></div>
          </div>

          {/* Right side: 24 seats (4 rows, 6 seats each) */}
          <div className="et-car-nm-64-half-block">
            <div className="et-full-width" style={{ marginLeft: "30px" }}>
              {[...Array(4)].map((_, rowIndex) => (
                <React.Fragment key={`right-row-${rowIndex}`}>
                  <div className="et-car-nm-64-sit">
                    {seatsData
                      .filter((_, index) => index >= 24) // Lấy các ghế lẻ cho bên phải
                      .slice(rowIndex * 6, (rowIndex + 1) * 6)
                      .map((seat, index) => (
                        <div
                          key={index}
                          className="et-car-seat-left et-seat-h-35"
                        >
                          <div className="et-col-16 et-sit-side"></div>
                          <div className="et-col-84 et-sit-sur-outer">
                            <div
                              className={`et-sit-sur text-center ${
                                seat ? "et-sit-empty" : "et-sit-bought"
                              }`}
                              onClick={() =>
                                seat && handleSeatSelect(seat.seat_number)
                              }
                              style={{
                                backgroundColor:
                                  seat && selectedSeat === seat.seat_number
                                    ? "orange"
                                    : "",
                              }}
                            >
                              {seat ? seat.seat_number : ""}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  {rowIndex === 1 && ( // Chỉ thêm lối đi sau hàng 1 (index 1)
                    <div className="et-car-way et-full-width"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="et-car-door"></div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectSoftSeat;
