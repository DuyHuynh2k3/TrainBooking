import React from "react";
import { Route, Routes } from "react-router-dom"; // Thay Switch bằng Routes
import HomePage from "./pages/HomePage";
import HistoryTicketPage from "./pages/HistoryTicketPage";
import TrainPage from "./pages/TrainPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/statistic" element={<TrainPage />} />
      <Route path="/passenger" element={<HistoryTicketPage />} />
      <Route path="/diagrams" element={<h1>Diagrams Page</h1>} />
    </Routes>
  );
};

export default AppRoutes;
