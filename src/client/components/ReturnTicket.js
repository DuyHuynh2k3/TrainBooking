import React, { useState } from "react";
import { Steps } from "antd";
import "../../styles/ReturnTicket.css";
import { FiAlignJustify } from "react-icons/fi";

const steps = [
  { title: "Chọn vé trả" },
  { title: "Xác nhận" },
  { title: "Trả vé" },
  { title: "Hoàn tất" },
];

const ReturnTicket = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="container mt-4">
      {/* Thanh tiến trình */}
      <Steps current={currentStep} items={steps} />
      
      <div className="row d-flex justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="card shadow">
            <div className="card-header text-primary">
              <h5 className="m-0 d-flex align-items-center" style={{ gap: "5px" }}>
                <i className="bi bi-list"></i> <FiAlignJustify />
                TRẢ VÉ TRỰC TUYẾN
              </h5>
              <div
                className="alert alert-info mt-3"
                style={{ fontSize: "18px", textAlign: "justify" }}
              >
                <strong>Chú ý:</strong> Trả vé trực tuyến chỉ áp dụng với trường hợp khách hàng đã
                thanh toán trực tuyến (qua cổng thanh toán, ví điện tử, app ngân hàng) và có điền email
                khi mua vé. Nếu quý khách thanh toán bằng tiền mặt, ATM, chuyển khoản hoặc trả vé khi có
                sự cố bãi bỏ tàu, vui lòng thực hiện thủ tục tại các nhà ga, đại lý bán vé.
              </div>
            </div>
            <div className="card-body">
              <p className="m-0">
                Để hiển thị các vé cần trả, vui lòng điền chính xác 3 thông tin dưới đây:
              </p>
              <form>
                <div className="mb-2">
                  <label htmlFor="bookingCode" className="form-label">Mã đặt chỗ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bookingCode"
                    placeholder="Nhập mã đặt chỗ"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Nhập email"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="phone" className="form-label">Điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div className="d-flex justify-content-start align-items-center">
                  <button type="submit" className="btn btn-primary" style={{ marginRight: "7px" }}>
                    Tra cứu
                  </button>
                  <a href="/" className="text-primary text-decoration-none">
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

export default ReturnTicket;
