import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Newlist.css";

const NewsList = () => {
  return (
    <div className="row justify-content-center  mt-2 ">
      <div className="col-6 p-0">
        <h3>Các tin khác</h3>
        <ul>
          {[
            {
              title: "ĐẶT VÉ TÀU SAOMAFILY CÓ UY TÍN KHÔNG? REVIEW CHI TIẾT  (13/06/2024) ",
              path: "/review-saomaifly",
            },
            {
              title:
                "CHÀO HÈ 1/6 TÀU CAO TỐC TRƯNG TRẮC KHUYẾN MÃI 30K - ĐI PHÚ QUÝ KHỎI LO VỀ GIÁ (23/05/2024)",
              path: "/khuyen-mai-phu-quy",
            },
            {
              title:
                "KHAI TRƯƠNG TUYẾN TÀU CAO TỐC MỚI TP.HCM - CÔN ĐẢO, CHỈ HƠN 5 GIỜ DI CHUYỂN (13/05/2024)",
              path: "/tau-cao-toc-con-dao",
            },
            {
              title:
                "SIÊU TÀU THĂNG LONG SÀI GÒN CÔN ĐẢO CHÍNH THỨC HOẠT ĐỘNG NGÀY (15/5/2024)",
              path: "/thang-long-sai-gon",
            },
            {
              title:
                "TÀU THĂNG LONG SÀI GÒN - CÔN ĐẢO HOẠT ĐỘNG TỪ 5/2025: LỊCH TRÌNH & GIÁ VÉ (19/04/2024)",
              path: "/lich-trinh-gia-ve-2025",
            },
            {
              title: "TÀU TRƯNG TRẮC CHÍNH THỨC HOẠT ĐỘNG TỪ (17/4/2024)",
              path: "/tau-trung-trac-17-4",
            },
            {
              title:
                "HomePaylater x OnePay x Saomaifly – Thanh toán thông minh, muôn vàn ưu đãi (15/04/2024)",
              path: "/homepaylater-uu-dai",
            },
            {
              title: "LỊCH TÀU TRƯNG TRẮC PHÚ QUÝ THÁNG (5/2024)",
              path: "/lich-tau-5-2024",
            },
            {
              title: "CHI TIẾT TÀU TRƯNG TRẮC PHAN THIẾT PHÚ QUÝ (29/03/2024)",
              path: "/chi-tiet-tau-phan-thiet",
            },
            {
              title:
                "TÀU TRƯNG TRẮC HOẠT ĐỘNG TRỞ LẠI TUYẾN PHAN THIẾT PHÚ QUÝ TỪ NGÀY 17/4/2024",
              path: "/tau-trung-trac-hoat-dong-17-4",
            },
          ].map((news, index) => (
            <li key={index}>
              <Link to={news.path}>{news.title}</Link> <span>{news.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsList;
