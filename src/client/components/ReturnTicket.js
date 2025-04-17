import React, { useState } from "react";
import { Steps, message } from "antd";
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
  const [bookingCode, setBookingCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    if (!bookingCode && !email && !phone) {
      message.error(
        "Vui lòng cung cấp ít nhất một thông tin (mã đặt chỗ, email hoặc số điện thoại)"
      );
      return false;
    }

    if (bookingCode && isNaN(parseInt(bookingCode))) {
      message.error("Mã đặt chỗ không hợp lệ");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/infoSeat?ticket_id=${bookingCode}&email=${email}&phoneNumber=${phone}`
      );

      const data = await response.json();

      if (response.ok) {
        setTicketInfo(data);
        message.success("Tra cứu thông tin vé thành công");
        setCurrentStep(currentStep + 1);
      } else {
        message.error(data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      message.error("Lỗi khi tra cứu thông tin vé: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnTicket = async () => {
    if (!bookingCode && !email && !phone) {
      message.error(
        "Vui lòng cung cấp ít nhất một thông tin (mã đặt chỗ, email hoặc số điện thoại)"
      );
      return;
    }

    try {
      const response = await fetch("/api/return-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticket_id: bookingCode,
          email: email,
          phoneNumber: phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(data.message);
        setCurrentStep(currentStep + 1);
      } else {
        message.error(data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      message.error("Lỗi khi gửi yêu cầu trả vé: " + error.message);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="bookingCode" className="form-label">
                Mã đặt vé
              </label>
              <input
                type="text"
                className="form-control"
                id="bookingCode"
                placeholder="Nhập mã đặt vé"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginRight: "7px" }}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Tra cứu"}
              </button>
              <a href="/" className="text-primary text-decoration-none">
                Quên mã đặt vé?
              </a>
            </div>
          </form>
        );
      case 1:
        return (
          <div>
            <div className="mb-2">
              <label htmlFor="bookingCode" className="form-label">
                Mã đặt chỗ
              </label>
              <input
                type="text"
                className="form-control"
                id="bookingCode"
                placeholder="Nhập mã đặt chỗ"
                value={bookingCode}
                readOnly
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
                value={email}
                readOnly
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
                value={phone}
                readOnly
              />
            </div>

            <h5>Thông Tin Vé</h5>
            {ticketInfo && (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Họ tên</th>
                    <th>Số CMND/ Hộ chiếu</th>
                    <th>Đối tượng</th>
                    <th>Loại chỗ</th>
                    <th>Thông tin vé</th>
                    <th>Thành tiền (VNĐ)</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ticketInfo.customer?.fullName}</td>
                    <td>{ticketInfo.customer?.passport}</td>
                    <td>Người lớn</td>
                    <td>Ngôi mềm điều hòa</td>
                    <td>
                      {ticketInfo.train?.train_name} {ticketInfo.departTime} -{" "}
                      {ticketInfo.arrivalTime}
                      <br />
                      Toa: {ticketInfo.seattrain?.coach} Chỗ số:{" "}
                      {ticketInfo.seattrain?.seat_number}
                    </td>
                    <td>{ticketInfo.price}</td>
                    <td>
                      {ticketInfo.payment_status === "Paid"
                        ? "Đã thanh toán"
                        : "Chờ thanh toán"}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            <div className="text-end">
              <strong>Tổng tiền: {ticketInfo?.price} VNĐ</strong>
            </div>
            <div className="mt-3">
              <button
                onClick={handleReturnTicket}
                className="btn btn-danger"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Trả vé"}
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h5>Trả vé thành công</h5>
            <p>Vé của bạn đã được trả thành công.</p>
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="btn btn-primary"
            >
              Tiếp tục
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h5>Hoàn tất</h5>
            <p>Quy trình trả vé đã hoàn tất. Cảm ơn bạn đã sử dụng dịch vụ!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <Steps current={currentStep} items={steps} />

      <div className="row d-flex justify-content-center mt-4">
        <div className="col-lg-12">
          <div className="card shadow">
            <div className="card-header text-primary">
              <h5
                className="m-0 d-flex align-items-center"
                style={{ gap: "5px" }}
              >
                <i className="bi bi-list"></i> <FiAlignJustify />
                TRẢ VÉ TRỰC TUYẾN
              </h5>
              <div
                className="alert alert-info mt-3"
                style={{ fontSize: "18px", textAlign: "justify" }}
              >
                <strong>Chú ý:</strong> Trả vé trực tuyến chỉ áp dụng với trường
                hợp khách hàng đã thanh toán trực tuyến (qua cổng thanh toán, ví
                điện tử, app ngân hàng) và có điền email khi mua vé. Nếu quý
                khách thanh toán bằng tiền mặt, ATM, chuyển khoản hoặc trả vé
                khi có sự cố bãi bỏ tàu, vui lòng thực hiện thủ tục tại các nhà
                ga, đại lý bán vé.
              </div>
            </div>
            <div className="card-body">{renderStepContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnTicket;
