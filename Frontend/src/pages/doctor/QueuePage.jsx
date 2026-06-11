// src/pages/doctor/QueuePage.jsx
import { useState } from "react";
import { UserCheck, CheckCircle2, UserMinus, X } from "lucide-react";

const initialQueue = [
  {
    id: 3,
    name: "Zaidan",
    age: 20,
    gender: "Pria",
    insurance: "BPJS Kesehatan",
    status: "Sedang Diperiksa",
    note: "Sakit kepala bagian belakang sejak tadi pagi, disertai mual.",
  },
  {
    id: 4,
    name: "Rifqi",
    age: 30,
    gender: "Pria",
    insurance: "Mandiri",
    status: "Menunggu",
    note: "Nyeri ulu hati dan mual sejak tadi malam.",
  },
  {
    id: 2,
    name: "Rafi",
    age: 20,
    gender: "Pria",
    insurance: "Asuransi Swasta",
    status: "Selesai",
    note: "Kontrol rutin diabetes melitus tipe 2.",
  },
];

export default function QueuePage() {
  const [queue, setQueue] = useState(initialQueue);
  const [filter, setFilter] = useState("Semua");
  
  // State untuk mengontrol kemunculan pop-up Modal Resume Rekam Medis
  const [selectedPatientResume, setSelectedPatientResume] = useState(null);

  // Mengatur urutan otomatis: yang berstatus "Selesai" otomatis bergeser ke baris paling bawah
  const sortQueue = (list) => {
    return [...list].sort((a, b) => {
      if (a.status === "Selesai" && b.status !== "Selesai") return 1;
      if (a.status !== "Selesai" && b.status === "Selesai") return -1;
      return 0;
    });
  };

  const filteredQueue = sortQueue(
    queue.filter((p) => filter === "Semua" || p.status === filter)
  );

  const summary = {
    Menunggu: queue.filter((p) => p.status === "Menunggu").length,
    "Sedang Diperiksa": queue.filter((p) => p.status === "Sedang Diperiksa").length,
    Selesai: queue.filter((p) => p.status === "Selesai").length,
  };

  // Fungsi Alur Tombol Utama (Panggil Pasien & Selesaikan Pemeriksaan)
  const handlePatientAction = (clickedPatient) => {
    let updatedQueue = [...queue];

    if (clickedPatient.status === "Menunggu") {
      // Jika ada pasien lain yang masih "Sedang Diperiksa", otomatis selesaikan dulu
      updatedQueue = updatedQueue.map((p) =>
        p.status === "Sedang Diperiksa" ? { ...p, status: "Selesai" } : p
      );
      // Ubah pasien yang diklik menjadi "Sedang Diperiksa"
      updatedQueue = updatedQueue.map((p) =>
        p.id === clickedPatient.id ? { ...p, status: "Sedang Diperiksa" } : p
      );
      setQueue(updatedQueue);
      alert(`${clickedPatient.name} telah dipanggil ke ruang periksa.`);

    } else if (clickedPatient.status === "Sedang Diperiksa") {
      // Ubah status pasien yang aktif diperiksa langsung menjadi Selesai
      updatedQueue = updatedQueue.map((p) =>
        p.id === clickedPatient.id ? { ...p, status: "Selesai" } : p
      );
      setQueue(updatedQueue);
      alert(`Pemeriksaan ${clickedPatient.name} berhasil disimpan dan dipindahkan ke riwayat selesai.`);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* 1. KARTU RINGKASAN DATA (SUMMARY) */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 rounded-lg bg-yellow-50 p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-sm text-[#7A7A7A]">Menunggu</p>
            <p className="text-xl font-semibold">{summary.Menunggu}</p>
          </div>
          <UserMinus className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="flex-1 rounded-lg bg-blue-50 p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-sm text-[#7A7A7A]">Sedang Diperiksa</p>
            <p className="text-xl font-semibold">{summary["Sedang Diperiksa"]}</p>
          </div>
          <UserCheck className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1 rounded-lg bg-green-50 p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-sm text-[#7A7A7A]">Selesai</p>
            <p className="text-xl font-semibold">{summary.Selesai}</p>
          </div>
          <CheckCircle2 className="w-6 h-6 text-green-400" />
        </div>
      </div>

      {/* 2. TOMBOL FILTER STATUS (SEARCH TENGAH KANAN SUDAH DIHAPUS) */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {["Semua", "Menunggu", "Sedang Diperiksa", "Selesai"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 rounded-full border text-sm font-medium ${
                filter === f
                  ? "bg-[#456955] text-white"
                  : "bg-white border-[#D9D9D9] text-[#4A4A4A]"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 3. DAFTAR ANTRIAN PASIEN */}
      <div className="space-y-3">
        {filteredQueue.map((p) => (
          <div
            key={p.id}
            className={`flex items-center justify-between bg-white rounded-lg p-4 shadow-sm ${
              p.status === "Sedang Diperiksa" ? "border-l-4 border-blue-400" :
              p.status === "Menunggu" ? "border-l-4 border-yellow-400" :
              "border-l-4 border-green-400"
            }`}
          >
            <div className="flex-1 flex items-center gap-4">
              <div className="bg-[#E0E6DC] p-4 rounded-lg text-sm font-semibold text-[#4A7C5E]">
                {`A-0${p.id}`}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">{`${p.age} thn • ${p.gender} • ${p.insurance}`}</p>
                <p className="text-sm italic text-gray-600">{`"${p.note}"`}</p>
              </div>
            </div>
            
            {/* AREA TOMBOL AKSI UTAMA */}
            <div className="flex gap-2">
              {p.status === "Menunggu" && (
                <button 
                  onClick={() => handlePatientAction(p)}
                  className="bg-white border border-[#456955] text-[#456955] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#456955] hover:text-white transition"
                >
                  Panggil Pasien
                </button>
              )}
              {p.status === "Sedang Diperiksa" && (
                <button 
                  onClick={() => handlePatientAction(p)}
                  className="bg-[#456955] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#365F41] transition"
                >
                  Selesaikan Pemeriksaan
                </button>
              )}
              {p.status === "Selesai" && (
                <button 
                  onClick={() => setSelectedPatientResume(p)}
                  className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Lihat Rekam Medis
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 4. MODAL POP-UP RESUME REKAM MEDIS SELESAI */}
      {selectedPatientResume && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[16px] p-6 shadow-xl border border-gray-100 relative">
            
            {/* Tombol Silang (X) Kanan Atas */}
            <button 
              onClick={() => setSelectedPatientResume(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>

            {/* Judul Modal */}
            <h3 className="text-[18px] font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4">
              Resume Rekam Medis Selesai
            </h3>

            {/* Data Detail Pasien */}
            <div className="space-y-4">
              <div>
                <p className="text-[12px] text-gray-400 font-semibold uppercase tracking-wider">Nama Pasien</p>
                <p className="text-[16px] font-bold text-gray-800">
                  {selectedPatientResume.name === "Rafi" ? "Ibu Maria Ulfa" : selectedPatientResume.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[12px] text-gray-400 font-semibold uppercase tracking-wider">Usia / Gender</p>
                  <p className="text-[14px] font-bold text-gray-700">
                    {selectedPatientResume.name === "Rafi" ? "62 Thn / Perempuan" : `${selectedPatientResume.age} Thn / ${selectedPatientResume.gender}`}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-gray-400 font-semibold uppercase tracking-wider">Waktu Selesai</p>
                  <p className="text-[14px] font-bold text-[#456955]">11:00 WIB</p>
                </div>
              </div>

              {/* Box Keluhan Akhir */}
              <div className="bg-[#ECE8DC]/30 border border-[#ECE8DC]/60 rounded-[12px] p-4 mt-2">
                <p className="text-[13px] font-bold text-[#456955] mb-1">Catatan Keluhan & Diagnosis Akhir:</p>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  {selectedPatientResume.name === "Rafi" 
                    ? "Pengecekan berkala kadar gula darah dan penyesuaian dosis insulin harian." 
                    : selectedPatientResume.note}
                </p>
              </div>
            </div>

            {/* Tombol Tutup Resume */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedPatientResume(null)}
                className="bg-[#456955] hover:bg-[#365F41] text-white font-bold text-[13px] px-5 py-2.5 rounded-[10px] transition shadow-xs"
              >
                Tutup Resume
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}