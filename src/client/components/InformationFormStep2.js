import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/InformationForm.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useStore from "../../store/trains";
import TripInfo from "./TripInfo";

const steps = [
  "Nhập thông tin hành khách",
  "Xác nhận thông tin",
  "Thanh toán",
  "Hoàn tất",
];

const InformationFormStep2 = ({ onNext, onBack, formData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { passengerInfo, cartTickets = [] } = formData;
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());
  const [timeLeft, setTimeLeft] = useState(478);
  const navigate = useNavigate();
  const { station, setstation, isRound } = useStore();
  const [stationList, setStationList] = useState([]);
  const totalAmount = (cartTickets || []).reduce(
    (total, ticket) => total + (ticket.price || 0) + 1000,
    0
  );
  const isValidDate = (date) => {
    return !isNaN(Date.parse(date));
  };
  const seatTypeDisplayName = {
    soft: "Ngồi mềm",
    hard_sleeper_4: "Nằm khoang 4",
    hard_sleeper_6: "Nằm khoang 6",
  };
  console.log("1", formData);
  console.log(formData.passengerInfo.passengerType - 0);
  console.log("hahaha", cartTickets);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("/api/station");
        const data = await response.json();
        setStationList(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách ga:", error);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate("/");
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, navigate]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNextLocal = async () => {
    // Thêm vào đầu handleNextLocal trong InformationFormStep2.js
    console.group("Debug passengerInfo");
    console.log("Full passengerInfo object:", passengerInfo);
    console.log("All keys:", Object.keys(passengerInfo));
    console.log("passengerType-0 value:", passengerInfo["passengerType-0"]);
    console.groupEnd();

    console.log(
      "Selected paymentMethod in Step2:",
      passengerInfo.paymentMethod
    );

    if (!passengerInfo.paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán.");
      return;
    }

    setIsLoading(true);

    try {
      const customerData = {
        passport: passengerInfo.idNumber,
        fullName: passengerInfo.fullName,
        email: passengerInfo.email,
        phoneNumber: passengerInfo.phone,
        passenger_type: passengerInfo[`passengerType-0`] || "Người lớn",
      };

      const normalize = (str) =>
        str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim();

      const ticketDataList = cartTickets.map((ticket, index) => {
        const fromStation = stationList.find(
          (s) =>
            normalize(s.station_name) === normalize(ticket.departureStation)
        );
        const toStation = stationList.find(
          (s) => normalize(s.station_name) === normalize(ticket.arrivalStation)
        );

        if (!fromStation || !toStation) {
          throw new Error(
            ` Không tìm thấy ga khớp: ${ticket.departureStation} hoặc ${ticket.arrivalStation}`
          );
        }

        return {
          fullName: passengerInfo.fullName,
          passport: passengerInfo.idNumber,
          phoneNumber: passengerInfo.phone,
          email: passengerInfo.email,
          q_code: "QR_" + Math.random().toString(36).substr(2, 9),
          seatID: null,
          coach_seat: `${ticket.car}-${ticket.seat}`,
          trainID: ticket.trainid,
          seatType: ticket.seatType,
          travel_date: ticket.departureDate,
          from_station_id: fromStation.station_id,
          to_station_id: toStation.station_id,
          departTime: isValidDate(ticket.departTime)
            ? new Date(ticket.departTime)
                .getUTCHours()
                .toString()
                .padStart(2, "0") +
              ":" +
              new Date(ticket.departTime)
                .getUTCMinutes()
                .toString()
                .padStart(2, "0")
            : null,
          arrivalTime: isValidDate(ticket.arrivalTime)
            ? new Date(ticket.arrivalTime)
                .getUTCHours()
                .toString()
                .padStart(2, "0") +
              ":" +
              new Date(ticket.arrivalTime)
                .getUTCMinutes()
                .toString()
                .padStart(2, "0")
            : null,
          price: ticket.price + 1000,
          payment_status: "Pending",
          refund_status: "None",
          passenger_type: passengerInfo[`passengerType-${index}`] || "0", // dạng chuỗi số
          journey_segments: `${ticket.departureStation} - ${ticket.arrivalStation}`,
        };
      });

      console.log("All passenger info keys:", Object.keys(passengerInfo));
      console.log(
        "Passenger types:",
        cartTickets.map((_, i) => passengerInfo[`passengerType-${i}`])
      );

      const paymentData = {
        payment_method:
          passengerInfo.paymentMethod === "zalo"
            ? "Zalopay"
            : passengerInfo.paymentMethod === "momo"
            ? "Momo"
            : "Khác",
        payment_amount: totalAmount,
        payment_status: "Pending",
        payment_date: new Date().toISOString(),
      };

      console.log("Sending data to save-booking:", {
        customerData,
        ticketDataList,
        paymentData,
      });

      const saveResponse = await fetch("/api/save-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerData, ticketDataList, paymentData }),
      });

      if (!saveResponse.ok) {
        const errorText = await saveResponse.text();
        console.error("Raw error response:", errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          throw new Error(`Lỗi server: ${saveResponse.status} - ${errorText}`);
        }
        throw new Error(
          errorData.error ||
            errorData.message ||
            "Lỗi không xác định khi lưu thông tin"
        );
      }

      const saveResult = await saveResponse.json();
      console.log("Save booking success:", saveResult);

      let endpoint = "";
      if (passengerInfo.paymentMethod === "momo") {
        endpoint = "/api/payment/momo";
      } else if (passengerInfo.paymentMethod === "zalo") {
        endpoint = "/api/payment/zalopay";
      }

      const paymentResponse = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          orderId: `ORDER_${saveResult.ticket_id}_${new Date().getTime()}`,
          orderInfo: "Thanh toán vé tàu",
          ticketIds: saveResult.ticket_ids || [],
        }),
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        throw new Error(`Lỗi thanh toán: ${errorData.message}`);
      }

      const paymentResult = await paymentResponse.json();
      console.log("Payment response:", paymentResult);

      // 4. Chuyển hướng đến trang thanh toán nếu thành công
      if (
        (passengerInfo.paymentMethod === "momo" && paymentResult.payUrl) ||
        (passengerInfo.paymentMethod === "zalo" && paymentResult.order_url)
      ) {
        window.location.href = paymentResult.payUrl || paymentResult.order_url;
      } else {
        throw new Error("Không nhận được URL thanh toán");
      }
    } catch (error) {
      console.error("Full error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });

      alert(`Lỗi khi xử lý đặt vé: ${error.message}`);
    } finally {
      setIsLoading(false);

      // Chỉ chuyển bước nếu không có chuyển hướng thanh toán
      if (
        !window.location.href.includes("momo") &&
        !window.location.href.includes("zalopay")
      ) {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        onNext();
      }
    }
  };

  const handleBackLocal = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    onBack();
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <div className="card custom-card">
              <div className="card-header custom-card-header">
                <h4 style={{ color: "#E55A05" }}>THÔNG TIN GIỎ VÉ</h4>
              </div>
              <div className="card-body"></div>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <div className="card custom-card">
              <div className="card-header custom-card-header">
                <h4 style={{ color: "#E55A05" }}>
                  Xác nhận thông tin đặt mua vé tàu
                </h4>
              </div>
              <div className="card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ width: "48%" }}>
                    <Typography
                      variant="h6"
                      style={{ marginTop: "10px", color: "#E55A05" }}
                    >
                      Thông tin người mua vé
                    </Typography>
                    <div style={{ marginBottom: "10px" }}>
                      <Typography
                        style={{ display: "inline-block", width: "200px" }}
                      >
                        - Họ và tên:
                      </Typography>
                      <Typography style={{ display: "inline-block" }}>
                        {passengerInfo.fullName}
                      </Typography>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <Typography
                        style={{ display: "inline-block", width: "200px" }}
                      >
                        - Số CMND/Hộ chiếu:
                      </Typography>
                      <Typography style={{ display: "inline-block" }}>
                        {passengerInfo.idNumber}
                      </Typography>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <Typography
                        style={{ display: "inline-block", width: "200px" }}
                      >
                        - Số di động:
                      </Typography>
                      <Typography style={{ display: "inline-block" }}>
                        {passengerInfo.phone}
                      </Typography>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <Typography
                        style={{ display: "inline-block", width: "200px" }}
                      >
                        - Email:
                      </Typography>
                      <Typography style={{ display: "inline-block" }}>
                        {passengerInfo.email}
                      </Typography>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <Typography
                        style={{ display: "inline-block", width: "200px" }}
                      >
                        - Phương thức thanh toán:
                      </Typography>
                      <Typography style={{ display: "inline-block" }}>
                        {passengerInfo.paymentMethod === "zalo"
                          ? "Thanh toán qua ZaloPAY"
                          : passengerInfo.paymentMethod === "momo"
                          ? "Thanh toán qua MoMo"
                          : passengerInfo.paymentMethod === "atm"
                          ? "Thẻ ATM nội địa"
                          : passengerInfo.paymentMethod === "visa"
                          ? "Thẻ quốc tế Visa, Master"
                          : "Thanh toán qua Napas"}{" "}
                        {/* Giá trị mặc định */}
                      </Typography>
                    </div>
                  </div>

                  <div style={{ width: "48%" }}>
                    <Typography
                      variant="h6"
                      style={{ marginTop: "10px", color: "#E55A05" }}
                    >
                      Thông tin hóa đơn
                    </Typography>
                    <div style={{ marginBottom: "10px" }}>
                      <Typography
                        style={{ display: "inline-block", width: "200px" }}
                      >
                        - Người mua hàng:
                      </Typography>
                      <Typography style={{ display: "inline-block" }}>
                        {passengerInfo.fullName}
                      </Typography>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <Typography
                        style={{ display: "inline-block", width: "200px" }}
                      >
                        - Tên Công ty/Đơn vị:
                      </Typography>
                      <Typography style={{ display: "inline-block" }}>
                        {passengerInfo.companyName || "Không có"}
                      </Typography>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <Typography
                        style={{ display: "inline-block", width: "200px" }}
                      >
                        - Mã số thuế:
                      </Typography>
                      <Typography style={{ display: "inline-block" }}>
                        {passengerInfo.taxCode || "Không có"}
                      </Typography>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <Typography
                        style={{ display: "inline-block", width: "200px" }}
                      >
                        - Địa chỉ:
                      </Typography>
                      <Typography style={{ display: "inline-block" }}>
                        {passengerInfo.address || "Không có"}
                      </Typography>
                    </div>
                  </div>
                </div>

                <Typography
                  variant="h6"
                  style={{ marginTop: "10px", color: "#E55A05" }}
                >
                  Thông tin vé mua
                </Typography>
                <table className="table custom-table">
                  <thead>
                    <tr>
                      <th style={{ width: "50px" }}>STT</th>
                      <th style={{ width: "500px" }}>Thông tin vé mua</th>
                      <th style={{ width: "150px" }}>TG giữ vé</th>
                      <th style={{ width: "150px" }}>Giá (VNĐ)</th>
                      <th style={{ width: "150px" }}>Thành tiền (VNĐ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartTickets.map((ticket, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="text-center">
                            <div className="d-flex justify-content-center">
                              <div>
                                <TripInfo
                                  stationtype={
                                    ticket.tripType === "return"
                                      ? "Chiều Về"
                                      : "Chiều Đi"
                                  }
                                />
                                <div className="text-start">
                                  <p
                                    className="m-0 text-dark fw-normal ms-2"
                                    style={{ fontSize: "16px" }}
                                  >
                                    Tàu: {ticket.trainName}
                                  </p>
                                  <p
                                    className="m-0 text-dark fw-normal ms-2"
                                    style={{ fontSize: "16px" }}
                                  >
                                    Toa: {ticket.car}
                                  </p>
                                  <p
                                    className="m-0 text-dark fw-normal ms-2"
                                    style={{ fontSize: "16px" }}
                                  >
                                    Ghế: {ticket.seat}
                                  </p>
                                  <p
                                    className="m-0 text-dark fw-normal ms-2"
                                    style={{ fontSize: "16px" }}
                                  >
                                    Loại:{" "}
                                    {seatTypeDisplayName[ticket.seatType] ||
                                      ticket.seatType}
                                    .
                                  </p>
                                  <p
                                    className="m-0 text-dark fw-normal ms-2"
                                    style={{ fontSize: "16px" }}
                                  >
                                    Thời gian chạy:{" "}
                                    {isValidDate(ticket.departTime)
                                      ? new Date(
                                          ticket.departTime
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          timeZone: "UTC",
                                        })
                                      : "Giờ xuất phát không hợp lệ"}{" "}
                                    -{" "}
                                    {isValidDate(ticket.arrivalTime)
                                      ? new Date(
                                          ticket.arrivalTime
                                        ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          timeZone: "UTC",
                                        })
                                      : "Giờ đến không hợp lệ"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>Còn {timeLeft} giây</td>
                          <td>{ticket.price.toLocaleString()} VND</td>
                          <td>{(ticket.price + 1000).toLocaleString()} VND</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="table-info">
                    <tr
                      style={{
                        borderTop: "2px solid #CCCCCC",
                        fontSize: "17px",
                        fontWeight: "400",
                      }}
                    >
                      <td colSpan={4} style={{ textAlign: "right" }}>
                        Tổng tiền
                      </td>
                      <td>
                        {" "}
                        {cartTickets
                          .reduce(
                            (total, ticket) => total + ticket.price + 1000,
                            0
                          )
                          .toLocaleString()}
                        VND
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <Typography
                  style={{
                    fontSize: "16px",
                    color: "#3A87AD",
                    fontWeight: "400",
                    marginTop: "20px",
                  }}
                >
                  Quý khách vui lòng kiểm tra kỹ và xác nhận các thông tin đã
                  nhập trước khi thực hiện giao dịch mua vé. Sau khi thực hiện
                  giao dịch ở trang tiếp theo quý khách sẽ không thể thay đổi
                  được thông tin mua vé trên.
                </Typography>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="card custom-card">
              <div className="card-header custom-card-header">
                <h4 style={{ color: "#E55A05" }}>Phương thức thanh toán</h4>
              </div>
              <div className="card-body"></div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <Typography variant="h5" style={{ marginTop: "20px" }}>
              Đơn hàng của bạn đã được xử lý thành công!
            </Typography>
          </div>
        );
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption"></Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {renderStepContent(activeStep)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                disabled={activeStep === 0}
                onClick={handleBackLocal}
                sx={{ mr: 1, width: "150px" }}
              >
                Nhập lại
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleSkip}
                  sx={{ mr: 1, width: "150px" }}
                >
                  Bỏ qua
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextLocal}
                sx={{ width: "165px" }}
              >
                Đồng ý xác nhận
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default InformationFormStep2;
