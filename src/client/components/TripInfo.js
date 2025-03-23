import useStore from "../../store/trains";
const TripInfo = ({stationtype}) => {
   const { station, setstation,trainS ,
    trainsReturn,isRound  } = useStore(); 
   
   console.log(trainS,trainsReturn);
   const trainstation = stationtype === "Chiều Đi" ? trainS : trainsReturn
   console.log(trainstation);
  
   // Kiểm tra nếu trainstation không tồn tại hoặc rỗng
  if (!trainstation || trainstation.length === 0) {
    return (
      <h5 className="card-title text-main m-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
        <i className="bi bi-list"></i>
        Không có thông tin chuyến đi
      </h5>
    );
  }
  // Hàm format ngày
  const formatDate = (date) => {
    console.log(typeof date); //string
  
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
  
 
  const isReturnTrip = station.ticketType === "roundTrip" && station.returnDate;
  return (
    <h5 className="card-title text-main m-0 " style={{ fontWeight: "bold", fontSize: "16px" }}>
      <i className="bi bi-list"></i>
      {/* Hiển thị thông tin chuyến đi hoặc chuyến về */}
      {station.departureDate && station.departureStation && station.arrivalStation
        ? `${isRound}: ngày ${trainstation[0].departureDate} từ ${trainstation[0].departureStation} đến ${trainstation[0].arrivalStation}`
        : "Thông tin hành trình"}
    </h5>
  );
};

export default TripInfo;
