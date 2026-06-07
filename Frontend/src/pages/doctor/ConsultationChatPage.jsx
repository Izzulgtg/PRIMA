import React, { useState, useEffect } from "react";
import { X, Send, Download, FileText, Search, Trash2, Clock, Pill, ClipboardList, PenTool, Activity } from "lucide-react";

// --- MOCK DATA AWAL ---
const initialMessages = [
  { id: 1, sender: "patient", text: "Selamat siang dokter, nyeri di perut saya rasanya perih sekali seperti ditusuk-tusuk.", time: "10:02" },
  { id: 2, sender: "doctor", text: "Selamat siang Bu Siti. Apakah rasa perihnya muncul setiap saat atau hanya setelah makan saja?", time: "10:03" },
  { id: 3, sender: "patient", text: "Terutama setelah makan pedas atau kopi dok. Tadi pagi saya minum kopi lalu langsung perih.", time: "10:05" },
];

export default function ConsultationChatPage() {
  // --- STATE MANAGEMENT ---
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("Riwayat"); // Riwayat, Obat-obatan, Catatan
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // State untuk Timer Konsultasi Berjalan (14 Menit 45 Detik)
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 45); // Konversi 14:45 ke total detik (885 detik)

  // State untuk form SOAP (Tab Catatan)
  const [soapForm, setSoapForm] = useState({
    subjective: "Nyeri ulu hati, perih seperti ditusuk-tusuk setelah konsumsi kafein/pedas.",
    objective: "Nyeri tekan pada area epigastrium (+), TD: 120/80, Nadi: 80x/m.",
    assessment: "Gastritis Akut / Dyspepsia Syndrome",
    plan: "Edukasi diet lambung dan pemberian antasida & PPI."
  });

  // State antrean resep sementara
  const [medicines, setMedicines] = useState([]);

  // Master data stok obat PRIMA
  const [masterObat] = useState([
    { id: "O1", name: "Omeprazole 20mg", jenis: "Kapsul", stok: 1240, aturan: "1x1 Sebelum Makan" },
    { id: "O2", name: "Sucralfate Syrup", jenis: "Botol", stok: 85, aturan: "3x1 Sendok Makan" },
    { id: "O3", name: "Antasida Doen Tablet", jenis: "Tablet", stok: 1240, aturan: "3x1 Kunyah" },
    { id: "O4", name: "Paracetamol 500mg", jenis: "Tablet", stok: 500, aturan: "3x1 Sesudah Makan" }
  ]);

  // --- EFFECT: LOGIKA TIMER BERJALAN MUNDUR ---
  useEffect(() => {
    // Jalankan interval setiap 1000ms (1 detik)
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          return 0; // Waktu habis
        }
        return prevTime - 1;
      });
    }, 1000);

    // Bersihkan interval saat komponen unmount agar tidak memory leak
    return () => clearInterval(timerInterval);
  }, []);

  // Fungsi helper untuk mengubah detik ke format MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // --- LOGIKA HANDLER ---
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "doctor", text: newMessage, time: "10:20" }]);
    setNewMessage("");
  };

  const handleAddMedicine = (obat) => {
    if (medicines.some(m => m.id === obat.id)) return;
    setMedicines([...medicines, { 
        id: obat.id, 
        name: obat.name, 
        detail: `${obat.jenis === "Kapsul" ? "10 Kapsul" : "1 Botol"} • ${obat.aturan}` 
    }]);
  };

  const handleSendPrescription = () => {
    if (medicines.length === 0) return;
    const rxNo = Math.floor(1000 + Math.random() * 9000);
    setMessages([...messages, {
      id: Date.now(),
      sender: "system",
      isRx: true,
      rxNo: rxNo.toString(),
      drugs: medicines,
      time: "10:25"
    }]);
    setIsRxModalOpen(false);
  };

  const handleSaveSOAP = () => {
    const dataSimpan = { pasien: "Siti Aminah", ...soapForm, resep: medicines };
    localStorage.setItem("RM_SITI_AMINAH_LAST", JSON.stringify(dataSimpan));
    alert("Data Pemeriksaan (SOAP) Berhasil Disimpan!");
  };

  const filteredObat = masterObat.filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#1E1E1E] font-sans flex flex-col">
      
      {/* HEADER (Sesuai Gambar Kamu) */}
      <div className="bg-[#F5F0E8] px-8 py-3 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden border border-gray-200">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120" alt="Siti Aminah" />
          </div>
          <div>
            <h2 className="font-bold text-sm">Siti Aminah</h2>
            <p className="text-[11px] text-[#6B7280]">42 Thn • Perempuan</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* TIMER AKTIF BERJALAN */}
          <div className={`border px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${timeLeft < 60 ? "bg-red-50 border-red-200 text-red-600 animate-pulse" : "bg-[#C4846A]/10 border-[#C4846A]/20 text-[#C4846A]"}`}>
            <Clock size={14} /> {formatTime(timeLeft)}
          </div>
          <button onClick={() => alert("Membuka Ringkasan Rekam Medis Pasien...")} className="bg-white border border-gray-300 text-[#4A7C8E] font-bold text-xs py-2 px-4 rounded-lg">Rekam Medis</button>
          <button className="bg-[#C4846A] text-white font-bold text-xs py-2 px-4 rounded-lg">Akhiri Sesi</button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden h-[calc(100vh-145px)]">
        
        {/* KIRI: CHAT AREA */}
        <div className="col-span-8 flex flex-col bg-[#F5F0E8]/40 border-r border-gray-200">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "doctor" || msg.isRx ? "items-end" : "items-start"}`}>
                {msg.isRx ? (
                  <div className="bg-white border border-[#6B8F71]/30 rounded-2xl p-4 shadow-sm w-full max-w-xs mb-2">
                    <div className="text-[#6B8F71] font-bold text-xs border-b pb-2 mb-2 flex justify-between">
                      <span>📋 Resep Elektronik</span>
                      <span className="text-gray-400 font-normal">#RX-{msg.rxNo}</span>
                    </div>
                    {msg.drugs.map((d, i) => (
                      <div key={i} className="text-xs mb-1">
                        <p className="font-bold">{d.name}</p>
                        <p className="text-gray-500 text-[10px]">{d.detail}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`p-3 rounded-2xl text-xs max-w-[75%] ${msg.sender === "doctor" ? "bg-[#6B8F71] text-white rounded-tr-none" : "bg-white border border-gray-100 rounded-tl-none shadow-sm"}`}>
                    {msg.text}
                  </div>
                )}
                <span className="text-[9px] text-gray-400 mt-1">{msg.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* KANAN: SIDEBAR TABS */}
        <div className="col-span-4 bg-[#EDE8DC]/40 p-4 flex flex-col gap-4 overflow-y-auto">
          {/* TAB HEADERS */}
          <div className="flex border-b border-gray-300">
            {["Riwayat", "Obat-obatan", "Catatan"].map((t) => (
              <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 pb-2 text-xs font-bold transition-all ${activeTab === t ? "border-b-2 border-[#6B8F71] text-[#1E1E1E]" : "text-gray-400"}`}>
                {t}
              </button>
            ))}
          </div>

          {/* TAB CONTENT: RIWAYAT */}
          {activeTab === "Riwayat" && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
                  <span>12 Jan 2024</span>
                  <span>dr. Hendra Sp.PD</span>
                </div>
                <h4 className="text-xs font-bold text-gray-800">Gastritis Erosif</h4>
                <p className="text-[11px] text-gray-500 mt-1">Pasien mengeluh nyeri perut kiri atas, mual muntah.</p>
                <div className="mt-2 flex gap-1">
                  <span className="text-[9px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">OMEPRAZOLE</span>
                  <span className="text-[9px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">ANTASIDA</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 text-xs">
                <h4 className="font-bold text-gray-700 mb-2">Hasil Laboratorium Terakhir</h4>
                <div className="flex justify-between p-2 bg-[#F5F0E8] rounded mb-1">
                  <span>HbA1c</span> <span className="font-bold text-emerald-600">5.8%</span>
                </div>
                <div className="flex justify-between p-2 bg-[#F5F0E8] rounded">
                  <span>Kolesterol</span> <span className="font-bold text-[#C4846A]">240 mg/dL</span>
                </div>
              </div>
              <button className="w-full bg-white border border-gray-300 py-2 rounded-xl text-xs font-bold flex justify-center items-center gap-2"><Download size={12}/> Unduh Rekap Medis Lengkap</button>
            </div>
          )}

          {/* TAB CONTENT: OBAT-OBATAN */}
          {activeTab === "Obat-obatan" && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-700">Daftar Obat Aktif Pasien</h3>
              <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center gap-3">
                <Pill className="text-emerald-600" size={18} />
                <div className="text-xs">
                  <p className="font-bold">Omeprazole 20mg</p>
                  <p className="text-[10px] text-gray-500">1x1 Sebelum Makan • Sisa: 4 Hari</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center gap-3">
                <Pill className="text-emerald-600" size={18} />
                <div className="text-xs">
                  <p className="font-bold">Antasida Doen</p>
                  <p className="text-[10px] text-gray-500">3x1 Kunyah (Kondisional) • Sisa: 10 Hari</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: CATATAN (FORM SOAP) */}
          {activeTab === "Catatan" && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-600 flex items-center gap-1 mb-1"><PenTool size={12}/> Subjective (S)</label>
                <textarea value={soapForm.subjective} onChange={(e)=>setSoapForm({...soapForm, subjective:e.target.value})} className="w-full border p-2 rounded-lg bg-white/50" rows="2" />
              </div>
              <div>
                <label className="font-bold text-gray-600 flex items-center gap-1 mb-1"><Activity size={12}/> Objective (O)</label>
                <textarea value={soapForm.objective} onChange={(e)=>setSoapForm({...soapForm, objective:e.target.value})} className="w-full border p-2 rounded-lg bg-white/50" rows="2" />
              </div>
              <div>
                <label className="font-bold text-gray-600 flex items-center gap-1 mb-1"><ClipboardList size={12}/> Assessment (A)</label>
                <input value={soapForm.assessment} onChange={(e)=>setSoapForm({...soapForm, assessment:e.target.value})} className="w-full border p-2 rounded-lg bg-white/50" />
              </div>
              <div>
                <label className="font-bold text-gray-600 block mb-1">Plan & Terapi (P)</label>
                <div className="bg-white p-3 rounded-lg border border-dashed border-gray-300">
                   <p className="text-[10px] text-gray-500 mb-2 italic">Klik tombol di bawah untuk meracik e-resep pasien.</p>
                   <button onClick={()=>setIsRxModalOpen(true)} className="w-full bg-[#EDE8DC] text-[#4A7C8E] font-bold py-1.5 rounded-md flex justify-center items-center gap-2">
                     <Search size={14}/> Racik Obat Elektronik
                   </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER ACTION BAR */}
      <div className="bg-white p-4 border-t border-gray-200 grid grid-cols-12 gap-4">
        <div className="col-span-8 flex gap-2">
          <input value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} onKeyDown={(e)=>e.key==="Enter" && handleSendMessage()} type="text" placeholder="Tulis pesan atau anjuran medis..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none" />
          <button onClick={handleSendMessage} className="bg-[#6B8F71] text-white p-2.5 rounded-xl"><Send size={14}/></button>
        </div>
        <div className="col-span-4">
          <button onClick={handleSaveSOAP} className="w-full bg-[#6B8F71] text-white font-bold text-xs py-2.5 rounded-xl shadow-sm">Simpan Hasil Pemeriksaan (SOAP)</button>
        </div>
      </div>

      {/* CENTER MODAL: RACIK OBAT */}
      {isRxModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-[#6B8F71] font-bold text-sm flex items-center gap-2">✏️ Racik Resep Obat Elektronik</h3>
              <button onClick={()=>setIsRxModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="p-6 grid grid-cols-12 gap-6">
              <div className="col-span-7 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                  <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} type="text" placeholder="Cari nama obat..." className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:border-[#6B8F71] outline-none" />
                </div>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {filteredObat.map(o => (
                    <div key={o.id} className="border border-gray-100 rounded-xl p-3 flex justify-between items-center bg-white hover:border-[#6B8F71] transition-all">
                      <div>
                        <p className="text-xs font-bold">{o.name}</p>
                        <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Tersedia: {o.stok} Unit</p>
                      </div>
                      <button onClick={()=>handleAddMedicine(o)} className="bg-[#6B8F71] text-white text-[11px] font-bold py-1.5 px-4 rounded-lg transition-all">Tambah</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-5 bg-gray-50 rounded-2xl p-5 flex flex-col justify-between border border-gray-200/50">
                <div>
                  <h4 className="text-xs font-bold text-gray-800 mb-4">🛒 Antrean Resep ({medicines.length})</h4>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {medicines.length === 0 ? (
                        <p className="text-[11px] text-gray-400 italic text-center py-10">Belum ada obat dipilih.</p>
                    ) : medicines.map((med) => (
                      <div key={med.id} className="bg-white border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
                        <div>
                          <p className="text-xs font-bold text-gray-700">{med.name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{med.detail}</p>
                        </div>
                        <button onClick={() => handleRemoveMedicine(med.id)} className="text-gray-300 hover:text-red-500 p-1"><Trash2 size={14}/></button>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={handleSendPrescription} disabled={medicines.length===0} className="w-full bg-[#4A7C8E] text-white font-bold text-xs py-3 rounded-xl shadow-md disabled:opacity-40 mt-4">Kirim Resep ke Pasien</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}