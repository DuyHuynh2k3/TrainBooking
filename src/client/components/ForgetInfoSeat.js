import React, { useState } from "react";

const ForgetInfoSeat = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    console.log("Gửi email:", email);

    try {
      const response = await fetch("/api/send-booking-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("Response từ API:", response.status, data);

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Danh sách mã đặt chỗ đã được gửi đến email của bạn! Vui lòng kiểm tra hộp thư đến hoặc thư rác.",
        });
      } else {
        throw new Error(data.error || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Lỗi từ frontend:", error.message);
      setMessage({
        type: "error",
        text: error.message || "Gửi email thất bại, vui lòng thử lại",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card text-center p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="mb-4">LẤY LẠI MÃ ĐẶT CHỖ</h2>
        <p className="mb-4">
          Nhập email để nhận lại danh sách mã đặt chỗ của bạn. Kiểm tra email
          (bao gồm thư rác) để xem thông tin vé.
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

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? "Đang gửi..." : "Nhận lại mã"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-3 alert alert-${
              message.type === "success" ? "success" : "danger"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetInfoSeat;
