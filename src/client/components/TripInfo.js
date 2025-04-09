
import useStore from "../../store/trains";

const TripInfo = ({ stationtype}) => {
  const { station, trains, trainsReturn, setStation } = useStore((state) => state);
  console.log(station);
  console.log(trains);
  console.log("hi",station.departureDate,station.arrivalStation,station.departureStation);
  // Lựa chọn dữ liệu chuyến đi (Chiều đi hoặc chiều về)
  const trainstation = stationtype === "Chiều Đi" ? trains : trainsReturn;
  console.log("he",trainstation);

  
  

  // // Kiểm tra nếu trainstation không tồn tại hoặc rỗng
  // if (!trainstation || trainstation.length === 0) {
  //   return (
  //     <h5 className="card-title text-main m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
  //       <i className="bi bi-list"></i>
  //       Không có thông tin chuyến đi
  //     </h5>
  //   );
  // }

  // Hàm format ngày
  const formatDate = (date) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj)) {
      console.error("Invalid date format");
      return null; // Return null or a fallback value for invalid date
    }

    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // Kiểm tra chuyến khứ hồi
  const isReturnTrip = station.ticketType === "roundTrip" && station.returnDate;

  return (
    <h5 className="card-title text-main m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
      <i className="bi bi-list"></i>
      {/* Hiển thị thông tin chuyến đi hoặc chuyến về */}
      {station.departureDate && station.departureStation && station.arrivalStation ? (
        `${stationtype}: ngày ${formatDate(station.departureDate)} từ ${station.departureStation} đến ${station.arrivalStation}`
      ) : (
        "Thông tin hành trình"
      )}
    </h5>
  );
};

export default TripInfo;
