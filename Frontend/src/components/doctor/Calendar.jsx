// File: src/components/doctor/Calendar.jsx
import React from "react";

export default function Calendar() {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-72">
      <h3 className="font-semibold mb-2">April 2025</h3>
      <div className="grid grid-cols-7 gap-1 text-xs text-center">
        {["Sen","Sel","Rab","Kam","Jum","Sab","Min"].map(d => (
          <div key={d} className="font-semibold">{d}</div>
        ))}
        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,
          17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(date => (
          <div key={date} className="py-1">{date}</div>
        ))}
      </div>
    </div>
  );
}