import api from "../api";

export const getStatistics = async () => {
  const response = await api.get("/dokter/statistics");
  return response.data;
};