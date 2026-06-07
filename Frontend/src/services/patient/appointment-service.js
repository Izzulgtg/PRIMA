import api from "../api";

export const createAppointment =
  async (payload) => {
    try {
      const { data } =
        await api.post(
          "/pasien/daftar",
          payload
        );

      return data;
    } catch (error) {
      console.error(
        "Gagal membuat appointment",
        error
      );
      throw error;
    }
  };

export const getAppointments =
  async () => {
    try {
      const { data } =
        await api.get(
          "/pasien/pendaftaran"
        );

      return data.data;
    } catch (error) {
      console.error(
        "Gagal mengambil appointment",
        error
      );
      throw error;
    }
  };

export const getUpcomingAppointment =
  async () => {
    try {
      const { data } =
        await api.get(
          "/pasien/pendaftaran/upcoming"
        );

      return data.data;
    } catch (error) {
      console.error(
        "Gagal mengambil upcoming appointment",
        error
      );
      throw error;
    }
  };

export const cancelAppointment =
  async (id) => {
    try {
      const { data } =
        await api.put(
          `/pasien/pendaftaran/${id}/cancel`
        );

      return data;
    } catch (error) {
      console.error(
        "Gagal membatalkan appointment",
        error
      );
      throw error;
    }
  };