import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation } from "react-router-dom";
import "../../styles/Breadcrum.css";

export default function Breadcrumb() {
  const location = useLocation();

  // Danh sách các mục tin tức
  const newsCategories = [
    { path: "/homeblogpage", name: "Khuyến Mãi" },
    { path: "/trong-nganh", name: "Trong Ngành" },
    { path: "/noi-bo", name: "Nội Bộ" },
    { path: "/atgt-duong-sat", name: "ATGT Đường Sắt" },
  ];

  // Xác định mục tin tức hiện tại
  const currentCategory = newsCategories.find(
    (item) => item.path === location.pathname
  );

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit", fontSize: "18px" }}>
              Trang chủ
            </Link>
            <Link to="/homeblogpage" style={{ textDecoration: "none", color: "inherit", fontSize: "18px" }}>
              Tin Tức
            </Link>
            {currentCategory && (
              <Link
                to={currentCategory.path}
                style={{ textDecoration: "none", color: "blue", fontSize: "18px", fontWeight: "bold" }}
              >
                {currentCategory.name}
              </Link>
            )}
          </Breadcrumbs>
        </div>
      </div>
    </div>
  );
}
