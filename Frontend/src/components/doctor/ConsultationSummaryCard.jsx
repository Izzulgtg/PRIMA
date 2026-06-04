import React from "react";

export default function ConsultationSummaryCard({ label, count, icon }) {
  return (
    <div className="flex-1 bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-2xl font-bold">{count}</p>
        <p className="text-sm font-medium">{label}</p>
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  );
}