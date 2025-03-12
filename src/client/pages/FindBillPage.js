import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "../../styles/FindBill.css";
import ReCAPTCHA from "react-google-recaptcha";

export default function FindBillPage() {
  const [inputType, setInputType] = useState("code"); // Mặc định chọn Mã vé

  // Hàm xử lý khi người dùng chọn Mã vé hoặc Mã tra cứu
  const handleRadioChange = (event) => {
    setInputType(event.target.value);
  };

  //capcha
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    console.log("CAPTCHA Value:", value);
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Vui lòng xác nhận CAPTCHA!");
      return;
    }
    alert("Xác thực thành công!");
  };
  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#f7f7f7" }}>
      <Header />
      <Carousel />
      <main className="mt-4">
        <div className="container mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <div className="card shadow">
                <div className="card-body p-4">
                  {/* Thông báo */}
                  <div className="alert alert-info" role="alert">
                    <strong>Thông báo:</strong> Từ ngày 01/11/2024 Tổng công ty
                    Đường sắt Việt Nam (VNR) sáp nhập hai công ty thành viên là
                    Công ty cổ phần Vận tải Đường sắt Hà Nội và Công ty cổ phần
                    Vận tải Đường sắt Sài Gòn thành Công ty cổ phần Vận tải
                    Đường sắt (VRT). Để tra cứu hóa đơn từ ngày 01/11/2024 quý
                    khách hàng vui lòng bấm vào đây.
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Chọn loại mã */}
                    <div className="d-flex align-items-center mb-3">
                      <div className="custom-radio form-check form-check-inline m-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inputType"
                          id="code"
                          value="code"
                          checked={inputType === "code"}
                          onChange={handleRadioChange}
                        />
                        <label
                          className="custom-radio-label form-check-label"
                          htmlFor="code"
                        >
                          Mã vé
                        </label>
                      </div>
                      <div className="custom-radio form-check form-check-inline m-0">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inputType"
                          id="track"
                          value="track"
                          checked={inputType === "track"}
                          onChange={handleRadioChange}
                        />
                        <label
                          className="custom-radio-label form-check-label"
                          htmlFor="track"
                        >
                          Mã tra cứu
                        </label>
                      </div>

                      {/* Input nhập mã */}
                      <input
                        type="text"
                        name="ticketCode"
                        className="form-control"
                        placeholder={
                          inputType === "code"
                            ? "Nhập mã vé"
                            : "Nhập mã tra cứu"
                        }
                        required
                        style={{
                          width: "auto",
                          flex: 1,
                          height: "38px",
                          borderRadius: "0px",
                        }}
                      />
                    </div>

                    {/* CAPTCHA */}
                    <div className="d-flex align-items-center mb-3">
                      <label className="form-label">
                        Mã xác thực người dùng
                      </label>
                      <ReCAPTCHA
                        sitekey="6LeMDe8qAAAAABulACiTE-bJ4aDUfRNN5D0bzgNx" // Thay bằng Site Key thật
                        onChange={(value) => handleCaptchaChange(value)}
                      />
                    </div>

                    {/* Nút gửi form */}
                    <button type="submit" className="btn btn-primary w-100">
                      Tra Cứu
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
