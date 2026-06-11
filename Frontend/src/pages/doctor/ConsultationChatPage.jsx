import React, {
  useState,
  useEffect,
} from "react";

import {
  X,
  Send,
  Search,
  Trash2,
  Clock,
  ClipboardList,
  PenTool,
  Activity,
  ArrowLeft,
  Printer,
} from "lucide-react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  sendMessage,
  getMessages,
  getConsultation,
  finishConsultation,
} from "@/services/dokter/consultation-service";

export default function ConsultationChatPage() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const currentUserId = user?.id;
  const { consultationId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [consultation, setConsultation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("Catatan"); 
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeLeft, setTimeLeft] = useState(12 * 60 + 49);

  // --- STATE SOAP FORM ---
  const [soapForm, setSoapForm] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: ""
  });

  const [medicines, setMedicines] = useState([]);

  const [masterObat] = useState([
    { id: "O1", name: "Omeprazole 20mg", jenis: "Kapsul", stok: 1240, aturan: "1x1 Sebelum Makan" },
    { id: "O2", name: "Sucralfate Syrup", jenis: "Botol", stok: 85, aturan: "3x1 Sendok Makan" },
    { id: "O3", name: "Antasida Doen Tablet", jenis: "Tablet", stok: 1240, aturan: "3x1 Kunyah" },
    { id: "O4", name: "Paracetamol 500mg", jenis: "Tablet", stok: 500, aturan: "3x1 Sesudah Makan" }
  ]);

  // --- REFRESH MESSAGES (DATABASE INTEGRATED) ---
  const refreshMessages = async () => {
    try {
      const data = await getMessages(consultationId);

      setMessages(
        data.map((item) => {
          // Cek apakah isi teks di database merupakan format JSON resep
          let parsedRx = null;
          if (item.isi && item.isi.startsWith('{"isRx":true')) {
            try {
              parsedRx = JSON.parse(item.isi);
            } catch (e) {
              console.error("Gagal membaca data resep", e);
            }
          }

          return {
            id: item.id,
            text: parsedRx ? "" : item.isi,
            sender: item.pengirim_id === currentUserId ? "doctor" : "patient",
            time: new Date(item.created_at).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isRx: parsedRx ? true : false,
            rxNo: parsedRx ? parsedRx.rxNo : null,
            drugs: parsedRx ? parsedRx.drugs : [],
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  // --- CONSULTATION EFFECT & AUTO REFRESH ---
  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const data = await getConsultation(consultationId);
        setConsultation(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConsultation();
    refreshMessages();

    const interval = setInterval(refreshMessages, 3000);
    return () => clearInterval(interval);
  }, [consultationId, currentUserId]);

  // --- TIMER EFFECT ---
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime <= 0 ? 0 : prevTime - 1));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // --- LOGIKA HANDLER ---
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await sendMessage(consultationId, newMessage);
      await refreshMessages();
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMedicine = (obat) => {
    if (medicines.some((m) => m.id === obat.id)) {
      return;
    }

    setMedicines((prev) => [
      ...prev,
      {
        id: obat.id,
        name: obat.name,
        detail: `${
          obat.jenis === "Kapsul"
            ? "10 Kapsul"
            : obat.jenis === "Botol"
            ? "1 Botol"
            : "10 Tablet"
        } • ${obat.aturan}`,
      },
    ]);
  };

  const handleRemoveMedicine = (id) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  // --- SIMPAN RESEP KE DATABASE (FIXED) ---
  const handleSendPrescription = async () => {
    if (medicines.length === 0) return;

    const rxNo = Math.floor(1000 + Math.random() * 9000).toString();
    const prescriptionData = {
      isRx: true,
      rxNo: rxNo,
      drugs: medicines,
    };

    try {
      await sendMessage(consultationId, JSON.stringify(prescriptionData));
      setMedicines([]);
      setIsRxModalOpen(false);
      await refreshMessages();
    } catch (error) {
      console.error("Gagal menyimpan resep ke database:", error);
      alert("Gagal mengirim resep. Silakan coba lagi.");
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const handleFinishConsultation = async () => {
    try {
      await finishConsultation(consultationId);
      navigate("/doctor/consultation");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveSOAP = () => {
    const dataSimpan = { pasien: consultation?.pasien_nama, ...soapForm, resep: medicines };
    localStorage.setItem(`RM_${consultationId}`, JSON.stringify(dataSimpan));
    alert("Data Pemeriksaan (SOAP) Berhasil Disimpan!");
  };

  const filteredObat = masterObat.filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-[#F5F0E8] min-h-screen text-[#1E1E1E] font-sans flex flex-col">
      {/* HEADER */}
      <div className="bg-[#F5F0E8] px-8 py-3 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-200 rounded-full text-gray-600 transition-colors mr-1"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="w-10 h-10 rounded-full bg-[#4A7C8E]/20 overflow-hidden border border-[#4A7C8E]/30 flex items-center justify-center font-bold text-[#4A7C8E]">
            {consultation?.pasien_nama?.substring(0, 2)?.toUpperCase() || "PS"}
          </div>

          <div>
            <h2 className="font-bold text-sm text-[#1E1E1E]">
              {consultation?.pasien_nama || "Pasien"}
            </h2>
            <p className="text-[11px] text-[#6B7280]">
              ID Konsultasi: {consultation?.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`border px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors ${
              timeLeft < 60
                ? "bg-red-50 border-red-200 text-red-600 animate-pulse"
                : "bg-[#C4846A]/10 border-[#C4846A]/20 text-[#C4846A]"
            }`}
          >
            <Clock size={14} />
            {formatTime(timeLeft)}
          </div>

          <button
            onClick={() => alert("Membuka Ringkasan Rekam Medis Pasien...")}
            className="bg-white border border-gray-300 text-[#4A7C8E] font-bold text-xs py-2 px-4 rounded-lg"
          >
            Rekam Medis
          </button>

          <button
            onClick={handleFinishConsultation}
            className="bg-[#C4846A] text-white font-bold text-xs py-2 px-4 rounded-lg"
          >
            Akhiri Sesi
          </button>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden h-[calc(100vh-145px)]">
        {/* CHAT AREA */}
        <div className="col-span-8 flex flex-col bg-[#F5F0E8]/40 border-r border-gray-200">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "doctor" || msg.isRx ? "items-end" : "items-start"
                }`}
              >
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
                  <div
                    className={`p-3 rounded-2xl text-xs max-w-[75%] ${
                      msg.sender === "doctor"
                        ? "bg-[#6B8F71] text-white rounded-tr-none"
                        : "bg-white border border-gray-100 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
                <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR TABS */}
        <div className="col-span-4 bg-[#EDE8DC]/40 p-4 flex flex-col gap-4 overflow-y-auto">
          <div className="flex border-b border-gray-300">
            {["Riwayat", "Obat-obatan", "Catatan"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 pb-2 text-xs font-bold transition-all ${
                  activeTab === t ? "border-b-2 border-[#6B8F71] text-[#1E1E1E]" : "text-gray-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {activeTab === "Riwayat" && (
            <div className="bg-white p-4 rounded-xl border">
              <p className="text-xs text-gray-500">Riwayat penyakit pasien belum tersedia.</p>
            </div>
          )}

          {activeTab === "Obat-obatan" && (
            <div className="bg-white p-4 rounded-xl border">
              <p className="text-xs text-gray-500">Riwayat obat pasien belum tersedia.</p>
            </div>
          )}

          {activeTab === "Catatan" && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-gray-600 flex items-center gap-1">
                    <PenTool size={12} /> Subjective (S)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setSoapForm({
                        ...soapForm,
                        subjective:
                          "Pasien mengeluhkan perih di ulu hati disertai mual, menyerupai gejala Gastritis kronis yang diderita pada kunjungan 3 bulan lalu.",
                      })
                    }
                    className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-medium transition-all"
                    title="Salin keluhan utama dari riwayat medis terakhir"
                  >
                    Autofill Riwayat
                  </button>
                </div>
                <textarea
                  value={soapForm.subjective}
                  onChange={(e) => setSoapForm({ ...soapForm, subjective: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:outline-none focus:border-[#6B8F71]"
                  rows="3"
                />
              </div>

              <div>
                <label className="font-bold text-gray-600 flex items-center gap-1 mb-1">
                  <Activity size={12} /> Objective (O)
                </label>
                <textarea
                  value={soapForm.objective}
                  onChange={(e) => setSoapForm({ ...soapForm, objective: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:outline-none focus:border-[#6B8F71]"
                  rows="3"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-gray-600 flex items-center gap-1">
                    <ClipboardList size={12} /> Assessment (A)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setSoapForm({
                        ...soapForm,
                        assessment: "Gastritis (Kasus Berulang / Sama dengan Riwayat Sebelumnya)",
                      })
                    }
                    className="text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-medium transition-all"
                    title="Gunakan diagnosis yang sama dengan kunjungan lalu"
                  >
                    Autofill Diagnosis Sama
                  </button>
                </div>
                <input
                  value={soapForm.assessment}
                  onChange={(e) => setSoapForm({ ...soapForm, assessment: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-lg bg-white focus:outline-none focus:border-[#6B8F71]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-600 block mb-1">Plan & Terapi (P)</label>
                <div className="bg-white p-3 rounded-xl border border-dashed border-gray-300">
                  {medicines.length > 0 && (
                    <div className="mb-3 space-y-1.5">
                      {medicines.map((m) => (
                        <div
                          key={m.id}
                          className="flex justify-between items-center bg-gray-50 p-2 rounded-md border text-[11px]"
                        >
                          <span>
                            <strong>{m.name}</strong> ({m.detail})
                          </span>
                          <button
                            onClick={() => handleRemoveMedicine(m.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setIsRxModalOpen(true)}
                    className="w-full bg-[#EDE8DC] text-[#4A7C8E] font-bold py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-[#e4decb] transition-all text-xs"
                  >
                    <Search size={14} />{" "}
                    {medicines.length > 0 ? "Edit Racikan Obat" : "Racik Obat Elektronik"}
                  </button>
                  <button
                    onClick={handleSaveSOAP}
                    className="mt-3 w-full rounded-lg bg-[#4A7C8E] py-2 text-xs font-semibold text-white"
                  >
                    Simpan SOAP
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER ACTION PANEL */}
      <div className="bg-white p-4 border-t border-gray-200 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-8 flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            type="text"
            placeholder="Tulis pesan atau anjuran medis..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#6B8F71]"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#6B8F71] text-white p-2.5 rounded-xl hover:bg-[#57755c] transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
        <div className="col-span-4">
          <button
            onClick={handlePrintPDF}
            className="w-full bg-[#6B8F71] text-white font-bold text-xs py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-[#57755c] transition-all"
          >
            <Printer size={14} /> Cetak & Simpan Resume (PDF)
          </button>
        </div>
      </div>

      {/* TEMPLATE CETAK NOTA RESUME (PDF) */}
      <div className="hidden print:block p-10 bg-white min-h-screen text-black">
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-2xl font-bold uppercase tracking-wider">PRIMA DIGITAL CLINIC</h1>
          <p className="text-sm text-gray-600">Jl. Kesehatan Raya No. 45, Jakarta • Telp: (021) 555-1234</p>
          <p className="text-md font-bold mt-2 text-gray-800 border-t pt-2">
            SURAT RESUME REKAM MEDIS & RESEP ELEKTRONIK
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 text-xs">
          <div>
            <p>
              <strong>Nama Pasien:</strong> {consultation?.pasien_nama}
            </p>
            <p>
              <strong>Usia / Gender:</strong> {consultation?.umur || "-"} Tahun /{" "}
              {consultation?.jenis_kelamin || "-"}
            </p>
          </div>
          <div className="text-right">
            <p>
              <strong>Tanggal Konsultasi:</strong> {new Date().toLocaleDateString("id-ID")}
            </p>
            <p>
              <strong>Dokter Pemeriksa:</strong> Dr. Dila (Dokter Umum)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="border p-3 rounded">
            <h3 className="font-bold border-b pb-1 mb-1 bg-gray-100">SUBJECTIVE (S) - Keluhan Pasien</h3>
            <p>{soapForm.subjective}</p>
          </div>
          <div className="border p-3 rounded">
            <h3 className="font-bold border-b pb-1 mb-1 bg-gray-100">OBJECTIVE (O) - Hasil Pemeriksaan Fisik</h3>
            <p>{soapForm.objective}</p>
          </div>
          <div className="border p-3 rounded">
            <h3 className="font-bold border-b pb-1 mb-1 bg-gray-100">ASSESSMENT (A) - Diagnosis</h3>
            <p>{soapForm.assessment}</p>
          </div>
          <div className="border p-3 rounded">
            <h3 className="font-bold border-b pb-1 mb-1 bg-gray-100">PLAN & THERAPY (P) - Rancangan Tindakan</h3>
            <p>{soapForm.plan}</p>
          </div>

          <div className="border p-3 rounded mt-4">
            <h3 className="font-bold border-b pb-1 mb-2 bg-gray-800 text-white px-1">
              📋 RESEP RACIKAN OBAT ELEKTRONIK
            </h3>
            {medicines.length === 0 ? (
              <p className="text-gray-500 italic">Tidak ada resep obat yang dikeluarkan pada sesi ini.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50 text-[11px]">
                    <th className="py-1">No</th>
                    <th className="py-1">Nama Obat</th>
                    <th className="py-1">Aturan Pakai & Takaran</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((med, index) => (
                    <tr key={med.id} className="border-b text-[11px]">
                      <td className="py-1.5">{index + 1}</td>
                      <td className="py-1.5 font-bold">{med.name}</td>
                      <td className="py-1.5">{med.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="mt-16 flex justify-end text-xs">
          <div className="text-center w-48">
            <p>Jakarta, {new Date().toLocaleDateString("id-ID")}</p>
            <p className="mt-12 font-bold underline">Dr. Dila</p>
            <p className="text-gray-500">SIP. 123/DU-PRIMA/2026</p>
          </div>
        </div>
      </div>

      {/* MODAL RACIK OBAT */}
      {isRxModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-[#6B8F71] font-bold text-sm">✏️ Racik Resep Obat Elektronik</h3>
              <button onClick={() => setIsRxModalOpen(false)} className="text-gray-400">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-12 gap-6">
              <div className="col-span-7 space-y-4">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  placeholder="Cari obat..."
                  className="w-full bg-gray-50 border rounded-xl px-4 py-2 text-xs"
                />
                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {filteredObat.map((o) => (
                    <div key={o.id} className="border rounded-xl p-3 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold">{o.name}</p>
                        <p className="text-[10px] text-emerald-600">Stok: {o.stok}</p>
                      </div>
                      <button
                        onClick={() => handleAddMedicine(o)}
                        className="bg-[#6B8F71] text-white text-[11px] font-bold py-1.5 px-4 rounded-lg"
                      >
                        Tambah
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-5 bg-gray-50 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-800 mb-4">🛒 Antrean Resep ({medicines.length})</h4>
                  <div className="space-y-2 max-h-[180px] overflow-y-auto">
                    {medicines.map((med) => (
                      <div key={med.id} className="bg-white border rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold">{med.name}</p>
                          <p className="text-[10px] text-gray-400">{med.detail}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveMedicine(med.id)}
                          className="text-gray-300 hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleSendPrescription}
                  disabled={medicines.length === 0}
                  className="w-full bg-[#4A7C8E] text-white font-bold text-xs py-3 rounded-xl disabled:opacity-40 mt-4"
                >
                  Kirim Resep ke Pasien
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}