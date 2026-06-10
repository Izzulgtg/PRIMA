import api from "@/services/api";

export const getQueue = async () => {
  const response = await api.get(
    "/consultations/doctor-queue"
  );

  return response.data.data;
};

export const getConsultation = async (id) => {
  const response = await api.get(
    `/consultations/${id}`
  );

  return response.data.data;
};

export const getMessages = async (id) => {
  const response = await api.get(
    `/consultations/${id}/messages`
  );

  return response.data.data;
};

export const sendMessage = async (
  id,
  message
) => {
  const response = await api.post(
    `/consultations/${id}/messages`,
    {
      message,
    }
  );

  return response.data;
};

export const finishConsultation =
  async (id) => {
    const response =
      await api.patch(
        `/consultations/${id}/finish`
      );

    return response.data;
  };