import React from "react";
import Header from "../../components/Header";  // Sửa lại đường dẫn
import Footer from "../../components/Footer";
import Promotion from "../../components/Promotion";
import Breadcrumb from "../../components/Breadcrumb";
import Paginition from "../../components/Paginition";
import "bootstrap/dist/css/bootstrap.min.css";


const PromotionPage = () => {
  return (
    <div className="d-flex flex-column" style={{backgroundColor:"#f7f7f7"}}>
      <Header />
      <Breadcrumb  />
      <main className="mt-2">
        <Promotion />
       </main>
       <Paginition />
      <Footer />
    </div>
  );
};

export default PromotionPage;