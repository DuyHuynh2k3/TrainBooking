import React, {} from "react";
import { Button } from "react-bootstrap";
import "../../styles/SeatSelect.css";
import headtrain from "../../assets/img/train1.png";
import train from "../../assets/img/train2.png";

const SeatSelect = ({
  selectedSeat,
  setSelectedSeat,
  seatPrice,
  selectedCar,
  setSelectedCar, // Nhận hàm cập nhật selectedCar từ props
  selectedSeatType,
  cars,
  trainName,  
  onAddToCart,
}) => {
  // Lọc danh sách toa tàu theo loại ghế
  const filteredCars = cars
    .filter((car) => car.seatType === selectedSeatType)
    .sort((a, b) => b.id - a.id); // Sắp xếp giảm dần theo id

  const carsWithHeadTrain = [
    ...filteredCars, // Các toa tàu đã lọc
    { id: 0, type: "Đầu tàu", seatType: "Đầu tàu", name: trainName },
  ];
  const seats = [
    [1, 2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31, 32],
    [33, 34, 35, 36, 37, 38, 39, 40],
    [41, 42, 43, 44, 45, 46, 47, 48],
  ];

  const seatPrices = [
    // Ngồi mềm (1 - 14) -> Chia tầng
    ...Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      type: "Ngồi mềm",
      floor: 1,
      price: 300000 + i * 10000,
    })),
    ...Array.from({ length: 7 }, (_, i) => ({
      id: i + 8,
      type: "Ngồi mềm",
      floor: 2,
      price: 320000 + i * 10000,
    })),

    // Nằm khoang 6 (15 - 28) -> Chia tầng
    ...Array.from({ length: 7 }, (_, i) => ({
      id: i + 15,
      type: "Nằm khoang 6",
      floor: 1,
      price: 450000 + i * 10000,
    })),
    ...Array.from({ length: 7 }, (_, i) => ({
      id: i + 22,
      type: "Nằm khoang 6",
      floor: 2,
      price: 470000 + i * 10000,
    })),

    // Nằm khoang 4 (29 - 42) -> Chia tầng
    ...Array.from({ length: 7 }, (_, i) => ({
      id: i + 29,
      type: "Nằm khoang 4",
      floor: 1,
      price: 600000 + i * 10000,
    })),
    ...Array.from({ length: 7 }, (_, i) => ({
      id: i + 36,
      type: "Nằm khoang 4",
      floor: 2,
      price: 620000 + i * 10000,
    })),
  ];

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeat === seatNumber) {
      setSelectedSeat(null); 
      onAddToCart(null); 
    } else {
      setSelectedSeat(seatNumber);
      const ticket = {
        trainName: trainName, 
        seat: seatNumber, 
        price: seatPrices.find((s) => s.id === seatNumber)?.price || 0,
        car: selectedCar, 
        seatType: selectedSeatType, 
      };
      onAddToCart(ticket);
    }
  };
  return (
    <div className="container mt-2">
      <div className="seat-select-container">
        <div className="row d-flex justify-content-center align-items-center mb-3">
          <div className="col-12">
            {carsWithHeadTrain.map((car) => (
              <div
                key={car.id}
                className="et-car-block ng-scope"
                onClick={() => setSelectedCar(car.id)} // Sử dụng hàm setSelectedCar
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
                  <img
                    src={car.id === 0 ? headtrain : train} // Sử dụng ảnh headtrain cho toa đầu tàu
                    alt={`Car ${car.id}`}
                    className="train-car"
                  />
                </div>
                <span className="text-primary">
                  <span className="text-primary">
                    {car.id === 0 ? car.name : car.id}
                  </span>
                </span>
              </div>
            ))}
            <p className="mt-2 fw-bold text-primary">
              Toa số {selectedCar}:{" "}
              {selectedSeatType ? selectedSeatType : "Chưa có toa"} điều hòa
            </p>
          </div>

          <div
            className="col-6 p-2 text-center"
            style={{
              backgroundColor: "#f5f5f5",
              color: "orange",
              width: "40%",
            }}
          >
            <h5>
              Ghế bạn đã chọn:{" "}
              <span style={{ fontWeight: "bold" }}>
                {selectedSeat ? selectedSeat : "Chưa có ghế nào"}
              </span>
            </h5>
          </div>
          <div
            className="col-6 p-2 text-center"
            style={{
              backgroundColor: "#f5f5f5",
              color: "orange",
              width: "40%",
            }}
          >
            <h5>
              Giá vé mỗi ghế là:{" "}
              <span style={{ fontWeight: "bold" }}>
                {selectedSeat
                  ? `${
                      seatPrices.find((seat) => seat.id === selectedSeat)
                        ?.price || ""
                    } VND`
                  : "Chưa chọn ghế"}
              </span>
            </h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center et-car-floor">
          <div className="et-col-1-18 et-car-floor-full-height">
            <div className="et-bed-way et-full-width"></div>
            <div className="et-bed-way et-full-width text-center small ng-binding">
              Tầng 3
            </div>
            <div className="et-bed-way et-full-width text-center small ng-binding">
              Tầng 2
            </div>
            <div className="et-bed-way et-full-width text-center small ng-binding">
              Tầng 1
            </div>
          </div>

          <div className="et-col-8-9">
            <div className="et-bed-way et-full-width et-text-sm">
              <div className="et-col-1-8 text-center ng-binding">Khoang 1</div>
              <div className="et-col-1-8 text-center ng-binding">Khoang 2</div>
              <div className="et-col-1-8 text-center ng-binding">Khoang 3</div>
              <div className="et-col-1-8 text-center ng-binding">Khoang 4</div>
              <div className="et-col-1-8 text-center ng-binding">Khoang 5</div>
              <div className="et-col-1-8 text-center ng-binding">Khoang 6</div>
              <div className="et-col-1-8 text-center ng-binding">Khoang 7</div>
              <div className="et-col-1-8 text-center ng-binding">Khoang 8</div>
            </div>

            {seats.map((floor, floorIndex) => (
              <div key={floorIndex} className="seat-floor">
                {floor.map((seat, index) => (
                  <div
                    key={index}
                    className="et-col-1-16 et-seat-h-35 ng-isolate-scope"
                  >
                    <div
                      className={`et-bed-${index % 2 === 0 ? "left" : "right"}`}
                    >
                      <div className="et-bed-router">
                        <div className="et-bed-illu">
                          <Button
                            className={`seat ${
                              selectedSeat === seat ? "selected" : ""
                            }`}
                            onClick={() => handleSeatSelect(seat)}
                            style={{
                              backgroundColor:
                                selectedSeat === seat ? "orange" : "#fff",
                              color: selectedSeat === seat ? "black" : "black",
                              border: "1px solid black",
                            }}
                          >
                            {seat}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelect;
