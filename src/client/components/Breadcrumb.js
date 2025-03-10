import React from "react";
import "../../styles/Breadcrum.css";

export default function Breadcrumb() {
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "RGB(211, 211, 211)" }}>
      <div className="row d-flex justify-content-center "
      style={{
        height:"50px"
      }}>
        <div className="col-lg-9  mt-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" style={{ textDecoration: "none"}}>
                  Trang chủ
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/homeblogpage" style={{ textDecoration: "none" }}>
                  Khuyến mãi
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
