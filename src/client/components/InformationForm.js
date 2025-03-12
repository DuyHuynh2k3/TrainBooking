import React, { useState } from "react";
import HorizontalLinearStepper from "../components/Steper";
import "../../styles/InformationForm.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import vnpayLogo from "../../assets/img/logo-dvtt-VNP.png";
import momoLogo from "../../assets/img/logo-dvtt-MOM.png";
import bankLogo from "../../assets/img/logo-dvtt-SML.png";
import atmLogo from "../../assets/img/the-noi-dia.png";
import visaLogo from "../../assets/img/the-quoc-te-no-jcb.png";
import uncheckLogo from "../../assets/img/checkbox-unchecked.svg";
import checkLogo from "../../assets/img/checkbox.svg";

const steps = [
  "Nhập thông tin hành khách",
  "Xác nhận thông tin",
  "Thanh toán",
  "Hoàn tất",
];

const InformationForm = () => {
  const [selectedCard, setSelectedCard] = useState(null); // State để lưu trữ lựa chọn hiện tại

  const handleCardClick = (cardType) => {
    // Nếu cardType đã được chọn, bỏ chọn nó
    if (selectedCard === cardType) {
      setSelectedCard(null);
    } else {
      // Ngược lại, chọn cardType mới
      setSelectedCard(cardType);
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
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
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          </React.Fragment>
        )}
      </Box>
      <div className="card custom-card">
        <div className="card-header custom-card-header">
          <h4 style={{ color: "#E55A05" }}>THÔNG TIN GIỎ VÉ</h4>
        </div>
        <div className="card-body">
          <p
            className="custom-note"
            style={{ fontSize: "16px", color: "#3A87AD", fontWeight: "400" }}
          >
            Các vé có biểu tượng là các vé bị hết thời gian tạm giữ. Xin vui
            lòng loại bỏ các vé này khỏi danh sách vé đặt mua trước khi thực
            hiện giao dịch thanh toán tiền. Quý khách vui lòng điền đầy đủ,
            chính xác tất cả các thông tin về hành khách đi tàu bao gồm: Họ tên
            đầy đủ, số giấy tờ tùy thân (Số chứng minh nhân dân hoặc số hộ chiếu
            hoặc số giấy phép lái xe đường bộ được pháp luật Việt Nam công nhận
            hoặc ngày tháng năm sinh nếu là trẻ em hoặc thẻ sinh viên nếu là
            sinh viên). Để đảm bảo an toàn, minh bạch trong quá trình bán vé các
            thông tin này sẽ được nhân viên soát vé kiểm tra trước khi lên tàu
            theo đúng các quy định của Tổng công ty Đường sắt Việt Nam.
          </p>
          <table className="table custom-table">
            <thead>
              <tr>
                <th style={{ width: "300px" }}>Họ tên</th>
                <th>Thông tin chỗ</th>
                <th>Giá vé</th>
                <th>Giảm đối tượng</th>
                <th>Khuyến mãi</th>
                <th>Bảo hiểm</th>
                <th>Thành tiền (VNĐ)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="mb-2 d-flex align-items-center">
                    <span className=".labelspan" style={{ width: "120px" }}>
                      Họ tên
                    </span>
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="Thông tin hành khách"
                    />
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <span className=".labelspan" style={{ width: "120px" }}>
                      Đối tượng
                    </span>
                    <select className="form-control custom-input">
                      <option value="">Chọn đối tượng</option>
                      <option value="adult">Người lớn</option>
                      <option value="child">Trẻ em</option>
                      <option value="child">Người cao tuổi</option>
                      <option value="child">Sinh viên</option>
                    </select>
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <span className=".labelspan" style={{ width: "120px" }}>
                      Số giấy tờ
                    </span>
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="Số CMND/Hộ chiếu"
                    />
                  </div>
                </td>
                <td>Thông tin hành khách</td>
                <td>790,000</td>
                <td>0</td>
                <td>Không có khuyến mãi cho vé này</td>
                <td>1,000</td>
                <td>791,000</td>
                <td></td>
              </tr>
            </tbody>
            <tfoot className="table-info">
              <tr
                style={{
                  borderTop: "2px solid #CCCCCC",
                  fontSize: "17px",
                  fontWeight: "400",
                }}
              >
                <td colSpan={6} style={{ textAlign: "right" }}>
                  Tổng tiền
                </td>
                <td>791,000</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Phần thông tin người đặt vé */}
      <div className="card custom-card mt-4">
        <div className="card-header custom-card-header">
          <h4 style={{ color: "#E55A05" }}>Thông tin người đặt vé</h4>
        </div>
        <div className="card-body">
          <span style={{ color: "#3A87AD" }}>
            Quý khách vui lòng điền đẩy đủ và chính xác các thông tin về người
            mua vé dưới đây. Các thông tin này sẽ được sử dụng để xác minh người
            mua vé và lấy vé tại ga trước khi lên tàu theo đúng các quy định của
            Tổng công ty Đường sắt Việt Nam.
          </span>
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="fullName" className="form-label custom-label">
                  Họ và tên*
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="fullName"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="idNumber" className="form-label custom-label">
                  Số CMND/Hộ chiếu*
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="idNumber"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label custom-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control custom-input"
                  id="email"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="confirmEmail"
                  className="form-label custom-label"
                >
                  Xác nhận email
                </label>
                <input
                  type="email"
                  className="form-control custom-input"
                  id="confirmEmail"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label custom-label">
                  Số di động
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="phone"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Phần thông tin xuất hóa đơn điện tử */}
      <div className="card custom-card mt-4">
        <div className="card-header custom-card-header">
          <h4 style={{ color: "#E55A05" }}>Thông tin xuất hóa đơn điện tử</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label
                  htmlFor="companyName"
                  className="form-label custom-label"
                >
                  Tên Công ty/Đơn vị
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="companyName"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="taxCode" className="form-label custom-label">
                  Mã số thuế
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="taxCode"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="address" className="form-label custom-label">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  id="address"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Phần phương thức thanh toán */}
      <div className="card custom-card mt-4">
        <div className="card-header custom-card-header">
          <h4 style={{ color: "#E55A05" }}>Phương thức thanh toán</h4>
        </div>
        <div className="card-body">
          <FormControl style={{ width: "100%" }}>
            <RadioGroup
              aria-labelledby="payment-method-label"
              name="payment-method"
            >
              <div className="payment-method-container">
                <FormControlLabel
                  value="vnpay"
                  control={<Radio />}
                  label={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={vnpayLogo}
                        alt="VNPAY Logo"
                        style={{ marginRight: "10px" }}
                      />
                      <div>
                        <div>
                          Thanh toán trực tuyến qua công thanh toán VNPAY
                        </div>
                        <div style={{ fontSize: "14px", color: "#666" }}>
                          - QR Pay trên ứng dụng Mobile Banking của các ngân
                          hàng và Ví VNPAY (quét mã VNPAY-QR để thanh toán)
                          <br />
                          - Thẻ quốc tế phát hành trong nước và nước ngoài:
                          Visa, Master, JCB, UnionPay, Amex, Google Pay, Apple
                          Pay, Samsung Pay
                          <br />- Thẻ ATM/Tài khoản nội địa
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="payment-method-container">
                <FormControlLabel
                  value="momo"
                  control={<Radio />}
                  label={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={momoLogo}
                        alt="Momo Logo"
                        style={{ marginRight: "10px" }}
                      />
                      <div>
                        <div>Thanh toán trực tuyến qua ví điện tử MoMo</div>
                        <div style={{ fontSize: "14px", color: "#666" }}>
                          - Nhập mã MOMODSVN giảm đến 100k tại mục Ưu đãi
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="payment-method-container">
                <FormControlLabel
                  value="napas"
                  control={<Radio />}
                  label={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={bankLogo}
                        alt="Bank Logo"
                        style={{ marginRight: "10px" }}
                      />
                      <div>
                        <div>
                          Thanh toán trực tuyến qua cổng thanh toán Napas
                        </div>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#666",
                          }}
                        >
                          -Bằng thẻ nội địa, thẻ quốc tế qua cổng của công ty cổ
                          phần thanh toán quốc gia Việt Nam - Napas
                          <br />
                          <div
                            className="d-flex"
                            style={{
                              marginTop: "10px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "14px",
                                padding: "10px",
                                background: "#FAFAFA",
                                width: "360px",
                                marginRight: "20px",
                                cursor: "pointer",
                              }}
                              className="buttonn-check"
                              onClick={() => handleCardClick("atm")}
                            >
                              <img
                                src={
                                  selectedCard === "atm"
                                    ? checkLogo
                                    : uncheckLogo
                                }
                                alt="checked"
                                style={{ width: "13px", borderRadius: "13px" }}
                              />
                              <img
                                src={atmLogo}
                                alt="ATM Logo"
                                style={{ width: "30px" }}
                              />
                              Thẻ ATM nội địa (Hỗ trợ Internet Banking)
                            </div>
                            <div
                              style={{
                                fontSize: "14px",
                                padding: "10px",
                                background: "#FAFAFA",
                                width: "360px",
                                cursor: "pointer",
                              }}
                              className="buttonn-check"
                              onClick={() => handleCardClick("visa")}
                            >
                              <img
                                src={
                                  selectedCard === "visa"
                                    ? checkLogo
                                    : uncheckLogo
                                }
                                alt="checked"
                                style={{ width: "13px", borderRadius: "13px" }}
                              />
                              <img
                                src={visaLogo}
                                alt="visaLogo"
                                style={{ width: "30px" }}
                              />
                              Thẻ quốc tế Visa, Master
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                  }
                />
              </div>
            </RadioGroup>
          </FormControl>
          <div className="mt-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="terms" />
              <label className="form-check-label" htmlFor="terms">
                Tôi đã đọc kỹ và đồng ý tuân thủ tất cả các quy định mua vé trực
                tuyến, các chương trình khuyến mại của Tổng công ty đường sắt
                Việt Nam và chịu trách nhiệm về tính xác thực của các thông tin
                trên.
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Di chuyển các nút Next và Back xuống dưới cùng */}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mt: 3 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {isStepOptional(activeStep) && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
            Skip
          </Button>
        )}
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </div>
  );
};

export default InformationForm;
