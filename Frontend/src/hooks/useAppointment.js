import { useState } from "react";
import { createAppointment } from "../services/patient/appointment-service";

export const useAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      setError(null);

      const result = await createAppointment(
        appointmentData
      );

      return result;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Gagal membuat appointment"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitAppointment,
  };
};