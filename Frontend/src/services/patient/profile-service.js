import api from "../api"

export const getProfile = async () => {
  const response = await api.get("/auth/profile")
  console.log("PROFILE RESPONSE:", response.data);
  return response.data.data
}

export const updateProfile = async (profileData) => {
  const response = await api.put(
    "/auth/profile",
    profileData
  )

  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get("/auth/profile")
  return response.data.data
}