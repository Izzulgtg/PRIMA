import React from "react";

export default function LeaveCard({ data }) {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow">
      <div>
        <p className="font-semibold">{data.date}</p>
        <p className="text-sm text-gray-600">{data.title}</p>
      </div>
      <span className={`text-xs font-semibold ${data.status === "Terjadwal" ? "text-red-500" : "text-green-500"}`}>
        {data.status}
      </span>
    </div>
  );
}