import React, { useEffect, useState } from "react";
import "../../styles/BookForm.css";
import { FiAlignJustify } from "react-icons/fi";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TripInfo from "./TripInfo";
import { RiDeleteBin5Line } from "react-icons/ri";
import useStore from "../../store/trains";
// Danh sách các ga tàu
const stations = [
  { title: "Lào Cai" },
  { title: "Phố Lu" },
  { title: "Bảo Hà" },
  { title: "Yên Bái" },
  { title: "Phú Thọ" },
  { title: "Việt Trì" },
  { title: "Đông Anh" },
  { title: "Hà Nội" },
  { title: "Phủ Lý" },
  { title: "Nam Định" },
  { title: "Ninh Bình" },
  { title: "Bỉm Sơn" },
  { title: "Thanh Hóa" },
  { title: "Minh Khôi" },
  { title: "Chợ Sy" },
  { title: "Vinh" },
  { title: "Hồng Lĩnh" },
  { title: "Đồng Hới" },
  { title: "Đông Hà" },
  { title: "Huế" },
  { title: "Đà Nẵng" },
  { title: "Tam Kỳ" },
  { title: "Quảng Ngãi" },
  { title: "Diêu Trì" },
  { title: "Tuy Hòa" },
  { title: "Nha Trang" },
  { title: "Tháp Chàm" },
  { title: "Suối Kiết" },
  { title: "Sông Mao" },
  { title: "Ma Lâm" },
  { title: "Long Khánh" },
  { title: "Dĩ An" },
  { title: "Biên Hòa" },
  { title: "Sài Gòn" },
];

const BookForm = ({ cart, onAddToCart, formatDate }) => {
  const {isRound } = useStore(); 
  const [departureStation, setDepartureStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const navigate = useNavigate();
  const [ticketType, setTicketType] = useState(localStorage.getItem("ticketType") || ""); // Mặc định là "Khứ hồi"
  const { station, setstation } = useStore(); 
  
  const handleTicketTypeChange = (e) => {
    const selectedTicketType = e.target.value;
    setTicketType(selectedTicketType);
    localStorage.setItem("ticketType", selectedTicketType);
    // Nếu chọn "Một chiều", reset ngày về
    if (selectedTicketType === "oneWay") {
      setArrivalDate(""); // Reset ngày về
    }
  };

  const handleSearchClick = (event) => {

    event.preventDefault();
    const dataTrain = {
      departureStation,
      arrivalStation,
      departureDate,
      returnDate: ticketType === "roundTrip" ? arrivalDate : "",
      ticketType,
    }
    console.log(dataTrain);
    setstation(dataTrain)
    if (!departureStation || !arrivalStation || !departureDate) {
      alert("Vui lòng chọn đầy đủ Ga đi, Ga đến và Ngày đi!");
      return;
    }

    navigate("/resultticket");
  };
  
  return (
    <div className="container-fluid mt-2 ">
      <div className="row d-flex justify-content-center">
        {/* Carousel on the left */}
        <div className="col-lg-6 p-0">
          <div className="card shadow" style={{ height: "100%" }}>
            <div className="card-header text-primary">
              <h5
                className="card-title text-main m-0"
                style={{ fontWeight: "bold" }}
              >
                <i className="bi bi-list"></i> <FiAlignJustify />
                Thông tin hành trình
              </h5>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label text-primary">Ga đi</label>
                    <Autocomplete
                      value={station.departureStation|| ""}
                      freeSolo
                      options={stations.map((station) => station.title)}
                      onInputChange={(e, newValue) =>
                        setDepartureStation(newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          value={departureStation}
                          {...params}
                          placeholder="Chọn ga đi"
                          fullWidth
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-primary">Ga đến</label>
                    <Autocomplete
                    value={station.arrivalStation|| ""}
                      freeSolo
                      options={stations.map((station) => station.title)}
                      onInputChange={(e, newValue) =>
                        setArrivalStation(newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Chọn ga đến"
                          fullWidth
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-primary">Loại vé</label>
                    <div className="d-flex">
                      <div className="form-check me-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="ticketType"
                          id="oneWay"
                          value="oneWay"
                          checked={ticketType === "oneWay"}
                          onChange={handleTicketTypeChange} // Gọi hàm handle khi chọn loại vé
                        />
                        <label className="form-check-label" htmlFor="oneWay">
                          Một chiều
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="ticketType"
                          id="roundTrip"
                          value="roundTrip"
                          checked={ticketType === "roundTrip"}
                          onChange={handleTicketTypeChange} // Gọi hàm handle khi chọn loại vé
                        />
                        <label className="form-check-label" htmlFor="roundTrip">
                          Khứ hồi
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label text-primary">Ngày đi</label>
                    <input
                      type="date"
                      className="form-control"
                      value={ departureDate || station.departureDate }
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-primary">Ngày về</label>
                    {/* Chỉ hiển thị "Ngày về" nếu chọn Khứ hồi */}
                    <input
                      type="date"
                      className="form-control"
                      value={ arrivalDate || station.returnDate }
                      onChange={(e) => setArrivalDate(e.target.value)}
                      disabled={ticketType === "oneWay"} // Vô hiệu hóa thay vì ẩn đi
                      style={{
                        backgroundColor:
                          ticketType === "oneWay" ? "#e9ecef" : "white",
                        cursor:
                          ticketType === "oneWay" ? "not-allowed" : "auto",
                      }}
                    />
                  </div>
                  <div className="col-md-4 d-flex align-items-end">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      onClick={handleSearchClick}>
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3 d-flex flex-column">
          <div className="card mb-3 shadow">
            <div className="card-header text-white">
              <h5
                className="card-title text-primary text-main m-0"
                style={{ fontWeight: "bold" }}
              >
                <i className="bi bi-list"></i> <FiAlignJustify /> Giỏ Vé
              </h5>
            </div>
            <div className="card-body text-center p-2">
              {!cart || cart.length === 0 ? (
                <h6
                  className="card-title"
                  style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}
                >
                  Chưa có vé
                </h6>
              ) : (
                <div className="">
                  {cart?.map((ticket, index) => (
                    <div key={index} className="mb-1">
                      <TripInfo  stationtype={isRound}  />
                      <div className="ticket-info d-flex justify-content-between align-items-start">
                        <div className="d-flex flex-column flex-grow-1 mt-2">
                          <strong>Tàu:</strong>
                          <strong>Toa:</strong>
                          <strong>Ghế:</strong>
                          <strong>Giá:</strong>
                        </div>
                        <div className="d-flex flex-column flex-grow-1 align-items-start mt-2">
                          <span>{ticket.trainName}</span>
                          <span>{ticket.car}</span>
                          <span>{ticket.seat}</span>
                          <span>{ticket.price.toLocaleString()} VND</span>
                        </div>
                        <button
                          className="btn-delete d-flex justify-content-end align-items-end"
                          style={{ height: "96px" }}
                          onClick={() => onAddToCart(null, index)}
                        >
                          <RiDeleteBin5Line size={18} />
                        </button>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              )}
              <Link
                to={{
                  pathname: "/bookingTicket",
                  state: { cartTickets: cart }, // Truyền giỏ vé qua state
                }}
              >
                <button className="btn btn-primary w-100">Mua vé</button>
              </Link>
            </div>
          </div>
          {/* Đăng ký hội viên */}
          <div className="card shadow">
            <div className="card-body text-center p-2">
              <h6
                className="card-title"
                style={{
                  fontWeight: "bold",
                  color: "#007bff",
                  fontSize: "23px",
                }}
              >
                ĐĂNG KÝ HỘI VIÊN
              </h6>
              <p className="card-text" style={{ fontSize: "17px" }}>
                Công ty cổ phần vận tải đường sắt Việt Nam
              </p>
              <button className="btn btn-primary w-100">Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
