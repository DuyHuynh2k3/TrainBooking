import React from "react";
import { FiAlignJustify } from "react-icons/fi";
import "../../styles/InfoSeat.css";

const InfoSeat = () => {
  return (
    <div className="container-fluid mt-2">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header text-primary">
              <h5
                className="m-0 d-flex align-items-center"
                style={{ gap: "5px" }}
              >
                <i className="bi bi-list"></i> <FiAlignJustify />
                TRA CỨU THÔNG TIN ĐẶT CHỖ
              </h5>
            </div>
            <div className="card-body">
              <p className="m-0">
                Để tra cứu thông tin, quý khách vui lòng nhập chính xác 3 thông
                tin bên dưới.
              </p>
              <form>
                <div className="mb-2">
                  <label htmlFor="bookingCode" className="form-label">
                    Mã đặt chỗ
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bookingCode"
                    placeholder="Nhập mã đặt chỗ"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Nhập email"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="phone" className="form-label">
                    Điện thoại
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div className="d-flex justify-content-start align-items-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginRight: "7px" }}
                  >
                    Tra cứu
                  </button>
                  <a href="/" className="text-primary text-decoration-none ">
                    Quên mã đặt chỗ?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSeat;
