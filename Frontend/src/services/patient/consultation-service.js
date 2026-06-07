import api from "../api";

/*
|--------------------------------------------------------------------------
| STATUS KONSULTASI
|--------------------------------------------------------------------------
*/

export const getSessionStatus =
  async (sessionId) => {
    const response =
      await api.get(
        `/consultations/${sessionId}/status`
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| DETAIL KONSULTASI
|--------------------------------------------------------------------------
*/

export const getSessionDetail =
  async (sessionId) => {
    const response =
      await api.get(
        `/consultations/${sessionId}`
      );

    return response.data.data;
  };

/*
|--------------------------------------------------------------------------
| PESAN KONSULTASI
|--------------------------------------------------------------------------
*/

export const getMessages =
  async (sessionId) => {
    const response =
      await api.get(
        `/consultations/${sessionId}/messages`
      );

    return response.data.data;
  };

/*
|--------------------------------------------------------------------------
| KIRIM PESAN
|--------------------------------------------------------------------------
*/

export const sendMessage =
  async (
    sessionId,
    message
  ) => {
    const response =
      await api.post(
        `/consultations/${sessionId}/messages`,
        {
          message,
        }
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| ANTRIAN KONSULTASI
|--------------------------------------------------------------------------
*/

export const getQueue =
  async () => {
    const response =
      await api.get(
        "/consultations/queue"
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| FINISH CONSULTATION
|--------------------------------------------------------------------------
*/

export const finishConsultation =
  async (sessionId) => {
    const response =
      await api.patch(
        `/consultations/${sessionId}/finish`
      );

    return response.data;
  };