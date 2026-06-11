// src/pages/doctor/SchedulePage.jsx
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import api from "../../services/api"; 

const weekSummary = [
  { date: "Sel, 30 Apr", progress: "85%", slots: "10/12" },
  { date: "Rab, 01 Mei", progress: "LIBUR", slots: "" },
  { date: "Kam, 02 Mei", progress: "LIBUR", slots: "" },
  { date: "Jum, 03 Mei", progress: "LIBUR", slots: "" },
  { date: "Sab, 04 Mei", progress: "40%", slots: "4/10" },
  { date: "Min, 05 Mei", progress: "10%", slots: "1/10" },
];

export default function SchedulePage() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // State Form Input Utama
  const [scheduleType, setScheduleType] = useState("Satu Hari"); 
  const [selectedDays, setSelectedDays] = useState([]);
  const [singleDate, setSingleDate] = useState(""); // State baru untuk menangani tanggal input 'Satu Hari'
  const [visitType, setVisitType] = useState("Keduanya");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("08:30");
  const [quota, setQuota] = useState(1);
  const [keterangan, setKeterangan] = useState("Prioritas pasien kontrol rutin");
  const [statusSlot, setStatusSlot] = useState("Buka");

  // ID Dokter Fallback
  const DOKTER_ID = 2; 

  // Mapping nama hari singkat ke indeks hari JavaScript (0 = Minggu, 1 = Senin, dst)
  const dayMap = { "Min": 0, "Sen": 1, "Sel": 2, "Rab": 3, "Kam": 4, "Jum": 5, "Sab": 6 };

  // Fungsi utilitas mencari tanggal terdekat berdasarkan hari yang dipilih
  const getNextDateForDay = (dayStr) => {
    const targetDayIndex = dayMap[dayStr];
    const today = new Date();
    const currentDayIndex = today.getDay();
    let distance = targetDayIndex - currentDayIndex;
    if (distance < 0) distance += 7; // Jika hari sudah lewat, geser ke minggu depan
    today.setDate(today.getDate() + distance);
    return today.toISOString().split('T')[0]; // Return format YYYY-MM-DD
  };

  // =========================================================================
  // 1. GET: AMBIL DATA JADWAL SLOT
  // =========================================================================
  const fetchSlots = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/dokter/schedule/slots/${DOKTER_ID}`);
      if (response.data.success) {
        // Pemetaan struktur response database ke visual UI
        const formatted = response.data.data.map(slot => ({
          id: slot.id,
          time: `${slot.jam_mulai.slice(0, 5)} - ${slot.jam_selesai.slice(0, 5)}`,
          patient: slot.status === 'tutup' ? "Slot Nonaktif" : `Slot Tersedia (Kuota: ${slot.kuota})`,
          type: slot.tipe_kunjungan === "keduanya" ? ["Tatap Muka", "Daring"] : (slot.tipe_kunjungan === "tatap_muka" ? "Tatap Muka" : "Daring"),
          status: slot.status === 'tutup' ? "Tutup" : "Buka",
          button: slot.status === 'tutup' ? "Buka Slot" : (slot.tipe_kunjungan === "tatap_muka" ? "Lanjut Periksa" : "Panggil"),
          bg: slot.status === 'tutup' ? "bg-[#FFEAEA]" : (slot.tipe_kunjungan === "tatap_muka" ? "bg-[#F1F9F5]" : "bg-[#E8F4FF]"),
          border: slot.status === 'tutup' ? "border-[#F5C6C6]" : (slot.tipe_kunjungan === "tatap_muka" ? "border-[#E2E8ED]" : "border-[#D9EFFF]"),
          kuota: slot.kuota,
          keterangan: slot.keterangan,
          tanggal: slot.tanggal ? slot.tanggal.slice(0, 10) : ""
        }));
        setSlots(formatted);
      }
    } catch (error) {
      console.error("Gagal mengambil data slot jadwal:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Populasikan data saat modal edit terbuka
  const openEditModal = (slot) => {
    setSelectedSlot(slot);
    const times = slot.time.split(" - ");
    setStartTime(times[0]);
    setEndTime(times[1]);
    setVisitType(Array.isArray(slot.type) ? "Keduanya" : slot.type);
    setQuota(slot.kuota || 1);
    setKeterangan(slot.keterangan || "");
    setStatusSlot(slot.status === "Tutup" ? "Tutup" : "Buka");
    setShowEditModal(true);
  };

  // =========================================================================
  // 2. POST: SINKRONISASI TAMBAH JADWAL SLOT BARU
  // =========================================================================
  const handleAddSlot = async () => {
    try {
      // Menyelaraskan string Tipe Kunjungan dengan ENUM Database
      let dbVisitType = "keduanya";
      if (visitType === "Tatap Muka") dbVisitType = "tatap_muka";
      if (visitType === "Daring") dbVisitType = "daring";

      // Jika memilih tipe Satu Hari
      if (scheduleType === "Satu Hari") {
        if (!singleDate) return alert("Silakan tentukan tanggal sesi terlebih dahulu!");
        
        const payload = {
          dokter_id: DOKTER_ID,
          tanggal: singleDate,
          jam_mulai: startTime,
          jam_selesai: endTime,
          tipe_kunjungan: dbVisitType,
          kuota: quota,
          keterangan: keterangan || null,
          status: statusSlot.toLowerCase() // 'buka' atau 'tutup'
        };

        const response = await api.post("/dokter/schedule/slots", payload);
        if (response.data.success) alert("Slot jadwal harian berhasil disimpan!");
      } 
      // Jika memilih tipe Berulang (Multi Days)
      else {
        if (selectedDays.length === 0) return alert("Silakan pilih minimal satu hari!");
        
        // Looping untuk menembak query insert per hari yang dipilih ke DB
        for (const day of selectedDays) {
          const calculatedDate = getNextDateForDay(day);
          const payload = {
            dokter_id: DOKTER_ID,
            tanggal: calculatedDate,
            jam_mulai: startTime,
            jam_selesai: endTime,
            tipe_kunjungan: dbVisitType,
            kuota: quota,
            keterangan: keterangan || null,
            status: statusSlot.toLowerCase()
          };
          await api.post("/dokter/schedule/slots", payload);
        }
        alert("Semua slot jadwal berulang berhasil disimpan!");
      }

      fetchSlots(); 
      setShowAddModal(false);
      // Reset Form State
      setSingleDate("");
      setSelectedDays([]);
      setVisitType("Keduanya");
    } catch (error) {
      console.error("Gagal menambah slot:", error);
      alert(error.response?.data?.message || "Terjadi kesalahan server saat menyimpan data slot.");
    }
  };

 // =========================================================================
  // 3. PUT: UPDATE DATA JADWAL SLOT (Sudah Disinkronkan dengan Backend)
  // =========================================================================
  const handleUpdateSlot = async () => {
    try {
      let dbVisitType = "keduanya";
      if (visitType === "Tatap Muka") dbVisitType = "tatap_muka";
      if (visitType === "Daring") dbVisitType = "daring";

      // Ubah nama properti di sini agar pas dengan destrukturisasi database backend
      const payload = {
        jam_mulai: startTime,
        jam_selesai: endTime,
        tipe_kunjungan: dbVisitType,
        kuota: quota,
        keterangan: keterangan || null,
        status: statusSlot.toLowerCase() // menghasilkan string 'buka' atau 'tutup'
      };

      const response = await api.put(`/dokter/schedule/slots/${selectedSlot.id}`, payload);
      if (response.data.success) {
        alert("Slot jadwal berhasil diperbarui!");
        fetchSlots();
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Gagal memperbarui slot:", error);
      alert(error.response?.data?.message || "Gagal mengubah data slot.");
    }
  };

  // =========================================================================
  // 4. DELETE: HAPUS JADWAL SLOT
  // =========================================================================
  const handleDeleteSlot = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus permanen slot jadwal ini?")) return;
    try {
      const response = await api.delete(`/dokter/schedule/slots/${id}`);
      if (response.data.success) {
        fetchSlots();
        if (showEditModal) setShowEditModal(false);
      }
    } catch (error) {
      console.error("Gagal menghapus slot:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col px-8 py-7 space-y-6 bg-[#F7F3EB] min-h-screen">  
        <div className="flex gap-4">
          {/* Bagian Kiri: Kalender Ringkasan */}
          <div className="flex flex-col gap-4 w-[220px]">
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="font-semibold mb-2 text-[14px]">Kalender Kerja</h3>
              <div className="grid grid-cols-7 gap-1 text-[12px] text-center text-gray-600">
                <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                {[...Array(30).keys()].map((i) => (
                  <div key={i} className={`p-1 rounded ${i + 1 === 11 ? "bg-[#C9E4C5] font-semibold" : ""}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow-md text-center">
              <h3 className="text-[12px] text-gray-500 mb-2">Ringkasan Sesi</h3>
              <div className="grid grid-cols-3 gap-2 text-[12px] font-semibold">
                <div><p className="text-[16px]">20</p><p className="text-gray-500 text-[10px]">Hari Kerja</p></div>
                <div><p className="text-[16px]">{slots.length}</p><p className="text-gray-500 text-[10px]">Total Slot</p></div>
                <div><p className="text-[16px]">0</p><p className="text-gray-500 text-[10px]">Booking</p></div>
              </div>
            </div>
          </div>

          {/* Bagian Kanan: List Slot Jadwal Dokter */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-end items-center mb-4 gap-4">
              <button
                className="px-4 py-2 bg-[#456955] text-white rounded text-[12px] font-medium"
                onClick={() => { setStatusSlot("Buka"); setQuota(1); setKeterangan(""); setShowAddModal(true); }}
              >
                + Tambah Slot Baru
              </button>
            </div>

            {loading ? (
              <p className="text-center text-gray-500 text-sm py-10">Memuat data dari database...</p>
            ) : slots.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-10 bg-white rounded-xl border border-dashed">Belum ada jadwal dokter aktif yang terdaftar.</p>
            ) : (
              slots.map((s) => (
                <div key={s.id} className={`flex justify-between items-center rounded border ${s.border} ${s.bg} p-4`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-semibold text-[#1E1E1E]">{s.time}</p>
                      {s.tanggal && <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">{s.tanggal}</span>}
                    </div>
                    <p className="text-[15px] font-bold text-gray-700">{s.patient}</p>
                    <div className="flex gap-1 mt-1">
                      {Array.isArray(s.type) ? (
                        s.type.map((t, i) => (
                          <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[11px] font-medium">{t}</span>
                        ))
                      ) : (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-medium">{s.type}</span>
                      )}
                      {s.status === "Tutup" && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-[11px] font-medium ml-1">Nonaktif</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className={`px-3 py-1 rounded text-[11px] font-semibold ${s.status === "Tutup" ? "bg-gray-200 text-gray-600" : "bg-[#456955] text-white"}`}>
                      {s.button}
                    </button>
                    <button onClick={() => openEditModal(s)} className="text-gray-500 hover:text-black text-sm">✏️</button>
                    <button onClick={() => handleDeleteSlot(s.id)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Ringkasan Mingguan */}
        <div className="grid grid-cols-6 gap-2 mt-4">
          {weekSummary.map((w, i) => (
            <div key={i} className="p-3 bg-[#F7F6F4] rounded text-center text-[12px]">
              <p>{w.date}</p>
              <p className={w.progress === "LIBUR" ? "text-red-500 font-semibold" : "font-bold"}>{w.progress}</p>
              {w.slots && <p className="text-[10px] text-gray-500">{w.slots} Slot</p>}
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MODAL TAMBAH SLOT 
          ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-[20px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EDE8DC] px-6 py-5">
              <h2 className="text-sm font-medium text-[#1E1E1E]">Tambah Slot Jadwal Baru</h2>
              <button onClick={() => setShowAddModal(false)} className="text-xl text-[#6B7280]">×</button>
            </div>

            <div className="p-5">
              {/* Tipe Penjadwalan */}
              <div className="mb-5 flex rounded-xl bg-[#F5F0E8] p-1">
                <button 
                  onClick={() => setScheduleType("Satu Hari")}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${scheduleType === "Satu Hari" ? "bg-white shadow-sm" : "text-[#6B7280]"}`}
                >
                  Satu Hari
                </button>
                <button 
                  onClick={() => setScheduleType("Berulang")}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${scheduleType === "Berulang" ? "bg-white shadow-sm" : "text-[#6B7280]"}`}
                >
                  Berulang
                </button>
              </div>

              {/* INPUT TANGGAL MANDATORI UNTUK TIPE 'SATU HARI' */}
              {scheduleType === "Satu Hari" && (
                <div className="mb-4">
                  <label className="mb-2 block text-xs font-semibold text-gray-700">Pilih Tanggal Sesi</label>
                  <input 
                    type="date" 
                    value={singleDate} 
                    onChange={(e) => setSingleDate(e.target.value)} 
                    className="w-full rounded-xl border border-[#EDE8DC] bg-[#F5F0E8] px-4 py-3 outline-none font-mono" 
                  />
                </div>
              )}

              {/* Pilihan Hari jika Berulang */}
              {scheduleType === "Berulang" && (
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold text-gray-700">Pilih Hari Berulang Sesi Terdekat</p>
                  <div className="flex flex-wrap gap-2">
                    {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`rounded-lg px-4 py-2 text-xs font-medium transition ${selectedDays.includes(day) ? "bg-[#6B8F71] text-white" : "bg-[#ECE8E0] text-[#1E1E1E]"}`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Jam */}
              <div className="mb-5 grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-xs text-[#6B7280]">Jam Mulai</label>
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-xl border border-[#EDE8DC] bg-[#F5F0E8] px-4 py-3 outline-none" />
                </div>
                <div>
                  <label className="mb-2 block text-xs text-[#6B7280]">Jam Selesai</label>
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-xl border border-[#EDE8DC] bg-[#F5F0E8] px-4 py-3 outline-none" />
                </div>
              </div>

              {/* Kuota & Keterangan Tambahan */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="mb-1 block text-xs text-[#6B7280]">Kuota Sesi</label>
                  <input type="number" min="1" value={quota} onChange={(e) => setQuota(parseInt(e.target.value) || 1)} className="w-full rounded-xl border border-[#EDE8DC] bg-[#F5F0E8] px-4 py-2.5 outline-none" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-[#6B7280]">Catatan Medis</label>
                  <input type="text" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} className="w-full rounded-xl border border-[#EDE8DC] bg-[#F5F0E8] px-4 py-2.5 outline-none" />
                </div>
              </div>

              {/* Tipe Kunjungan */}
              <div className="mb-5">
                <p className="mb-3 text-xs font-semibold text-gray-700">Tipe Kunjungan</p>
                <div className="grid grid-cols-3 gap-3">
                  {["Tatap Muka", "Daring", "Keduanya"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setVisitType(item)}
                      className={`rounded-xl border p-4 transition ${visitType === item ? "border-[#6B8F71] bg-[#EEF5EF]" : "border-[#EDE8DC]"}`}
                    >
                      <p className="text-xs font-medium">{item}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-[#EDE8DC] p-4">
              <button onClick={() => setShowAddModal(false)} className="flex-1 rounded-xl border border-[#D7D7D7] py-3 text-sm font-medium">Batal</button>
              <button onClick={handleAddSlot} className="flex-1 rounded-xl bg-[#567A58] py-3 text-sm font-medium text-white">Buat Sesi Jadwal</button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL EDIT SLOT
          ========================================================================= */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[560px] rounded-2xl bg-[#F5F0E8] shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-[#1E1E1E]">Edit Konfigurasi Sesi Slot</h2>
              <button onClick={() => setShowEditModal(false)} className="text-xl text-[#6B7280]">×</button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs text-gray-500">Jam Sesi Mulai</label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-xl bg-white px-4 py-3 outline-none border" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Jam Sesi Selesai</label>
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-xl bg-white px-4 py-3 outline-none border" />
              </div>
            </div>

            <p className="text-sm mb-2">Tipe Kunjungan Pasien</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {["Tatap Muka", "Daring", "Keduanya"].map((item) => (
                <button
                  key={item}
                  onClick={() => setVisitType(item)}
                  className={`rounded-lg py-2 text-sm border ${visitType === item ? "border-[#6B8F71] bg-[#EEF5EF] text-[#567A58]" : "bg-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="text-sm mb-2">Kuota Batas Pasien</p>
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setQuota(Math.max(1, quota - 1))} className="h-10 w-10 rounded-lg bg-[#ECE8E0] font-bold">-</button>
              <div className="flex-1 rounded-lg bg-white py-2 text-center border">{quota}</div>
              <button onClick={() => setQuota(quota + 1)} className="h-10 w-10 rounded-lg bg-[#ECE8E0] font-bold">+</button>
            </div>

            <p className="text-sm mb-2">Keterangan Tambahan</p>
            <textarea rows="2" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} className="mb-4 w-full rounded-lg bg-white p-3 border outline-none resize-none" />

            <div className="mb-6 flex items-center justify-between rounded-xl bg-[#ECE8E0] p-4">
              <div>
                <p className="text-sm font-medium">Status Akses Publik</p>
                <p className="text-[11px] text-[#6B7280]">Jika ditutup, pasien tidak dapat mendaftar/booking.</p>
              </div>
              <div className="flex rounded-full bg-white p-1">
                <button onClick={() => setStatusSlot("Buka")} className={`rounded-full px-4 py-1 text-xs ${statusSlot === "Buka" ? "bg-[#6B8F71] text-white" : ""}`}>Buka</button>
                <button onClick={() => setStatusSlot("Tutup")} className={`rounded-full px-4 py-1 text-xs ${statusSlot === "Tutup" ? "bg-red-500 text-white" : ""}`}>Tutup</button>
              </div>
            </div>

            <button onClick={handleUpdateSlot} className="w-full rounded-xl bg-[#567A58] py-3 text-sm font-medium text-white shadow mb-2">Simpan Perubahan</button>
            <button onClick={() => handleDeleteSlot(selectedSlot.id)} className="w-full rounded-xl border border-red-300 py-3 text-sm font-medium text-red-500 hover:bg-red-50">Hapus Slot Permanen</button>
          </div>
        </div>
      )}
    </>
  );
}