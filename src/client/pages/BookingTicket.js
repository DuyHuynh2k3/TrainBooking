import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/BookingTicket.css"; // Import file CSS tùy chỉnh
import InformationForm from "../components/InformationForm";

const BookingTicket = () => {
  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#f7f7f7" }}>
      <Header />
      <Carousel />
      <main className="container my-4">
        {/* Phần thông tin giỏ vé */}
        <InformationForm />
      </main>
      <Footer />
    </div>
  );
};

export default BookingTicket;
