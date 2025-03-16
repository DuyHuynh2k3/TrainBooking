import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import "../../styles/SeatSelect.css";
import headtrain from "../../assets/img/train1.png";
import train from "../../assets/img/train2.png";

const SeatSelect = ({ selectedSeat, setSelectedSeat, seatPrice }) => {
  const seats = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36],
    [37, 38, 39, 40, 41, 42],
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
      setSelectedSeat(null); // Deselect the seat
    } else {
      setSelectedSeat(seatNumber); // Select the new seat
    }
  };

  useEffect(() => {
    console.log("Updated Selected Seat:", selectedSeat);
  }, [selectedSeat]);

  return (
    <div className="container mt-2">
      <div className="seat-select-container">
        <div className="row d-flex justify-content-center align-items-center mb-3">
          <div className="col-12">

              <div className="et-car-block ng-scope">
                <div className="et-car-icon et-car-icon-avaiable">
                <img src={train} alt="Car 5" className="train-car bg-train" />
                </div>
                <span className=" text-primary">5</span>
              </div>

              <div className="et-car-block ng-scope">
                <div className="et-car-icon et-car-icon-avaiable">
                <img src={train} alt="Car 5" className="train-car" />
                </div> 
                <span className="text-primary">4</span>
              </div>

              <div className="et-car-block ng-scope">
                <div className="et-car-icon et-car-icon-avaiable">
                <img src={train} alt="Car 5" className="train-car" />
                </div>
                <span className=" text-primary">3</span>
              </div>

              <div className="et-car-block ng-scope">
                <div className="et-car-icon">
                <img src={headtrain} alt="Car 5" className="train-car" />
                </div>
                <span className=" text-primary"style={{textAlign:"center"}}>SE11</span>
              </div>
              <p className="mt-2 fw-bold text-primary">
                Toa số 3: Giường nằm khoang 6 điều hòa
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
        <div className="col-12 text-center">
          <div className="seat-grid">
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                {row.map((seat) => (
                  <Button
                    key={seat}
                    className={`seat ${
                      selectedSeat === seat ? "selected" : ""
                    }`}
                    onClick={() => handleSeatSelect(seat)}
                    style={{
                      backgroundColor:
                        selectedSeat === seat ? "orange" : "#f5f5f5",
                      color: selectedSeat === seat ? "#fff" : "orange",
                      margin: "5px",
                    }}
                  >
                    {" "}
                    {seat}
                  </Button>
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
