import React from "react";

export default function MedicalHistoryCard({ record }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-semibold text-[#1E1E1E]">{record.date}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-[#6B7280]">{record.type}</span>
      </div>
      <div className="text-sm text-[#1E1E1E] mb-1 font-semibold">Diagnosis: {record.diagnosis}</div>
      <div className="text-xs text-[#6B7280] mb-1">Obat: {record.medicine}</div>
      {record.notes && <div className="text-xs text-[#6B7280] italic">"{record.notes}"</div>}
    </div>
  );
}