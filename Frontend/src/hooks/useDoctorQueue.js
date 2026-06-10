import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useDoctorQueue(dokterId) {
  const [patients, setPatients] = useState([]);
  const [activePatient, setActivePatient] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Ambil data antrean dari backend
  const fetchQueue = useCallback(async () => {
    if (!dokterId) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/dokter/antrean/${dokterId}`);
      setPatients(response.data);
      
      const currentActive = response.data.find(p => p.status === "Sedang Diperiksa");
      setActivePatient(currentActive || null);
    } catch (error) {
      console.error("Gagal mengambil data antrean:", error);
    } finally {
      setLoading(false);
    }
  }, [dokterId]);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  // 2. Fungsi estafet status antrean biasa
  const handlePatientAction = async (clickedPatient) => {
    try {
      if (clickedPatient.status === "Menunggu" && activePatient) {
        await axios.put(`http://localhost:5000/api/dokter/antrean/${activePatient.pendaftaran_id}/status`, {
          status: "Selesai"
        });
      }

      const nextStatus = clickedPatient.status === "Sedang Diperiksa" ? "Selesai" : "Sedang Diperiksa";

      await axios.put(`http://localhost:5000/api/dokter/antrean/${clickedPatient.pendaftaran_id}/status`, {
        status: nextStatus
      });

      await fetchQueue();
    } catch (error) {
      console.error("Gagal memperbarui status antrean:", error);
    }
  };

  // 🔥 3. FUNGSI BARU: SIMPAN REKAM MEDIS & SELESAIKAN ANTREAN DI DATABASE
  const saveExamination = async (pendaftaranId, examinationData) => {
    try {
      // A. Kirim data pemeriksaan fisik dan diagnosis ke tabel rekam medis backend
      // (Sesuaikan URL endpoint rekam medis/pemeriksaan milik backend-mu jika berbeda)
      await axios.post(`http://localhost:5000/api/dokter/rekam-medis`, {
        pendaftaran_id: pendaftaranId,
        tensi: examinationData.tensi,
        suhu: examinationData.suhu,
        berat_badan: examinationData.berat_badan,
        diagnosis: examinationData.diagnosis,
        catatan: examinationData.catatan,
      });

      // B. Setelah rekam medis tersimpan, ubah status antrean pasien tersebut menjadi 'Selesai'
      await axios.put(`http://localhost:5000/api/dokter/antrean/${pendaftaranId}/status`, {
        status: "Selesai"
      });

      // C. Refresh data dari database agar PatientCard & Dashboard langsung sinkron otomatis
      await fetchQueue();
      return true;
    } catch (error) {
      console.error("Gagal menyimpan rekam medis ke backend:", error);
      return false;
    }
  };

  return { 
    patients, 
    activePatient, 
    handlePatientAction, 
    saveExamination, // <-- Kita ekspos fungsi baru ini agar bisa dipakai di Dashboard
    loading, 
    refreshQueue: fetchQueue 
  };
}