//src/utils/api.js
export const getApiBaseUrl = () => {
  // Sử dụng biến môi trường nếu có, nếu không thì fallback về URL production
  return process.env.REACT_APP_API_BASE_URL || "http://www.goticket.click";
};
