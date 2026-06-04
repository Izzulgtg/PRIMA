import api from "../api";

/**
 * Membuat appointment baru
 */
export const createAppointment = async (payload) => {
  const response = await api.post(
    "/pasien/daftar",
    payload
  );

  return response.data;
};

/**
 * Mengambil semua appointment pasien
 */
export const getAppointments = async () => {
  const response = await api.get(
    "/pasien/appointments"
  );

  return response.data.data;
};

/**
 * Mengambil appointment terdekat
 */
export const getUpcomingAppointment = async () => {
  const response = await api.get(
    "/pasien/appointments/upcoming"
  );

  return response.data.data;
};

/**
 * Membatalkan appointment
 */
export const cancelAppointment = async (
  appointmentId
) => {
  const response = await api.delete(
    `/pasien/appointments/${appointmentId}`
  );

  return response.data;
};