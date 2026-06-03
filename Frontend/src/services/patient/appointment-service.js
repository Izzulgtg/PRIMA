import api from "../api";

export const createAppointment = async (payload) => {
  const response = await api.post(
    "/pasien/daftar",
    payload
  );

  return response.data;
};