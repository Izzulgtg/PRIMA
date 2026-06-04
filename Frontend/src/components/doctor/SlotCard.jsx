// File: src/components/doctor/SlotCard.jsx
import React from "react";

export default function SlotCard({ slot }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Tersedia": return "bg-green-100 text-green-700";
      case "Dipesan": return "bg-blue-100 text-blue-700";
      case "Selesai": return "bg-gray-100 text-gray-700";
      case "Tutup": return "bg-red-100 text-red-700";
      default: return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className={`flex justify-between items-center p-4 rounded-xl shadow ${getStatusColor(slot.status)}`}>
      <div>
        <p className="font-semibold">{slot.start} - {slot.end}</p>
        <p className="text-sm">{slot.type} - {slot.patient}</p>
      </div>
      <p className="text-sm px-2 py-1 rounded-full font-semibold">{slot.status}</p>
    </div>
  );
}