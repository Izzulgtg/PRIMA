import { useState } from "react";

export default function ConsultationPage() {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const stats = { terjadwal: 6, selesai: 2, menunggu: 4 };

  const todayQueue = [
    { id: 1, name: "Bp. Ahmad Hidayat", time: "14:00", age: 28, gender: "Laki-laki", duration: "30 Menit", status: "Mulai" },
    { id: 2, name: "Sdr. Siti Aminah", time: "14:45", age: 22, gender: "Perempuan", duration: "30 Menit", status: "Menunggu" },
    { id: 3, name: "Bp. Bambang Agus", time: "15:30", age: 54, gender: "Laki-laki", duration: "30 Menit", status: "Menunggu" },
    { id: 4, name: "Ibu Maria Ulfa", time: "11:00", age: 62, gender: "Perempuan", duration: "", status: "Selesai" },
  ];

  const startChat = (patient) => {
    setActiveChat(patient);
    setMessages([
      { id: 1, sender: "patient", text: "Selamat siang dokter, nyeri di perut saya..." },
      { id: 2, sender: "doctor", text: "Selamat siang Bu Siti, bisa jelaskan lebih detail?" },
    ]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const input = e.target.elements.message.value;
    if (!input) return;
    setMessages([...messages, { id: Date.now(), sender: "doctor", text: input }]);
    e.target.reset();
  };

  return (
    <main className="p-6 flex flex-col gap-6">
      {/* Stats */}
      <div className="flex gap-4">
        <div className="flex-1 bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Terjadwal</p>
          <p className="font-semibold text-lg">{stats.terjadwal}</p>
        </div>
        <div className="flex-1 bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Selesai</p>
          <p className="font-semibold text-lg">{stats.selesai}</p>
        </div>
        <div className="flex-1 bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm text-gray-500">Menunggu</p>
          <p className="font-semibold text-lg">{stats.menunggu}</p>
        </div>
      </div>

      {/* Active Chat Banner */}
      {activeChat && (
        <div className="bg-[#004C70] text-white rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold">BERLANGSUNG • 12:45 Tersedia</p>
            <p className="font-bold text-lg">{activeChat.name}</p>
            <p className="text-sm">Konsultasi Diabetes • Sesi 2</p>
          </div>
          <button className="bg-white text-[#004C70] px-4 py-2 rounded-lg">Lanjutkan Chat</button>
        </div>
      )}

      {/* Antrian Hari Ini */}
      <div className="flex flex-col gap-3">
        {todayQueue.map(patient => (
          <div key={patient.id} className={`bg-white rounded-xl shadow flex justify-between items-center p-4 ${patient.status==="Selesai"?"opacity-70":""}`}>
            <div>
              <p className="text-xs text-gray-500">MULAI: {patient.time}</p>
              <p className="font-semibold">{patient.name}</p>
              <p className="text-sm text-gray-500">{patient.age} Thn • {patient.gender} • {patient.duration}</p>
            </div>
            <button
              className={`px-4 py-2 rounded ${patient.status==="Mulai"?"bg-[#6B8F71] text-white": patient.status==="Selesai"?"bg-gray-100 text-gray-400":"bg-gray-100 text-gray-400"}`}
              onClick={()=>startChat(patient)}
              disabled={patient.status!=="Mulai"}
            >
              {patient.status==="Mulai" ? "Mulai Konsultasi" : patient.status==="Selesai" ? "Lihat Resume" : "Belum Waktunya"}
            </button>
          </div>
        ))}
      </div>

      {/* Chat Box */}
      {activeChat && (
        <div className="bg-white p-4 rounded-xl shadow mt-4 flex flex-col gap-3">
          {messages.map(m => (
            <div key={m.id} className={`max-w-xs p-3 rounded-2xl ${m.sender==="doctor"?"bg-[#6B8F71] text-white self-end":"bg-[#EDE8DC] text-black self-start"}`}>
              {m.text}
            </div>
          ))}
          <form className="flex gap-3 mt-3" onSubmit={sendMessage}>
            <input type="text" name="message" placeholder="Ketik pesan..." className="flex-1 p-3 rounded-xl border border-gray-300"/>
            <button type="submit" className="bg-[#6B8F71] text-white px-4 py-3 rounded-xl">Kirim</button>
          </form>
        </div>
      )}
    </main>
  );
}