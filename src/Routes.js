import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./client/pages/Homepage";
import BookingPage from "./client/pages/BookingPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
    </Routes>
  );
};

export default AppRoutes;
