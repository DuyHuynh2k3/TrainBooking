import React from "react";
import image1 from "../../assets/img/001.jpg";
import image2 from "../../assets/img/002.jpg";
import image3 from "../../assets/img/003.jpg";
import bn1 from "../../assets/img/banner1.jpg";
import bn2 from "../../assets/img/banner2.jpg";
import "../../styles/Carousel.css";

const Carousel = () => {
  return (
    <div className="container-fluid mt-2">
      <div className="row d-flex justify-content-center">
        {/* Carousel on the left */}
        <div className="col-lg-7 p-0">
          {" "}
          {/* Giảm từ col-lg-7 xuống col-lg-6 */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={image1}
                  alt="Slide 1"
                  className="img-fluid"
                  style={{ height: "310px", width: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={image2}
                  alt="Slide 2"
                  className="img-fluid"
                  style={{ height: "310px", width: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={image3}
                  alt="Slide 3"
                  className="img-fluid"
                  style={{ height: "310px", width: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Banners on the right */}
        <div className="col-lg-2 d-flex flex-column">
          {" "}
          {/* Giảm từ col-lg-3 xuống col-lg-2 */}
          <div className="mb-2">
            <img
              src={bn1}
              className="img-fluid"
              alt="Banner 1"
<<<<<<< HEAD
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
=======
              style={{ width: "100%", maxHeight: "150px",objectFit: "cover" }}
>>>>>>> 61c8f514abd337587c65cb7b121add9cb3552a88
            />
          </div>
          <div>
            <img
              src={bn2}
              className="img-fluid"
              alt="Banner 2"
<<<<<<< HEAD
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
=======
              style={{ width: "100%", maxHeight: "150px",objectFit: "cover" }}
>>>>>>> 61c8f514abd337587c65cb7b121add9cb3552a88
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;