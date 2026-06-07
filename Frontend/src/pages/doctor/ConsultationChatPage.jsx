import { useState } from "react";
import { X } from "lucide-react";

const initialMessages = [
  { id: 1, sender: "patient", text: "Selamat siang dokter, nyeri di perut saya rasanya perih sekali seperti ditusuk-tusuk.", time: "10:02" },
  { id: 2, sender: "doctor", text: "Selamat siang Bu Siti. Apakah rasa perihnya muncul setiap saat atau hanya setelah makan saja?", time: "10:03" },
  { id: 3, sender: "patient", text: "Terutama setelah makan pedas atau kopi dok. Tadi pagi saya minum kopi lalu langsung perih.", time: "10:05" },
  { id: 4, sender: "system", text: "Resep Elektronik #RX-8821\nOmeprazole • 1x1 Sebelum Makan\nSucralfate • 3x1 Sendok Makan", time: "10:15" },
];

export default function ConsultationChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [newMedicine, setNewMedicine] = useState("");
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Omeprazole • 1x1 Sebelum Makan" },
    { id: 2, name: "Sucralfate • 3x1 Sendok Makan" },
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "doctor", text: newMessage, time: "Now" }]);
    setNewMessage("");
  };

  const handleAddMedicine = () => {
    if (!newMedicine.trim()) return;
    setMedicines([...medicines, { id: Date.now(), name: newMedicine }]);
    setNewMedicine("");
  };

  const handleRemoveMedicine = (id) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  return (
    <div className="flex gap-5">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="bg-white rounded-lg p-4 max-h-[500px] overflow-y-auto space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-3 rounded-lg max-w-[80%] ${msg.sender === "doctor" ? "bg-green-900 text-white ml-auto" : "bg-gray-200 text-gray-900"}`}>
              <p className="whitespace-pre-line">{msg.text}</p>
              <span className="text-xs text-gray-500 mt-1 block text-right">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2 mt-3">
          <input
            type="text"
            placeholder="Ketik pesan..."
            className="border rounded-md px-3 py-2 w-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Cari obat..."
              className="border rounded-md px-3 py-2 flex-1"
              value={newMedicine}
              onChange={(e) => setNewMedicine(e.target.value)}
            />
            <button onClick={handleAddMedicine} className="px-4 py-2 bg-green-700 text-white rounded-md">Tambah</button>
            <button onClick={handleSendMessage} className="px-4 py-2 bg-green-800 text-white rounded-md">Kirim</button>
          </div>

          {/* Medicine List */}
          <div className="flex flex-col gap-2">
            {medicines.map((med) => (
              <div key={med.id} className="flex justify-between items-center bg-gray-200 px-3 py-2 rounded-md">
                <span>{med.name}</span>
                <button onClick={() => handleRemoveMedicine(med.id)}><X size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-[300px] flex-shrink-0 space-y-4">
        <div className="bg-[#E8E5DE] rounded-lg p-3">
          <h3 className="font-semibold mb-2">Riwayat</h3>
          <p>12 Jan 2024 - Gastritis Erosif - dr. Hendra Sp.PD</p>
          <p>05 Nov 2023 - Common Cold - dr. Prima (GP)</p>
        </div>

        <div className="bg-[#E8E5DE] rounded-lg p-3">
          <h3 className="font-semibold mb-2">Hasil Laboratorium Terakhir</h3>
          <p>HbA1c: 5.8% - Normal</p>
          <p>Kolesterol: 240 mg/dL - Tinggi</p>
        </div>

        <div className="flex flex-col gap-2">
          <button className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md">Berkas Pasien</button>
          <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md">Unduh Rekap Medis Lengkap</button>
        </div>
      </div>
    </div>
  );
}