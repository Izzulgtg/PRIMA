import api from "../api";

export const createAppointment = async (appointmentData) => {
  const response = await api.post(
    "/pasien/daftar",
    appointmentData
  );

  return response.data;
};