import React from "react";

export default function QueueConsultationCard({ queue }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "WAKTUNYA":
        return "bg-green-50 text-green-800 border-green-200";
      case "MENUNGGU":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "SELESAI":
        return "bg-gray-50 text-gray-500 border-gray-200";
      default:
        return "bg-gray-50 text-gray-500 border-gray-200";
    }
  };

  return (
    <div className={`flex justify-between items-center p-4 rounded-xl border ${getStatusColor(queue.status)}`}>
      <div>
        <div className="text-xs font-semibold">{queue.status === "SELESAI" ? "PUKUL" : "MULAI"} {queue.time}</div>
        <div className="font-semibold">{queue.name}</div>
        <div className="text-sm text-gray-600">{queue.age} Thn • {queue.gender} • {queue.duration}</div>
      </div>
      <div>
        {queue.status === "WAKTUNYA" && (
          <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
            Mulai Konsultasi
          </button>
        )}
        {queue.status === "MENUNGGU" && (
          <button className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
            Belum Waktunya
          </button>
        )}
        {queue.status === "SELESAI" && (
          <button className="bg-gray-50 px-4 py-2 rounded-lg border hover:bg-gray-100">
            Lihat Resume
          </button>
        )}
      </div>
    </div>
  );
}