import api from "../api";

export const getSessionStatus = async (sessionId) => {
  const response = await api.get(
    `/consultations/${sessionId}/status`
  );

  return response.data;
};

export const getMessages = async (sessionId) => {
  const response = await api.get(
    `/consultations/${sessionId}/messages`
  );

  return response.data;
};

export const sendMessage = async (
  sessionId,
  message
) => {
  const response = await api.post(
    `/consultations/${sessionId}/messages`,
    {
      message,
    }
  );

  return response.data;
};

export const getQueue = async () => {
  const response = await api.get(
    "/consultations/queue"
  );

  return response.data;
};

/**
 * Ambil detail sesi konsultasi
 */
export const getSessionDetail = async (
  sessionId
) => {
  const response = await api.get(
    `/consultations/${sessionId}`
  );

  return response.data;
};