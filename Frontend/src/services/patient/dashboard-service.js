import api from "../api";

export const getDashboard =
  async () => {
    try {
      const { data } =
        await api.get(
          "/pasien/dashboard"
        );

      return data.data;
    } catch (error) {
      console.error(
        "Gagal mengambil dashboard",
        error
      );

      throw error;
    }
  };