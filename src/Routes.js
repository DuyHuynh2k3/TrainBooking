import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./client/pages/Homepage";
import InfoSeatPage from "./client/pages/InfoSeatPage";
import ReturnTicketPage from "./client/pages/ReturnTicketPage";
import RulesPage from "./client/pages/RulesPage";
import TimeTicketTrainPage from "./client/pages/TimeTicketTrainPage";
import GoTrain from "./client/pages/GoTrainPage";
import PromotionPage from "./client/pages/PromotionPage/PromotionPage";
import PromotionDetailPage from "./client/pages/PromotionPage/PromotionDetailPage";
import PromotionDetailPage1 from "./client/pages/PromotionPage/PromotionDetailPage1";
import BookingTicket from "./client/pages/BookingTicket";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/infoseat" element={<InfoSeatPage />} />
      <Route path="/returnticket" element={<ReturnTicketPage />} />
      <Route path="/promotion" element={<PromotionPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/timetickettrain" element={<TimeTicketTrainPage />} />
      <Route path="/gotrain" element={<GoTrain />} />
      <Route path="/promotion-detail" element={<PromotionDetailPage />} />
      <Route path="/promotion-detail-1" element={<PromotionDetailPage1 />} />
      <Route path="/bookingticket" element={<BookingTicket />} />
    </Routes>
  );
};

export default AppRoutes;
