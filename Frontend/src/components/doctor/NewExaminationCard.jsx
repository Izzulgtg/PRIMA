import React, { useState } from "react";

export default function NewExaminationCard({ patient, onSave }) {
  const [td, setTd] = useState("");
  const [temp, setTemp] = useState("");
  const [weight, setWeight] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medicine, setMedicine] = useState("");

  const handleSave = () => {
    onSave(patient.id, { td, temp, weight, diagnosis, notes, medicine });
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-[#1E1E1E] flex items-center gap-2">
        <span>Pemeriksaan Baru</span>
      </h2>

      <div className="grid grid-cols-3 gap-2">
        <input
          type="text"
          placeholder="TD (mmHg)"
          value={td}
          onChange={(e) => setTd(e.target.value)}
          className="rounded-md border border-gray-300 px-2 py-1 text-sm"
        />
        <input
          type="text"
          placeholder="Suhu (°C)"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          className="rounded-md border border-gray-300 px-2 py-1 text-sm"
        />
        <input
          type="text"
          placeholder="Berat (Kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="rounded-md border border-gray-300 px-2 py-1 text-sm"
        />
      </div>

      <input
        type="text"
        placeholder="Diagnosis Utama"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        className="rounded-md border border-gray-300 px-2 py-1 text-sm"
      />

      <textarea
        placeholder="Catatan Tambahan"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="rounded-md border border-gray-300 px-2 py-1 text-sm resize-none"
      />

      <input
        type="text"
        placeholder="Resep Obat"
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
        className="rounded-md border border-gray-300 px-2 py-1 text-sm"
      />

      <button
        onClick={handleSave}
        className="bg-[#6B8F71] text-white py-2 rounded-md hover:bg-[#57785c]"
      >
        Simpan & Selesai
      </button>
    </div>
  );
}