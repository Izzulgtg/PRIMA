// File: src/components/doctor/AddSlotModal.jsx
import React, { useState } from "react";

export default function AddSlotModal({ show, onClose, onCreateSlot }) {
  const [mode, setMode] = useState("Satu Hari");
  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [type, setType] = useState("Tatap Muka");

  if (!show) return null;

  const toggleDay = (day) => {
    if (days.includes(day)) setDays(days.filter(d => d !== day));
    else setDays([...days, day]);
  };

  const handleCreate = () => {
    onCreateSlot({ mode, days, startTime, endTime, type, status: "Tersedia", patient: "Slot Tersedia", note: "" });
    onClose();
    setDays([]);
    setStartTime("");
    setEndTime("");
    setType("Tatap Muka");
    setMode("Satu Hari");
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg flex flex-col gap-4">
        <h2 className="font-semibold text-[#1E1E1E] text-lg">Tambah Slot Jadwal</h2>

        <div className="flex gap-2">
          {["Satu Hari","Berulang"].map(m => (
            <button key={m} className={`px-3 py-1 rounded-full text-sm font-semibold ${mode===m?"bg-[#6B8F71] text-white":"bg-gray-100 text-[#1E1E1E]"}`} onClick={()=>setMode(m)}>{m}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1 text-sm"/>
          <input type="time" value={endTime} onChange={e=>setEndTime(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1 text-sm"/>
        </div>

        <div className="flex gap-2">
          {["Tatap Muka","Daring","Keduanya"].map(t => (
            <button key={t} className={`px-3 py-1 rounded-full text-sm font-semibold ${type===t?"bg-[#6B8F71] text-white":"bg-gray-100 text-[#1E1E1E]"}`} onClick={()=>setType(t)}>{t}</button>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <button className="flex-1 bg-gray-200 text-[#1E1E1E] py-2 rounded-lg" onClick={onClose}>Batal</button>
          <button className="flex-1 bg-[#6B8F71] text-white py-2 rounded-lg hover:bg-[#57785c]" onClick={handleCreate}>Buat Semua Slot</button>
        </div>
      </div>
    </div>
  );
}