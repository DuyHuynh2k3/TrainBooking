import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./client/pages/Homepage";
import InfoSeatPage from "./client/pages/InfoSeatPage";
import ReturnTicketPage from "./client/pages/ReturnTicketPage";
import RulesPage from './client/pages/RulesPage';
import ContactPage from './client/pages/ContactPage';
import TimeTicketTrainPage from './client/pages/TimeTicketTrainPage';
import GoTrain from './client/pages/GoTrainPage';
import FindBillPage from './client/pages/FindBillPage';
// import PromotionPage from "./client/pages/PromotionPage/PromotionPage";
// import PromotionDetail from "./client/pages/PromotionPage/[...id]/PromotionDetail";
import HomeBlogPage from "./client/pages/BlogPage/HomeBlogPage";
import BlogDetailPage from "./client/pages/BlogPage/BlogDetailPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/infoseat" element={<InfoSeatPage />} />
      <Route path="/returnticket" element={<ReturnTicketPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/timetickettrain" element={<TimeTicketTrainPage />} />
      <Route path="/gotrain" element={<GoTrain />} />
      <Route path="/findbill" element={<FindBillPage />} />
      <Route path="/homeblogpage" element={<HomeBlogPage />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;
