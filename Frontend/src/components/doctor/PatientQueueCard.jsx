// File: src/components/doctor/PatientQueueCard.jsx
import React from "react";

export default function PatientQueueCard({ patient, onActionClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Menunggu":
        return "bg-yellow-100 text-yellow-800";
      case "Sedang Diperiksa":
        return "bg-blue-100 text-blue-800";
      case "Selesai":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getButtonLabel = (status) => {
    switch (status) {
      case "Menunggu":
        return "Panggil Pasien";
      case "Sedang Diperiksa":
        return "Periksa Sekarang";
      case "Selesai":
        return "Terperiksa";
      default:
        return "Action";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 min-w-[240px] flex flex-col gap-3">
      {/* Nomor antrian di pojok atas */}
      <div className="flex justify-between items-start">
        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
          patient.status === "Menunggu"
            ? "bg-yellow-100 text-yellow-800"
            : patient.status === "Sedang Diperiksa"
            ? "bg-blue-100 text-blue-800"
            : "bg-green-100 text-green-800"
        }`}>
          {patient.queueNumber}
        </span>
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-semibold text-[#1E1E1E]">{patient.name}</span>
        <p className="text-[#6B7280] text-sm">{patient.complaint}</p>
      </div>

      <button
        className="px-4 py-2 bg-[#6B8F71] text-white rounded-lg hover:bg-[#57785c]"
        onClick={() => onActionClick(patient.id)}
      >
        {getButtonLabel(patient.status)}
      </button>
    </div>
  );
}