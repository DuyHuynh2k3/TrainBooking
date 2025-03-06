import React, { useState } from "react";
import Header from "../components/Header";
import { MdOutlineAccessTime } from "react-icons/md";
import { TbCircleNumber1 } from "react-icons/tb";
import { TbCircleNumber2 } from "react-icons/tb";
import { TbCircleNumber3 } from "react-icons/tb";
import { TbCircleNumber4 } from "react-icons/tb";

export default function GoTrainPage() {
  const [gaDi, setGaDi] = useState("");

  const handleGaDiChange = (e) => {
    setGaDi(e.target.value);
  };

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
                    <MdOutlineAccessTime /> Thông tin hành trình
                  </h5>
                </div>
                <div className="card-body p-4">
                  {/* Sử dụng Grid Layout để tạo 2 cột */}
                  <div className="row">
                    {/* Ga đi */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="gaDi" className="form-label d-flex align-items-center">
                        <TbCircleNumber1 style={{ height: "20px", marginRight: "8px" }} /> Ga đi
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="gaDi"
                        placeholder="Nhập ga đi"
                        value={gaDi}
                        onChange={handleGaDiChange}
                      />
                    </div>

                    {/* Ga đến */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="gaDen" className="form-label">
                        Ga đến
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="gaDen"
                        placeholder="Nhập ga đến"
                        disabled
                      />
                    </div>
                  </div>

                  {/* Hàng dưới với 2 cột */}
                  <div className="row">
                    {/* Hóa đơn */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="hoaDuoi" className="form-label">
                        Hóa đơn
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="hoaDuoi"
                        placeholder="Hóa đơn"
                        disabled
                      />
                    </div>

                    {/* Ngày */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="ngay" className="form-label">
                        Ngày
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ngay"
                        placeholder="Ngày"
                        disabled
                      />
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
