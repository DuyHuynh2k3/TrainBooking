import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../../assets/img/promotion-detail/1.jpg";
import img2 from "../../../assets/img/promotion-detail/2.jpg";
import img3 from "../../../assets/img/promotion-detail/3.jpg";
import Breadcrumb from "../../components/Breadcrumb";
const PromotionDetailPage1 = () => {
  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#f7f7f7" }}>
      <Header />
      <Breadcrumb />
      <main className="mt-2">
        <div className="d-flex justify-content-center">
          <div className="container-fluid">
            <div className="row justify-content-center text-start mt-3 mb-2">
              <div className="col-9">
                <h1>
                  Thông Báo: Lịch Chạy Tết 2025 Tàu Trưng Trắc Phan Thiết - Phú
                  Quý
                </h1>
                <span style={{ fontSize: "18px" }}>
                  Saomaifly xin thông báo tới Quý khách hàng lịch chạy Tết 2025
                  tàu Trưng Trắc từ Phan Thiết đi Phú Quý như sau: <br></br> <br></br> - Tháng
                  1/2025 tàu hoạt động tới hết ngày Chủ Nhật 26/2/2025 (tức ngày
                  27 Tết) dừng nghỉ Tết.<br></br>  <br></br> - Từ ngày 31/1/2/2025 (mùng 3 Tết) tàu
                  hoạt động lại bình thường hàng ngày. <br></br> <br></br> Quý khách hàng có thể
                  tham khảo lịch tàu ở trên để chủ động sắp xếp chuyến đi cho
                  phù hợp.
                </span>
                <p>Hotline hỗ trợ: 1900599997</p>
              </div>
              <div className="col-9">
                <img
                  src={img1}
                  alt="Promotion 1"
                  style={{ width: "80%", marginBottom: "10px" }}
                />
                <img
                  src={img2}
                  alt="Promotion 1"
                  style={{ width: "80%", marginBottom: "10px" }}
                />
                <img
                  src={img3}
                  alt="Promotion 1"
                  style={{ width: "80%", marginBottom: "10px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PromotionDetailPage1;
