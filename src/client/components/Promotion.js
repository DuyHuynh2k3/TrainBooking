import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Promotion.css";
import promotion1 from "../../assets/img/promotion1.jpg";
import promotion2 from "../../assets/img/promotion-detail/1.jpg";
import promotion3 from "../../assets/img/promotion-detail/4.jpg";
import promotion4 from "../../assets/img/promotion-detail/10.jpg";
import promotion5 from "../../assets/img/promotion-detail/11.jpg";
import promotion6 from "../../assets/img/promotion-detail/12jpg.jpg";
import promotion7 from "../../assets/img/promotion-detail/13.jpg";
import bn3 from "../../assets/img/banner3.jpg";
const Promotion = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="container-fluid">
        <div className="row justify-content-center text-center">
          <div className="col-6 border-bottom mb-2 p-0 ">
            <Link to="/promotion-detail">
              <img
                src={promotion1}
                alt="Slide 1"
                style={{ height: "400px", width: "100%" }}
              />
            </Link>
            <Link to="/promotion-detail" className="link-promotion">
              Thông Báo: Lịch Tàu Cao Tốc Lightning 68 Xuân Ất Tỵ 2025
            </Link>
            <span className="mb-2">
              Saomaifly xin thông báo tới Quý khách hàng lịch tàu cao tốc
              Lightning 68 dịp Tết Xuân Ất Tỵ 2025 như sau:
            </span>
          </div>
          <div className="col-3 text-start  border-bottom mb-2">
            <img
              src={bn3}
              alt="Slide 1"
              style={{ height: "400px", width: "100%" }}
            />
          </div>
        </div>
        <div className="row justify-content-center text-center">
          <div className="col-3 p-0">
            <Link to="/promotion-detail-1">
              <img
                src={promotion2}
                alt="Slide 1"
                style={{ height: "200px", width: "100%" }}
              />
            </Link>
            <Link
              to="/promotion-detail-1"
              className="link-promotion"
              style={{ fontSize: "15px" }}
            >
              Thông Báo: Lịch Chạy Tết 2025 Tàu Trưng Trắc Phan Thiết - Phú Quý
            </Link>
            <span
              style={{
                fontSize: "13px",
              }}
            >
              Saomaifly xin thông báo tới Quý khách hàng lịch chạy Tết 2025 tàu
              Trưng Trắc từ Phan Thiết đi Phú Quý như sau:
            </span>
          </div>
          <div className="col-3 ">
            <Link to="/promotion-detail-2">
              <img
                src={promotion3}
                alt="Slide 1"
                style={{ height: "200px", width: "100%" }}
              />
            </Link>
            <Link
              to="/promotion-detail-2"
              className="link-promotion"
              style={{ fontSize: "15px" }}
            >
              Giảm 20% Khi Đặt Vé Tàu Thanh Toán Qua ZaloPay Tại SaomaiFly
            </Link>
            <span
              style={{
                fontSize: "13px",
              }}
            >
              Thoả thích vi vu du lịch biển đảo cuối năm, đặc biệt là dịp Tết Âm
              Lịch tại Phú Quốc, Phú Quý, Côn Đảo... khi đặt vé tàu tại
              Saomaifly và thanh toán qua ZaloPay giảm ngay 20% giá vé. Để chi
              tiết chương trình ưu đãi, hãy cùng tham khảo bài viết sau.
            </span>
          </div>
          <div className="col-3 p-0">
            <Link to="/promotion-detail-3">
              <img
                src={promotion4}
                alt="Slide 1"
                style={{ height: "200px", width: "100%" }}
              />
            </Link>
            <Link
              to="/promotion-detail-3"
              className="link-promotion"
              style={{ fontSize: "15px" }}
            >
              Tàu 5 Sao Tuần Châu Express Kết Nối Hạ Long - Cát Bà Chỉ Trong 1
              Giờ
            </Link>
            <span
              style={{
                fontSize: "13px",
              }}
            >
              Tuyến tàu 5 sao Tuần Châu Express của Havaco dự kiến hoạt động vào
              ngày 15/11 kết nối giữa quần thể vịnh Hạ long - đảo Cát Bà chỉ
              trong 1 giờ đồng hồ, mang tới những trải nghiệm thú vị cho du
              khách khi khám phá Di sản thiên nhiên thế giới.
            </span>
          </div>
        </div>
        <div className="row justify-content-center text-center mt-2 ">
          <div className="col-3 border-bottom p-0">
            <Link to="/promotion-detail-3">
              <img
                src={promotion5}
                alt="Slide 1"
                style={{ height: "200px", width: "100%" }}
              />
            </Link>
            <Link
              to="/promotion-detail-3"
              className="link-promotion"
              style={{ fontSize: "15px" }}
            >
              LỊCH TÀU TRẦN ĐỀ, VŨNG TÀU ĐI CÔN ĐẢO THÁNG 9/2024
            </Link>
            <span className="mb-3"
              style={{
                fontSize: "13px",
              }}
            >
              Saomaifly xin thông báo tới hành khách lịch tàu chạy Trần Đề,Vũng
              Tàu, Côn Đảo tháng 9/2024 Lịch tàu có thể thay đổi vì lí do thời
              tiết, và những sự cố bất khả kháng. Nếu có thay đổi SAOMAIFLY sẽ
              liên hệ quý khách qua zalo, số điện thoai, gmail.
            </span>
          </div>
          <div className="col-3 border-bottom ">
            <Link to="/promotion-detail-3">
              <img
                src={promotion6}
                alt="Slide 1"
                style={{ height: "200px", width: "100%" }}
              />
            </Link>
            <Link
              to="/promotion-detail-3"
              className="link-promotion"
              style={{ fontSize: "15px" }}
            >
              THÊM 2 TÀU CAO TỐC MỚI HOẠT ĐỘNG TUYẾN RẠCH GIÁ - PHÚ QUỐC
            </Link>
            <span className="mb-3"
              style={{
                fontSize: "13px",
              }}
            >
              Chính thức từ Công ty cổ phần thương mại và dịch vụ vận tải Biển
              Sơn đưa vào hoạt động 2 tàu cao tốc hoạt động tuyến Rạch Giá - Phú
              Quốc và chiều ngược lại là Lightning 68-06 và Lightning 68-08 nhằm
              phục vụ nhu cầu đi lại của hành khách từ ngày 16/10/2024
            </span>
          </div>
          <div className="col-3 border-bottom p-0">
            <Link to="/promotion-detail-3">
              <img
                src={promotion7}
                alt="Slide 1"
                style={{ height: "200px", width: "100%" }}
              />
            </Link>
            <Link
              to="/promotion-detail-3"
              className="link-promotion"
              style={{ fontSize: "15px" }}
            >
              BẢNG GIÁ HÃNG TÀU PHAN THIẾT PHÚ QUÝ THÁNG 8/2024
            </Link>
            <span className="mb-3"
              style={{
                fontSize: "13px",
              }}
            >
              Saomaifly xin gửi Quý khách hàng bảng giá tàu Phan Thiết Phú Quý
              8/2024 của tàu Trưng Trắc, Phú Quý Express và Superdong, giúp hành
              khách chủ động lựa chọn vé cho chuyến đi sắp tới!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
