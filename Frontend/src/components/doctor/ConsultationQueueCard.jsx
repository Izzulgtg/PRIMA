import React from "react";

export default function ConsultationQueueCard({ patient }) {
  const getStatusLabel = (status) => {
    switch(status){
      case "Menunggu": return { text: "Menunggu", color: "bg-yellow-100 text-yellow-800" };
      case "Berlangsung": return { text: "Berlangsung", color: "bg-blue-100 text-blue-800" };
      case "Selesai": return { text: "Selesai", color: "bg-green-100 text-green-800" };
      default: return { text: "-", color: "bg-gray-100 text-gray-700" };
    }
  };

  const status = getStatusLabel(patient.status);

  return (
    <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold">{patient.name}</span>
        <span className="text-xs text-gray-500">{patient.info}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>{status.text}</span>
        {patient.status === "Berlangsung" && (
          <button className="px-3 py-1 bg-[#6B8F71] text-white rounded-lg hover:bg-[#57785c]">
            Lanjutkan Chat
          </button>
        )}
        {patient.status === "Menunggu" && (
          <button className="px-3 py-1 bg-[#6B8F71] text-white rounded-lg hover:bg-[#57785c]">
            Mulai Konsultasi
          </button>
        )}
        {patient.status === "Selesai" && (
          <button className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100">
            Lihat Resume
          </button>
        )}
      </div>
    </div>
  );
}