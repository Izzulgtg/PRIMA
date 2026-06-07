import api from "../api";

export const getProfile =
  async () => {
    const { data } =
      await api.get(
        "/pasien/profile"
      );

    return data.data;
  };

export const updateProfile =
  async (profileData) => {
    const { data } =
      await api.put(
        "/pasien/profile",
        profileData
      );

    return data;
  };

export const getCurrentUser =
  getProfile;