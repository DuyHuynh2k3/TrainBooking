import React from "react";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-center align-items-center">
        <h1 className="fs-4 fw-bold m-0">
        <img 
          src={logo} 
          alt="Logo" 
          className="img-fluid" 
          style={{ height: "40px", 
            width: "100px",
            marginRight: "20px"
          }} 
        />
        </h1>
        <nav className="d-flex">
          <a href="/" className="text-white text-decoration-none mx-3 font-text">
            TÌM VÉ
          </a>
          <a href="/" className="text-white text-decoration-none mx-3 font-text">
            THÔNG TIN ĐẶT CHỔ
          </a>
          <a href="/" className="text-white text-decoration-none mx-3 font-text">
            TRẢ VÉ
          </a>
          <a href="/" className="text-white text-decoration-none mx-3 font-text">
            KHUYẾN MÃI
          </a>
          <a href="/" className="text-white text-decoration-none mx-3 font-text">
            THÔNG TIN
          </a>
          <a href="/" className="text-white text-decoration-none mx-3 font-text">
            TRA CỨU HÓA ĐƠN
          </a>
          <a href="/" className="text-white text-decoration-none mx-3 font-text">
           ENGLISH
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
