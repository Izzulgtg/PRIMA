import { useState } from "react";
import { FaTimes } from "react-icons/fa";

function ConsultationChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "patient",
      time: "10:02",
      text: "Selamat siang dokter, nyeri di perut saya rasanya perih sekali seperti ditusuk-tusuk.",
    },
    {
      id: 2,
      sender: "doctor",
      time: "10:03",
      text: "Selamat siang Bu Siti. Apakah rasa perihnya muncul setiap saat atau hanya setelah makan saja?",
    },
    {
      id: 3,
      sender: "patient",
      time: "10:05",
      text: "Terutama setelah makan pedas atau kopi dok. Tadi pagi saya minum kopi lalu langsung perih.",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, name: "Omeprazole", dose: "1x1 Sebelum Makan" },
    { id: 2, name: "Sucralfate", dose: "3x1 Sendok Makan" },
  ]);

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([
        ...messages,
        { id: Date.now(), sender: "doctor", time: "10:15", text: inputText },
      ]);
      setInputText("");
    }
  };

  const handleRemovePrescription = (id) => {
    setPrescriptions(prescriptions.filter((p) => p.id !== id));
  };

  return (
    <div className="flex gap-4 mx-auto max-w-[1050px] my-4">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#F1EFE8] p-4 rounded-[12px] h-[80vh]">
        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Patients..."
            className="w-full px-4 py-2 rounded border border-gray-300"
          />
        </div>

        {/* Chat messages */}
        <div className="overflow-y-auto flex-1 space-y-2 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-xl max-w-[75%] ${
                msg.sender === "doctor"
                  ? "bg-green-900 text-white self-end"
                  : "bg-[#E0DDD8] self-start"
              }`}
            >
              <p className="text-[12px]">{msg.text}</p>
              <p className="text-[9px] text-gray-500 text-right mt-1">{msg.time}</p>
            </div>
          ))}

          {/* Prescription card inside chat */}
          <div className="bg-[#E0DDD8] p-3 rounded-xl w-[75%]">
            <p className="text-[12px] font-semibold">Resep Elektronik #RX-8821</p>
            {prescriptions.map((p) => (
              <div key={p.id} className="mt-1 text-[11px]">
                {p.name} • {p.dose}
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-auto bg-white p-3 rounded-[12px] flex flex-col gap-2">
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            placeholder="Ketik pesan..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 flex-1"
              placeholder="Cari obat..."
            />
            <button className="bg-green-900 text-white px-4 py-2 rounded">Tambah</button>
            <button
              onClick={handleSendMessage}
              className="bg-green-900 text-white px-4 py-2 rounded"
            >
              Kirim
            </button>
          </div>

          {/* Prescription List */}
          <div className="flex flex-col gap-1">
            {prescriptions.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center p-2 bg-gray-200 rounded"
              >
                <span>{p.name} • {p.dose}</span>
                <button onClick={() => handleRemovePrescription(p.id)} className="text-red-600">
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[350px] flex-shrink-0 flex flex-col gap-2">
        <div className="bg-[#F1EFE8] p-4 rounded-[12px]">
          <p className="font-semibold">Riwayat</p>
          <div className="mt-2 text-[11px]">
            <p>12 Jan 2024 - Gastritis Erosif - dr. Hendra Sp.PD</p>
            <p>05 Nov 2023 - Common Cold - dr. Prima (GP)</p>
          </div>
        </div>

        <div className="bg-[#F1EFE8] p-4 rounded-[12px]">
          <p className="font-semibold">Hasil Laboratorium Terakhir</p>
          <div className="mt-2 text-[11px]">
            <p>HbA1c: 5.8% - Normal</p>
            <p>Kolesterol: 240 mg/dL - Tinggi</p>
          </div>
        </div>

        <div className="bg-[#F1EFE8] p-4 rounded-[12px]">
          <button className="w-full bg-gray-200 p-2 rounded mb-2">Berkas Pasien</button>
          <button className="w-full bg-gray-200 p-2 rounded">Unduh Rekap Medis Lengkap</button>
        </div>
      </div>
    </div>
  );
}

export default ConsultationChatPage;