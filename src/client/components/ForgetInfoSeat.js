import React, { useState } from "react";

const ForgetInfoSeat = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic để gửi email hoặc yêu cầu mã đặt chỗ
    console.log("Email submitted:", email);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card text-center p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="mb-4">LẤY LẠI MÃ ĐẶT CHỖ</h2>
        <p className="mb-4">
          Nhận tin theo cú pháp VTBC gửi tới 8200 hoặc nhập email để lấy lại Mã
          đặt chỗ.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Nhận lại mã
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetInfoSeat;
