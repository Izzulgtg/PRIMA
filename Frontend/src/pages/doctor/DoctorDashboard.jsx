// File: src/pages/doctor/DoctorDashboard.jsx
import React from "react";
import PatientQueueCard from "../../components/doctor/PatientQueueCard";
import MedicalHistoryCard from "../../components/doctor/MedicalHistoryCard";
import NewExaminationCard from "../../components/doctor/NewExaminationCard";

export default function DoctorDashboard() {
  const mockQueue = [
    { id: 1, queueNumber: "A-03", name: "Zaki", status: "Sedang Diperiksa", complaint: "Batuk, pilek, demam" },
    { id: 2, queueNumber: "A-04", name: "Verdi", status: "Menunggu", complaint: "Tes Rutin" },
    { id: 3, queueNumber: "A-02", name: "Rafi", status: "Selesai", complaint: "Kontrol" },
    { id: 4, queueNumber: "A-05", name: "Sarah", status: "Menunggu", complaint: "Demam ringan" },
  ];

  const mockHistory = [
    { date: "12/01/2024", type: "Umum", diagnosis: "Influenza", medicine: "Paracetamol", notes: "3 hari pusing dan hidung tersumbat" },
    { date: "05/11/2023", type: "Umum", diagnosis: "Gastritis Ringan", medicine: "Panadol" },
    { date: "20/08/2023", type: "Kontrol", diagnosis: "Check-up Tahunan", medicine: "—", notes: "Tekanan Darah Rendah, Kolesterol sedikit tinggi" },
  ];

  const handleQueueAction = (id) => console.log("Action for patient:", id);

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Antrian Pasien horizontal */}
      <div>
        <h2 className="text-lg font-semibold text-[#1E1E1E] mb-4">Antrian Pasien</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {mockQueue.map((p) => (
            <PatientQueueCard key={p.id} patient={p} onActionClick={handleQueueAction} />
          ))}

          {/* Tombol Antrian Selanjutnya */}
          <div className="min-w-[240px] flex items-center justify-center bg-[#EDE8DC] rounded-xl shadow px-4">
            <button className="px-4 py-2 bg-[#6B8F71] text-white rounded-lg hover:bg-[#57785c]">
              Antrian Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Riwayat Medis + Pemeriksaan Baru */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-[#1E1E1E] mb-4">Riwayat Medis (Nama Pasien)</h2>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto bg-[#F5F0E8] p-4 rounded-xl">
            {mockHistory.map((r, idx) => (
              <MedicalHistoryCard key={idx} record={r} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#1E1E1E] mb-4">Pemeriksaan Baru</h2>
          <div className="bg-white p-6 rounded-xl shadow">
            <NewExaminationCard patient={{ id: 1 }} />
          </div>
        </div>
      </div>

    </div>
  );
}