import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../../assets/img/promotion-detail/t1_1.jpg";
import img2 from "../../../assets/img/promotion-detail/t1-2_1.jpg";
import img3 from "../../../assets/img/promotion-detail/t2.jpg";
import img4 from "../../../assets/img/promotion-detail/t13.jpg";
import Breadcrumb from "../../components/Breadcrumb";
const PromotionDetailPage = () => {
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
                  Thông Báo: Lịch Tàu Cao Tốc Lightning 68 Xuân Ất Tỵ 2025
                </h1>
                <span style={{ fontSize: "18px" }}>
                  Saomaifly xin thông báo tới Quý khách hàng lịch tàu cao tốc
                  Lightning 68 dịp Tết Xuân Ất Tỵ 2025 như sau:
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
                <img
                  src={img4}
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

export default PromotionDetailPage;
