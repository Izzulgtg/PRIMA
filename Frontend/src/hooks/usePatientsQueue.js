import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook untuk ambil antrian pasien
const usePatientsQueue = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi fetch data pasien
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/patients/queue"); // endpoint backend
      setPatients(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // useEffect untuk fetch saat mount dan polling setiap 30 detik
  useEffect(() => {
    fetchPatients();
    const interval = setInterval(fetchPatients, 30000);
    return () => clearInterval(interval);
  }, []);

  return { patients, loading, error, refetch: fetchPatients };
};

export default usePatientsQueue;