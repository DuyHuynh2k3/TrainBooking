import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import "../../styles/InfoSeat.css";

const InfoSeat = () => {
  const [ticketId, setTicketId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticketId && !email && !phoneNumber) {
      setError(
        "Vui lòng nhập ít nhất một thông tin (mã đặt chỗ, email hoặc số điện thoại)."
      );
      return;
    }

    try {
      const response = await fetch(
        `/api/infoSeat?ticket_id=${ticketId}&email=${email}&phoneNumber=${phoneNumber}`
      );

      if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status}`);
      }

      const data = await response.json();
      setTicketInfo(data);
      setError("");
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setError("Lỗi kết nối đến server hoặc dữ liệu không hợp lệ.");
      setTicketInfo(null);
    }
  };

  return (
    <div className="container-fluid mt-2">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-9">
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
                Để tra cứu thông tin, quý khách vui lòng nhập chính xác ít nhất
                một thông tin bên dưới.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="ticketId" className="form-label">
                    Mã đặt chỗ (Mã vé)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ticketId"
                    placeholder="Nhập mã đặt chỗ"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
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
                  <label htmlFor="phoneNumber" className="form-label">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Nhập số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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

              {error && <div className="alert alert-danger mt-3">{error}</div>}

              {ticketInfo && (
                <div className="mt-3">
                  <h5>Thông Tin Vé</h5>
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
                          {ticketInfo.train?.train_name} {ticketInfo.departTime}{" "}
                          - {ticketInfo.arrivalTime}
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
                  <div className="text-end">
                    <strong>Tổng tiền: {ticketInfo.price} VNĐ</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSeat;
