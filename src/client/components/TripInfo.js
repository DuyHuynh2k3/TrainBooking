const TripInfo = ({
  departureDate,
  departureStation,
  arrivalStation,
  isReturnTrip, 
}) => {
  // Hàm format ngày
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <h5 className="card-title text-main m-0 " style={{ fontWeight: "bold", fontSize: "16px" }}>
      <i className="bi bi-list"></i>
      {/* Hiển thị thông tin chuyến đi hoặc chuyến về */}
      {departureDate && departureStation && arrivalStation
        ? `${isReturnTrip ? "Chiều về" : "Chiều đi"}: ngày ${formatDate(
            departureDate
          )} từ ${departureStation} đến ${arrivalStation}`
        : "Thông tin hành trình"}
    </h5>
  );
};

export default TripInfo;
