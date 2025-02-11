import React from "react";
import Header from "../components/Header";
import BookingForm from "../components/BookForm";
import Policies from "../components/Policies";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div className="d-flex flex-column">
      <Header />
      <Carousel />
      <main className="">
        <BookingForm />
        <Policies />
      </main>
      <Footer />
    </div>
  );
};


export default HomePage;
