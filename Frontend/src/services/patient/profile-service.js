import api from "../api";

export const getProfile = async () => {
  const { data } = await api.get(
    "/auth/me"
  );

  return data.data;
};

export const updateProfile = async (
  profileData
) => {
  const { data } = await api.put(
    "/auth/me",
    profileData
  );

  return data;
};

export const getCurrentUser =
  getProfile;