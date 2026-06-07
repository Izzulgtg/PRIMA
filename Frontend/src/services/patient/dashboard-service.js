import api from "../api";

export const getDashboard =
  async () => {
    const response =
      await api.get(
        "/pasien/dashboard"
      );

    return response.data.data;
  };