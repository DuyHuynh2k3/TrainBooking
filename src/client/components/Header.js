import React from "react";
import logo from "../../assets/logo.png";
import "../../styles/Header.css";

const Header = () => {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ height: "50px", marginRight: "20px" }}
          />
        </div>
        <nav className="d-flex">
          <a href="/" className="text-white text-decoration-none mx-3">
            TÌM VÉ
          </a>
          <a href="/infoseat" className="text-white text-decoration-none mx-3">
            THÔNG TIN ĐẶT CHỔ
          </a>
          <a
            href="/returnticket"
            className="text-white text-decoration-none mx-3"
          >
            TRẢ VÉ
          </a>
          <a href="/promotion" className="text-white text-decoration-none mx-3">
            KHUYẾN MÃI
          </a>
          <div className="dropdown">
            <a
              href="/"
              className="text-white text-decoration-none mx-3 dropdown-toggle"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              THÔNG TIN
            </a>
            <ul
              className="dropdown-menu bg-primary border-0"
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                <a className="dropdown-item text-white" href="/rules">
                  CÁC QUY ĐỊNH
                </a>
              </li>
              <li>
                <a className="dropdown-item text-white" href="/timetickettrain">
                  GIỜ TÀU - GIÁ VÉ
                </a>
              </li>
              <li>
                <a className="dropdown-item text-white" href="/">
                  HƯỚNG DẪN
                </a>
              </li>
              <li>
                <a className="dropdown-item text-white" href="/">
                  LIÊN HỆ
                </a>
              </li>
            </ul>
          </div>
          <a href="/" className="text-white text-decoration-none mx-3">
            TRA CỨU HÓA ĐƠN
          </a>
          <a href="/" className="text-white text-decoration-none mx-3">
            ENGLISH
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
