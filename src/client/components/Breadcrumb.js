import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useLocation, useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../../styles/Breadcrum.css";

export default function Breadcrumb() {
  const location = useLocation();
  const { category } = useParams();

  // Map slug -> tên hiển thị
  const categoryMap = {
    "khuyen-mai": "Khuyến Mãi",
    "trong-nganh": "Trong Ngành",
    "noi-bo": "Nội Bộ",
    "atgt-duong-sat": "ATGT Đường Sắt",
  };

  const displayCategory = categoryMap[category] || null;

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit", fontSize: "18px" }}>
              Trang chủ
            </Link>

            {/* Nếu đang ở trang tin tức tổng hoặc trong từng mục tin tức */}
            {location.pathname.startsWith("/blogs") && (
              <Link to="/blogs" style={{ textDecoration: "none", color: "inherit", fontSize: "18px" }}>
                Tin Tức
              </Link>
            )}

            {/* Nếu có category (chỉ khi vào từng mục con) */}
            {displayCategory && (
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#000" }}>
                {displayCategory}
              </span>
            )}
          </Breadcrumbs>
        </div>
      </div>
    </div>
  );
}
