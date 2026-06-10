import React, { useState } from "react";
import { 
  ChevronRight, 
  Trash2,
  FileText,
  ClipboardList
} from "lucide-react";

export default function DoctorDashboard() {
  // --- STATE 1: DAFTAR ANTRIAN PASIEN ---
  const [patients, setPatients] = useState([
    { id: "02", name: "Zaki", complaint: "Batuk, pilek, demam", status: "Sedang Diperiksa" },
    { id: "03", name: "Verdi", complaint: "Tes Rutin", status: "Menunggu" },
    { id: "01", name: "Riel", complaint: "Kontrol", status: "Selesai" },
  ]);

  // --- STATE 2: PASIEN YANG SEDANG AKTIF ---
  const [activePatient, setActivePatient] = useState("Zaki");

  // --- STATE 3: DATABASE RIWAYAT MEDIS PASIEN ---
  const historyDatabase = {
    Zaki: [
      { date: "12/01/2024", diagnosis: "Diagnosis: Influenza", medicine: "Obat: Paracetamol", note: '"3 hari pusing dan hidung tersumbat"', type: "Umum" },
      { date: "05/11/2023", diagnosis: "Diagnosis: Gastritis Ringan", medicine: "Obat: Sanadol", note: "", type: "Umum" },
      { date: "20/08/2023", diagnosis: "Diagnosis: Check-up Tahunan", medicine: "Hasil: Tekanan Darah Rendah, Kolesterol sedikit tinggi.", type: "Kontrol" }
    ],
    Verdi: [
      { date: "10/02/2024", diagnosis: "Diagnosis: Hipertensi Primer", medicine: "Obat: Amlodipine 5mg", note: '"Kontrol rutin tekanan darah"', type: "Kontrol" }
    ],
    Riel: [
      { date: "14/12/2023", diagnosis: "Diagnosis: Abses Gigi", medicine: "Obat: Amoxicillin & Ibuprofen", note: '"Dirujuk ke poli gigi setelah bengkak reda"', type: "Umum" }
    ]
  };

  // --- STATE 4: FORM PEMERIKSAAN BARU ---
  const [vitals, setVitals] = useState({ td: "120/80", suhu: "36.5", berat: "70" });
  const [mainDiagnosis, setMainDiagnosis] = useState("Diagnosis Batuk Berdahak");
  const [additionalNote, setAdditionalNote] = useState("");

  // --- LOGIKA UTAMA: ESTAFET ANTREAN & PERUBAHAN STATUS ---
  const handlePatientAction = (clickedPatient) => {
    let updatedList = [...patients];

    if (clickedPatient.status === "Menunggu") {
      const prevActiveIndex = updatedList.findIndex(p => p.status === "Sedang Diperiksa");
      if (prevActiveIndex !== -1) {
        updatedList[prevActiveIndex] = { ...updatedList[prevActiveIndex], status: "Selesai" };
      }

      updatedList = updatedList.map(p => 
        p.name === clickedPatient.name ? { ...p, status: "Sedang Diperiksa" } : p
      );

      setPatients(updatedList);
      setActivePatient(clickedPatient.name);

    } else if (clickedPatient.status === "Sedang Diperiksa") {
      updatedList = updatedList.map(p => 
        p.name === clickedPatient.name ? { ...p, status: "Selesai" } : p
      );

      setPatients(updatedList);
      
      const nextPatient = updatedList.find(p => p.status === "Menunggu");
      setActivePatient(nextPatient ? nextPatient.name : "");
    }
  };

  return (
    <div className="w-full space-y-6 flex flex-col items-stretch justify-start">
      
      {/* 1. SEKSI ANTRIAN PASIEN */}
      <section className="space-y-3 w-full flex flex-col items-stretch">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-[16px] font-bold text-[#6B8F71] tracking-tight flex items-center gap-2">
            <ClipboardList size={18} className="text-[#6B8F71]" /> Antrian Pasien
          </h2>
          <button className="text-[12px] font-bold text-[#6B8F71] flex items-center gap-0.5 hover:underline">
            Lihat Semua <ChevronRight size={14} />
          </button>
        </div>

        {/* CONTAINER UTAMA KARTU ANTRIAN (DARI KIRI KE KANAN & MELEBAR PENUH) */}
        <div className="flex flex-col md:flex-row items-stretch justify-start gap-4 w-full">
          {patients.map((patient) => {
            const isCurrentActive = patient.status === "Sedang Diperiksa";
            
            return (
              <div 
                key={patient.id} 
                className={`flex-1 min-w-[240px] rounded-[16px] p-5 border border-transparent transition-all duration-300 flex flex-col justify-between ${
                  isCurrentActive 
                    ? "bg-white shadow-[0_4px_20px_rgba(107,143,113,0.08)] ring-1 ring-[#6B8F71]/10" 
                    : "bg-[#ECE8DC]/40"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      isCurrentActive ? "bg-[#E8F0E9] text-[#6B8F71]" : "bg-[#DCD7CD] text-gray-600"
                    }`}>
                      {patient.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isCurrentActive ? "bg-[#6B8F71] text-white" :
                      patient.status === "Menunggu" ? "bg-gray-200 text-gray-500" : "bg-[#DCD7CD]/50 text-gray-400"
                    }`}>
                      {patient.status}
                    </span>
                  </div>

                  <h3 className="text-[16px] font-bold text-[#1E1E1E] mb-1">{patient.name}</h3>
                  <p className="text-[12px] text-gray-500 flex items-center gap-1.5 mb-4">
                    <FileText size={13} className="text-gray-400" /> {patient.complaint}
                  </p>
                </div>

                {/* ACTION BUTTON */}
                <div className="mt-auto pt-2">
                  {patient.status === "Selesai" && (
                    <button disabled className="w-full bg-[#DCD7CD]/40 text-gray-400 text-[12px] font-bold py-2.5 rounded-[10px] cursor-not-allowed">
                      Terperiksa
                    </button>
                  )}

                  {patient.status === "Menunggu" && (
                    <button 
                      onClick={() => handlePatientAction(patient)}
                      className="w-full border border-[#6B8F71] text-[#6B8F71] hover:bg-[#6B8F71]/5 text-[12px] font-bold py-2.5 rounded-[10px] transition"
                    >
                      Panggil Pasien
                    </button>
                  )}

                  {patient.status === "Sedang Diperiksa" && (
                    <button 
                      onClick={() => handlePatientAction(patient)}
                      className="w-full bg-[#6B8F71] text-white hover:bg-[#5a7a5f] text-[12px] font-bold py-2.5 rounded-[10px] flex items-center justify-center gap-1 transition shadow-xs"
                    >
                      Periksa Sekarang <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. AREA REKAM MEDIS & FORM PEMERIKSAAN BARU */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start w-full">
        
        {/* PANEL KIRI: LIST RIWAYAT MEDIS */}
        <div className="lg:col-span-5 bg-[#ECE8DC]/40 rounded-[20px] p-5 flex flex-col space-y-4 border border-[#EEEAE3]">
          <h3 className="text-[14px] font-bold text-gray-700">
            Riwayat Medis ({activePatient || "Tidak ada"})
          </h3>
          
          <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
            {activePatient && historyDatabase[activePatient]?.map((hist, index) => (
              <div key={index} className="bg-white rounded-[12px] p-4 shadow-2xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-extrabold text-[#6B8F71]">{hist.date}</span>
                  <span className="text-[9px] font-bold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md">{hist.type}</span>
                </div>
                <h4 className="text-[13px] font-bold text-gray-800 leading-snug">{hist.diagnosis}</h4>
                <p className="text-[11px] text-gray-500 mt-1">{hist.medicine}</p>
                {hist.note && (
                  <p className="text-[11px] text-gray-400 italic mt-2 bg-gray-50 p-2 rounded-lg border-l-2 border-[#6B8F71]/20">
                    {hist.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PANEL KANAN: INPUT REKAM MEDIS BARU */}
        <div className="lg:col-span-7 bg-white rounded-[20px] p-5 space-y-4 shadow-2xs border border-[#EEEAE3]">
          <h3 className="text-[14px] font-bold text-[#6B8F71] border-b border-gray-100 pb-2">
            ✏️ Pemeriksaan Baru
          </h3>

          {/* VITAL SIGNS */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-gray-400 block mb-1">TD (mmHg)</label>
              <input 
                type="text" 
                value={vitals.td} 
                onChange={(e) => setVitals({...vitals, td: e.target.value})} 
                className="w-full bg-[#F1EEE7]/50 border-0 rounded-[10px] p-2.5 text-center text-[13px] font-bold outline-none" 
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400 block mb-1">Suhu (°C)</label>
              <input 
                type="text" 
                value={vitals.suhu} 
                onChange={(e) => setVitals({...vitals, suhu: e.target.value})} 
                className="w-full bg-[#F1EEE7]/50 border-0 rounded-[10px] p-2.5 text-center text-[13px] font-bold outline-none" 
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400 block mb-1">Berat (Kg)</label>
              <input 
                type="text" 
                value={vitals.berat} 
                onChange={(e) => setVitals({...vitals, berat: e.target.value})} 
                className="w-full bg-[#F1EEE7]/50 border-0 rounded-[10px] p-2.5 text-center text-[13px] font-bold outline-none" 
              />
            </div>
          </div>

          {/* DIAGNOSIS UTAMA */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 block mb-1">Diagnosis Utama</label>
            <input 
              type="text" 
              value={mainDiagnosis} 
              onChange={(e) => setMainDiagnosis(e.target.value)} 
              className="w-full bg-[#F1EEE7]/50 border-0 rounded-[10px] p-3 text-[13px] font-semibold outline-none" 
            />
          </div>

          {/* CATATAN TAMBAHAN */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 block mb-1">Catatan Tambahan</label>
            <textarea 
              rows="2" 
              value={additionalNote} 
              onChange={(e) => setAdditionalNote(e.target.value)} 
              className="w-full bg-[#F1EEE7]/50 border-0 rounded-[10px] p-3 text-[13px] outline-none resize-none" 
            />
          </div>

          {/* RESEP OBAT */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 block mb-1">Resep Obat</label>
            <div className="flex justify-between items-center bg-[#F1EEE7]/50 rounded-[10px] p-3">
              <span className="text-[13px] font-bold text-gray-700">Antangin</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-[#6B8F71] font-extrabold bg-[#E8F0E9] px-2 py-0.5 rounded-md">
                  ✓ Tersedia (24)
                </span>
                <button className="text-gray-400 hover:text-red-500 transition"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-1">
            <button 
              onClick={() => handlePatientAction({ name: activePatient, status: "Sedang Diperiksa" })}
              className="flex-grow bg-[#6B8F71] hover:bg-[#5a7a5f] text-white font-bold text-[13px] py-3 rounded-[10px] transition shadow-xs"
            >
              Simpan & Selesaikan
            </button>
            <button className="border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold text-[13px] py-3 px-4 rounded-[10px] transition">
              Simpan Draft
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}