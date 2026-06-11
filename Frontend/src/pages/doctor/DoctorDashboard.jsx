import React, { useState } from "react";
import { 
  ChevronRight, 
  Trash2,
  FileText,
  ClipboardList,
  Plus
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
  const [historyDatabase, setHistoryDatabase] = useState({
    Zaki: [
      { date: "12/01/2024", diagnosis: "Diagnosis: Influenza", medicine: "Obat: Paracetamol", note: '"3 hari pusing dan hidung tersumbat"', type: "Umum" },
      { date: "05/11/2023", diagnosis: "Diagnosis: Gastritis Ringan", medicine: "Obat: Sanadol", note: "", type: "Umum" }
    ],
    Verdi: [
      { date: "10/02/2024", diagnosis: "Diagnosis: Hipertensi Primer", medicine: "Obat: Amlodipine 5mg", note: '"Kontrol rutin tekanan darah"', type: "Kontrol" }
    ],
    Riel: [
      { date: "14/12/2023", diagnosis: "Diagnosis: Abses Gigi", medicine: "Obat: Amoxicillin & Ibuprofen", note: '"Dirujuk ke poli gigi setelah bengkak reda"', type: "Umum" }
    ]
  });

  // --- STATE 4: FORM PEMERIKSAAN BARU & RESEP OBAT ---
  const [vitals, setVitals] = useState({ td: "120/80", suhu: "36.5", berat: "70" });
  const [mainDiagnosis, setMainDiagnosis] = useState("Diagnosis Batuk Berdahak");
  const [additionalNote, setAdditionalNote] = useState("");
  
  // Resep obat dimulai dari kondisi kosong bersih
  const [currentPrescription, setCurrentPrescription] = useState([]);
  // Input teks biasa untuk mengetik nama obat
  const [inputMedicineName, setInputMedicineName] = useState("");

  // --- FUNGSI MENGATUR URUTAN ANTREAN (Selesai pindah ke belakang) ---
  const sortPatientsQueue = (list) => {
    return [...list].sort((a, b) => {
      if (a.status === "Selesai" && b.status !== "Selesai") return 1;
      if (a.status !== "Selesai" && b.status === "Selesai") return -1;
      return 0;
    });
  };

  // --- LOGIKA 1: KLIK KARTU UNTUK MELIHAT DATA ---
  const handleSelectPatientCard = (patientName) => {
    setActivePatient(patientName);
  };

  // --- LOGIKA 2: AKSI UTAMA TOMBOL ANTRIAN (Panggil / Selesaikan) ---
  const handlePatientAction = (clickedPatient, e) => {
    e.stopPropagation(); 

    let updatedList = [...patients];

    if (clickedPatient.status === "Menunggu") {
      // Pasien lain yang tadinya sedang diperiksa otomatis diselesaikan & disimpan datanya
      const prevActiveIndex = updatedList.findIndex(p => p.status === "Sedang Diperiksa");
      if (prevActiveIndex !== -1) {
        const prevPatientName = updatedList[prevActiveIndex].name;
        executeSaveRecord(prevPatientName);
        updatedList[prevActiveIndex] = { ...updatedList[prevActiveIndex], status: "Selesai" };
      }

      // Ubah status pasien yang dipanggil menjadi Sedang Diperiksa
      updatedList = updatedList.map(p => 
        p.name === clickedPatient.name ? { ...p, status: "Sedang Diperiksa" } : p
      );

      const sortedList = sortPatientsQueue(updatedList);
      setPatients(sortedList);
      setActivePatient(clickedPatient.name);

    } else if (clickedPatient.status === "Sedang Diperiksa") {
      // Jika statusnya Sedang Diperiksa, tombol akan langsung menjalankan fungsi selesai
      handleSaveAndComplete();
    }
  };

  // --- LOGIKA 3: MANAJEMEN RESEP OBAT (HAPUS & TAMBAH VIA INPUT KETIK) ---
  const handleRemoveMedicine = (id) => {
    setCurrentPrescription(currentPrescription.filter(med => med.id !== id));
  };

  const handleAddMedicine = () => {
    if (!inputMedicineName.trim()) return;
    
    if (currentPrescription.some(med => med.name.toLowerCase() === inputMedicineName.trim().toLowerCase())) {
      alert("Obat ini sudah ditambahkan ke resep!");
      return;
    }

    const newMedicineItem = {
      id: Date.now(),
      name: inputMedicineName.trim()
    };

    setCurrentPrescription([...currentPrescription, newMedicineItem]);
    setInputMedicineName(""); 
  };

  // --- LOGIKA 4: SIMPAN REKAM MEDIS & UPDATE URUTAN ANTRIAN ---
  const executeSaveRecord = (targetPatient) => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const medicineNames = currentPrescription.map(m => m.name).join(", ");
    const medicineString = medicineNames ? `Obat: ${medicineNames}` : "Tidak ada resep obat";

    const newRecord = {
      date: formattedDate,
      diagnosis: mainDiagnosis,
      medicine: `Vitals: TD ${vitals.td} mmHg, Suhu ${vitals.suhu}°C, Berat ${vitals.berat} Kg • ${medicineString}`,
      note: additionalNote ? `"${additionalNote}"` : "",
      type: "Umum"
    };

    setHistoryDatabase(prev => ({
      ...prev,
      [targetPatient]: [newRecord, ...(prev[targetPatient] || [])]
    }));
  };

  const handleSaveAndComplete = () => {
    if (!activePatient) return;

    executeSaveRecord(activePatient);

    let updatedList = patients.map(p => 
      p.name === activePatient ? { ...p, status: "Selesai" } : p
    );

    const sortedList = sortPatientsQueue(updatedList);
    setPatients(sortedList);

    alert(`Data pemeriksaan ${activePatient} berhasil disimpan dan antrean digeser ke belakang.`);

    const nextPatient = sortedList.find(p => p.status === "Menunggu" || p.status === "Sedang Diperiksa");
    if (nextPatient) {
      setActivePatient(nextPatient.name);
    } else {
      setActivePatient("");
    }

    // Reset Form ke kondisi awal
    setVitals({ td: "120/80", suhu: "36.5", berat: "70" });
    setMainDiagnosis("Diagnosis Baru");
    setAdditionalNote("");
    setCurrentPrescription([]); 
    setInputMedicineName("");
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

        <div className="flex flex-col md:flex-row items-stretch justify-start gap-4 w-full">
          {patients.map((patient) => {
            const isCurrentActive = patient.status === "Sedang Diperiksa";
            const isSelectedToView = activePatient === patient.name;
            
            return (
              <div 
                key={patient.id} 
                onClick={() => handleSelectPatientCard(patient.name)}
                className={`flex-1 min-w-[240px] rounded-[16px] p-5 border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isCurrentActive 
                    ? "bg-white shadow-[0_4px_20px_rgba(107,143,113,0.08)] border-[#6B8F71]" 
                    : isSelectedToView
                    ? "bg-white border-[#6B8F71]/60 shadow-xs"
                    : patient.status === "Selesai"
                    ? "bg-gray-100/70 border-dashed border-gray-200 opacity-80"
                    : "bg-[#ECE8DC]/40 border-transparent hover:bg-[#ECE8DC]/60"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      isCurrentActive ? "bg-white border border-[#6B8F71] text-[#6B8F71]" : "bg-[#DCD7CD] text-gray-600"
                    }`}>
                      {patient.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isCurrentActive ? "bg-[#6B8F71] text-white" :
                      patient.status === "Menunggu" ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" : "bg-gray-200 text-gray-400"
                    }`}>
                      {patient.status}
                    </span>
                  </div>

                  <h3 className="text-[16px] font-bold text-[#1E1E1E] mb-1">
                    {patient.name} {isSelectedToView && <span className="text-[10px] text-[#6B8F71] font-normal">(Terpilih)</span>}
                  </h3>
                  <p className="text-[12px] text-gray-500 flex items-center gap-1.5 mb-4">
                    <FileText size={13} className="text-gray-400" /> {patient.complaint}
                  </p>
                </div>

                {/* AREA ACTION BUTTON */}
                <div className="mt-auto pt-2">
                  {patient.status === "Selesai" && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSelectPatientCard(patient.name); }}
                      className="w-full bg-gray-200/60 text-gray-500 text-[12px] font-bold py-2.5 rounded-[10px] hover:bg-gray-200 transition"
                    >
                      Buka Riwayat Medis
                    </button>
                  )}

                  {patient.status === "Menunggu" && (
                    <button 
                      onClick={(e) => handlePatientAction(patient, e)}
                      className="w-full border border-[#6B8F71] text-[#6B8F71] hover:bg-[#6B8F71]/5 text-[12px] font-bold py-2.5 rounded-[10px] transition"
                    >
                      Panggil Pasien
                    </button>
                  )}

                  {patient.status === "Sedang Diperiksa" && (
                    <button 
                      onClick={(e) => handlePatientAction(patient, e)}
                      className="w-full bg-[#6B8F71] text-white hover:bg-[#5a7a5f] text-[12px] font-bold py-2.5 rounded-[10px] flex items-center justify-center gap-1 transition shadow-xs"
                    >
                      Selesaikan Pemeriksaan <ChevronRight size={14} />
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
          
          <div className="space-y-3 overflow-y-auto max-h-[440px] pr-1">
            {activePatient && historyDatabase[activePatient]?.length > 0 ? (
              historyDatabase[activePatient].map((hist, index) => (
                <div key={index} className="bg-white rounded-[12px] p-4 shadow-2xs border border-gray-100">
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
              ))
            ) : (
              <p className="text-xs text-gray-400 italic text-center py-4">Belum ada riwayat medis terdahulu.</p>
            )}
          </div>
        </div>

        {/* PANEL KANAN: INPUT REKAM MEDIS BARU */}
        <div className="lg:col-span-7 bg-white rounded-[20px] p-5 space-y-4 shadow-2xs border border-[#EEEAE3]">
          <h3 className="text-[14px] font-bold text-[#6B8F71] border-b border-gray-100 pb-2">
            ✏️ Pemeriksaan Baru {activePatient ? `(${activePatient})` : ""}
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

          {/* RESEP OBAT (INPUT MANUAL KETIK & KOSONG DI AWAL) */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 block">Resep Obat</label>
            
            {/* Input ketik teks biasa */}
            <div className="flex gap-2 mb-3">
              <input 
                type="text"
                placeholder="Ketik nama obat di sini..."
                value={inputMedicineName}
                onChange={(e) => setInputMedicineName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddMedicine(); } }}
                className="flex-grow bg-[#F1EEE7]/50 border-0 rounded-[10px] px-4 py-2.5 text-[13px] font-semibold outline-none placeholder-gray-400"
              />
              <button 
                type="button"
                onClick={handleAddMedicine}
                className="bg-[#6B8F71] text-white p-2.5 rounded-[10px] hover:bg-[#5a7a5f] transition flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* List Tampilan Obat Hasil Input */}
            <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
              {currentPrescription.length > 0 ? (
                currentPrescription.map((med) => (
                  <div key={med.id} className="flex justify-between items-center bg-[#F1EEE7]/40 rounded-[10px] p-2.5 border border-gray-100/60">
                    <span className="text-[13px] font-bold text-gray-700">{med.name}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveMedicine(med.id)}
                      className="text-gray-400 hover:text-red-500 transition p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-[12px] text-gray-400 italic py-2 pl-1">Belum ada resep obat yang ditambahkan.</p>
              )}
            </div>
          </div>

          {/* ACTIONS UTAMA PANEL BAWAH */}
          <div className="pt-2">
            <button 
              onClick={handleSaveAndComplete}
              disabled={!activePatient}
              className={`w-full font-bold text-[13px] py-3 rounded-[10px] transition shadow-xs text-white ${
                activePatient ? "bg-[#6B8F71] hover:bg-[#5a7a5f]" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Simpan & Selesaikan Pemeriksaan
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}