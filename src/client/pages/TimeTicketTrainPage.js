import React from "react";
import Header from "../components/Header";
import bg_train3 from "../../assets/img/bg_train3.jpg";

export default function TimeTicketTrainPage() {
  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#f7f7f7" }}>
      <Header />
      <main className="mt-4">
        <div className="container-fluid mt-2">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow">
                <div className="card-header text-primary">
                  <h5
                    className="m-0 d-flex align-items-center"
                    style={{ gap: "5px" }}
                  >
                    Điểm in vé tầu và tra cứu vé tầu điện tử
                  </h5>
                </div>
                <div className="card-body p-2">
                  <p className="p-2">Vui lòng chọn các thao tác bên dưới.</p>
                  <a
                    href="/gotrain"
                    className="btn btn-warning text-white"
                    style={{
                      width: "100%",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Giờ tàu - Giá vé
                  </a>
                  <div
                    style={{
                      position: "relative",
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={bg_train3}
                      alt="Train station"
                      style={{
                        height: "600px",
                        width: "90%",
                        borderRadius: "10px",
                        objectFit: "cover",
                        marginBottom:"10px"
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "40px",
                        fontWeight: "bold",
                        textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        padding: "10px 20px",
                        borderRadius: "10px",
                      }}
                    >
                      Mua vé tàu mọi lúc mọi nơi
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
