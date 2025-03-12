import React from "react";
import Header from "../components/Header";
import BookingForm from "../components/BookForm";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import TrainSchedule from "../components/TrainSchedule";

const HomePageResult = () => {
  return (
    <div className="d-flex flex-column" style={{backgroundColor:"#f7f7f7"}}>
      <Header />
      <Carousel />
      <main className="">
        <BookingForm />
       <TrainSchedule />
      </main>
      <Footer />
    </div>
  );
};


export default HomePageResult;
