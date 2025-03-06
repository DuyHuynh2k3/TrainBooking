import React from "react";
import "../../styles/BookForm.css";
import { FiAlignJustify } from "react-icons/fi";

const BookForm = () => {
  return (
    <div className="container-fluid mt-2">
      <div className="row d-flex justify-content-center">
        {/* Carousel on the left */}
        <div className="col-lg-7 p-0">
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
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Biên Hòa"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-primary">Ga đến</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nha Trang"
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
