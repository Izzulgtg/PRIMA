import api from "../api";

export const createAppointment = async (
  payload
) => {
  const { data } = await api.post(
    "/pasien/daftar",
    payload
  );

  return data;
};

export const getAppointments =
  async () => {
    const { data } =
      await api.get(
        "/pasien/pendaftaran"
      );

    return data.data;
  };

export const getUpcomingAppointment =
  async () => {
    const { data } =
      await api.get(
        "/pasien/pendaftaran/upcoming"
      );

    return data.data;
  };

export const cancelAppointment =
  async (id) => {
    const { data } =
      await api.put(
        `/pasien/pendaftaran/${id}/cancel`
      );

    return data;
  };

export const getDoctors =
  async () => {
    const { data } =
      await api.get(
        "/pasien/dokter"
      );

    return data.data;
  };

export const getDoctorSlots =
  async (doctorId) => {
    const { data } =
      await api.get(
        `/pasien/dokter/${doctorId}/slots`
      );

    return data.data;
  };