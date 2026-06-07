import api from "../api";

export const getMedicalHistory = async () => {
  const { data } = await api.get("/pasien/riwayat");
  return data.data;
};