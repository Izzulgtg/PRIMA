import api from "../api";

export const getMedicalHistory = async (
  pasienId
) => {
  const response = await api.get(
    `/pasien/riwayat/${pasienId}`
  );

  return response.data.data;
};