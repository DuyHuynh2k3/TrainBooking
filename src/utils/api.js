//src/utils/api.js
export const getApiBaseUrl = () => {
  // Sử dụng biến môi trường nếu có, nếu không thì fallback về URL production
<<<<<<< Updated upstream
  return process.env.REACT_APP_API_BASE_URL || "http://api.goticket.click";
=======
  return (
    process.env.REACT_APP_API_BASE_URL || " http://localhost:3000"
  );
>>>>>>> Stashed changes
};
