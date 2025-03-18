import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/BookingTicket.css";
import InformationFormStep1 from "../components/InformationFormStep1";
import InformationFormStep2 from "../components/InformationFormStep2";

const BookingTicket = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    passengerInfo: {},
    bookingInfo: {},
    paymentInfo: {},
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#f7f7f7" }}>
      <Header />
      <Carousel />
      <main className="container my-4">
        {activeStep === 0 && (
          <InformationFormStep1
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {activeStep === 1 && (
          <InformationFormStep2
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BookingTicket;
