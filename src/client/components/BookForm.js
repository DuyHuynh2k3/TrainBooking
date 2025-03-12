import React from "react";
import "../../styles/BookForm.css";
import { FiAlignJustify } from "react-icons/fi";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

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

const BookForm = () => {
  return (
    <div className="container-fluid mt-2">
      <div className="row d-flex justify-content-center">
        {/* Carousel on the left */}
        <div className="col-lg-6 p-0">
          <div className="card shadow" style={{ height: "100%" }}>
            <div className="card-header text-primary">
              <h5
                className="card-title text- text-main m-0"
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
                      freeSolo
                      options={stations.map((station) => station.title)}
                      renderInput={(params) => (
                        <TextField
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
                      freeSolo
                      options={stations.map((station) => station.title)}
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
                        />
                        <label className="form-check-label " htmlFor="oneWay">
                          Một chiều
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="ticketType"
                          id="roundTrip"
                          defaultChecked
                        />
                        <label
                          className="form-check-label "
                          htmlFor="roundTrip"
                        >
                          Khứ hồi
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label text-primary">Ngày đi</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-primary">Ngày về</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-md-4 d-flex align-items-end">
                    <button type="submit" className="btn btn-primary w-100">
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3 d-flex flex-column">
          {/* Giỏ vé */}
          <div className="card mb-3 shadow">
            <div className="card-header  text-white">
              <h5
                className="card-title text-primary text-main m-0"
                style={{ fontWeight: "bold" }}
              >
                <i className="bi bi-list"></i> <FiAlignJustify />
                Giỏ Vé
              </h5>
            </div>
            <div className="card-body text-center">
              <h6
                className="card-title"
                style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}
              >
                Chưa có vé
              </h6>
              <button className="btn btn-primary w-100">Mua vé</button>
            </div>
          </div>
          {/* Đăng ký hội viên */}
          <div className="card shadow">
            <div className="card-body text-center">
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
