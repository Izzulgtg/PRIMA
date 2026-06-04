import api from "../api";

/**
 * Mengambil data profil user yang sedang login
 */
export const getProfile = async () => {
  const response = await api.get("/auth/profile");

  return response.data.data;
};

/**
 * Memperbarui data profil user
 */
export const updateProfile = async (profileData) => {
  const response = await api.put(
    "/auth/profile",
    profileData
  );

  return response.data;
};

/**
 * Alias untuk getProfile
 * Digunakan jika ada komponen lama yang masih memanggil getCurrentUser
 */
export const getCurrentUser = getProfile;