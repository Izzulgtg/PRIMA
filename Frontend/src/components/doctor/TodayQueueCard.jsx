import React from "react";

export default function TodayQueueCard({ patient }) {
  const statusColor = {
    "Waktunya": "bg-green-100 text-green-800",
    "Menunggu": "bg-yellow-100 text-yellow-800",
    "Selesai": "bg-gray-100 text-gray-700"
  };

  const buttonLabel = {
    "Waktunya": "Mulai Konsultasi",
    "Menunggu": "Belum Waktunya",
    "Selesai": "Lihat Resume"
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <div className={`px-2 py-1 rounded-md text-sm ${statusColor[patient.status]}`}>
          {patient.start}
        </div>
        <div>
          <div className="font-semibold">{patient.name}</div>
          <div className="text-xs text-gray-500">
            {patient.age} Thn • {patient.gender} • {patient.duration}
          </div>
        </div>
      </div>
      <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600">
        {buttonLabel[patient.status]}
      </button>
    </div>
  );
}