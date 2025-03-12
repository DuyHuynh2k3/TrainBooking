import React, { useEffect, useState } from "react";
import axios from "axios"; // Hoặc sử dụng fetch
import { FiAlignJustify } from "react-icons/fi";

const TrainSchedule = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableTrains, setAvailableTrains] = useState(0); // Trạng thái số tàu còn vé

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/trains")
      .then((response) => {
        console.log(response.data); // Kiểm tra dữ liệu trả về từ API
        setTrains(response.data); // Lưu dữ liệu vào state
        setLoading(false); // Đã tải xong

        // Tính toán số tàu còn vé
        const available = response.data.filter((train) =>
          train.seats.some((seat) => seat.available > 0)
        ).length;
        setAvailableTrains(available); // Cập nhật số tàu còn vé
      })
      .catch((error) => {
        console.error("Có lỗi khi tải dữ liệu tàu:", error);
        setLoading(false); // Dừng trạng thái tải
      });
  }, []); // [] để chỉ gọi một lần khi component mount

  if (loading) {
    return <div className="text-center mt-5">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container-fluid mt-2">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-7 p-0">
          <div className="card shadow mb-4">
            <div className="card-header text-primary d-flex justify-content-between p-2">
              <h5 className="card-title text-main m-0" style={{ fontWeight: "bold" }}>
                <i className="bi bi-list"></i>
                <FiAlignJustify /> Chiều đi: ngày 20/03/2025 từ Sài Gòn đến Nha Trang
              </h5>
              {/* Hiển thị số tàu còn vé */}
              <div className="text-primary" style={{ fontWeight: "bold" }}>
                <strong>{availableTrains}</strong> Tàu còn vé cho ngày này
              </div>
            </div>
            <div className="card-body">
              <form>
                {/* Bọc mỗi tàu trong một card riêng biệt */}
                {trains.map((train) => (
                  <div key={train.id} className="card shadow-sm mb-4">
                    <div className="card-body shadow-lg">
                      <div className="d-flex align-items-center">
                        <img
                          alt="Train icon"
                          src="https://storage.googleapis.com/a1aa/image/RS9HQeTC-3vdCfvvsGHb6MIx4JL0KC78tno0WULvSQo.jpg"
                          width="50"
                          className="mr-4"
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <h6 className="font-weight-bold">{train.name}</h6>
                            <p className="text-muted">{train.duration}</p>
                            <p className="text-warning">{train.discount}</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="font-weight-bold">{train.departureTime}</div>
                            <span className="text-center">→</span>
                            <div className="font-weight-bold">{train.arrivalTime}</div>
                          </div>
                          <div className="d-flex justify-content-between text-muted mt-1">
                            <div>{train.route}</div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        {train.seats.map((seat, index) => (
                          <div className="col text-center" key={index}>
                            <strong>{seat.type}</strong>
                            <div className="text-warning">{seat.available} Chỗ còn</div>
                            <div className="text-muted">từ {seat.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          {/* Bạn có thể thêm các thông tin khác vào đây nếu cần */}
        </div>
      </div>
    </div>
  );
};

export default TrainSchedule;
