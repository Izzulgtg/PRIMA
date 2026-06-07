import api from "../api";

export const createAppointment =
  async (payload) => {
    const response =
      await api.post(
        "/pasien/daftar",
        payload
      );

    return response.data;
  };

export const getAppointments =
  async () => {
    const response =
      await api.get(
        "/pasien/pendaftaran"
      );

    return response.data.data;
  };

export const getUpcomingAppointment =
  async () => {
    const response =
      await api.get(
        "/pasien/pendaftaran/upcoming"
      );

    return response.data.data;
  };

export const cancelAppointment =
  async (id) => {
    const response =
      await api.put(
        `/pasien/pendaftaran/${id}/cancel`
      );

    return response.data;
  };