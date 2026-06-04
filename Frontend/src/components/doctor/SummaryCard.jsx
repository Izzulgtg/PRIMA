
import React from "react";

export default function SummaryCard({ data }) {
  return (
    <div className="min-w-[120px] bg-white rounded-xl shadow p-2 text-center">
      <p className="font-semibold">{data.day}</p>
      <p className="text-sm">{data.booked}</p>
    </div>
  );
}