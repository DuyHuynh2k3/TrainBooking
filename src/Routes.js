import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./client/pages/Homepage";
import InfoSeatPage from "./client/pages/InfoSeatPage";
import ReturnTicketPage from "./client/pages/ReturnTicketPage";
import RulesPage from "./client/pages/RulesPage";
import TimeTicketTrainPage from "./client/pages/TimeTicketTrainPage";
import GoTrain from "./client/pages/GoTrainPage";
import BookingTicket from "./client/pages/BookingTicket";
import HomeBlogPage from "./client/pages/BlogPage/HomeBlogPage";
import BlogDetailPage from "./client/pages/BlogPage/BlogDetailPage";
import FindBillPage from "./client/pages/FindBillPage";
import ContactPage from "./client/pages/ContactPage";

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
      <Route path="/bookingticket" element={<BookingTicket />} />
      <Route path="/findbill" element={<FindBillPage />} />
      <Route
        path="/homeblogpage"
        element={<HomeBlogPage category="khuyen-mai" />}
      />
      <Route
        path="/trong-nganh"
        element={<HomeBlogPage category="trong-nganh" />}
      />
      <Route path="/noi-bo" element={<HomeBlogPage category="noi-bo" />} />
      <Route
        path="/atgt-duong-sat"
        element={<HomeBlogPage category="atgt-duong-sat" />}
      />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;
