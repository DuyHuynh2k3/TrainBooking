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
import ContactPage from "./client/pages/ContactPage";
import FindBillPage from "./client/pages/FindBillPage";
import HomeBlogPage from "./client/pages/BlogPage/HomeBlogPage";
import BlogDetailPage from "./client/pages/BlogPage/BlogDetailPage";
import HomePageResult from "./client/pages/HomePageResult";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/resultticket" element={<HomePageResult />} />
      <Route path="/infoseat" element={<InfoSeatPage />} />
      <Route path="/returnticket" element={<ReturnTicketPage />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/timetickettrain" element={<TimeTicketTrainPage />} />
      <Route path="/gotrain" element={<GoTrain />} />
      <Route path="/promotion-detail" element={<PromotionDetailPage />} />
      <Route path="/promotion-detail-1" element={<PromotionDetailPage1 />} />
      <Route path="/bookingticket" element={<BookingTicket />} />
      <Route path="/findbill" element={<FindBillPage />} />
      <Route path="/homeblogpage" element={<HomeBlogPage category="khuyen-mai" />} />
      <Route path="/trong-nganh" element={<HomeBlogPage category="trong-nganh" />} />
      <Route path="/noi-bo" element={<HomeBlogPage category="noi-bo" />} />
      <Route path="/atgt-duong-sat" element={<HomeBlogPage category="atgt-duong-sat" />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;
