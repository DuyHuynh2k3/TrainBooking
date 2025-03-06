import React from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PromotionPage from "../pages/PromotionPage/PromotionPage";
import PromotionDetailPage from "../pages/PromotionPage/PromotionDetailPage";
import PromotionDetailPage1 from "../pages/PromotionPage/PromotionDetailPage1";



export default function Paginition() {
  const location = useLocation();
  const navigate = useNavigate();

  // Xác định trang hiện tại dựa trên URL
  const currentPage =
    location.pathname === "/promotion"
      ? 1
      : location.pathname === "/promotion-detail"
      ? 2
      : location.pathname === "/promotion-detail-1"
      ? 3
      : 4;

  // Hàm chuyển trang
  const handleChange = (event, value) => {
    switch (value) {
      case 1:
        navigate("/promotion");
        break;
      case 2:
        navigate("/promotion-detail");
        break;
      case 3:
        navigate("/promotion-detail-1");
        break;
      default:
        navigate("/promotion");
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-lg-9 mt-2 d-flex justify-content-center">
          <Stack spacing={2}>
            {/* Pagination component */}
            <Pagination
              count={4}
              page={currentPage}
              onChange={handleChange}
              color="primary"
            />
          </Stack>
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-5">
        <div className="col-lg-9 mt-2 d-flex justify-content-center">
          {/* Hiển thị nội dung theo route */}
          <Routes>
            <Route path="/promotion" element={<PromotionPage />} />
            <Route path="/promotion-detail" element={<PromotionDetailPage />} />
            <Route path="/promotion-detail-1" element={<PromotionDetailPage1 />} />
            {/* Redirect mặc định về page1 nếu không có route */}
            <Route path="/promotion" element={<PromotionPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
