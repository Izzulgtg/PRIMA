// File: src/pages/doctor/QueuePage.jsx
import React, { useState } from "react";
import PatientQueueCard from "../../components/doctor/PatientQueueCard";

export default function QueuePage() {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const patients = [
    { id: 1, queueNumber: "A-03", name: "Zaidan", complaint: "Sakit kepala bagian belakang sejak tadi pagi, disertai mual.", status: "Sedang Diperiksa" },
    { id: 2, queueNumber: "A-04", name: "Rifqi", complaint: "Nyeri ulu hati dan mual sejak tadi malam.", status: "Menunggu" },
    { id: 3, queueNumber: "A-02", name: "Rafi", complaint: "Kontrol rutin diabetes melitus tipe 2.", status: "Selesai" },
  ];

  const statusCounts = {
    Menunggu: patients.filter(p => p.status === "Menunggu").length,
    "Sedang Diperiksa": patients.filter(p => p.status === "Sedang Diperiksa").length,
    Selesai: patients.filter(p => p.status === "Selesai").length,
  };

  const filteredPatients = patients.filter(p =>
    (filter === "Semua" || p.status === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex gap-4">
        <div className="flex-1 bg-yellow-50 text-yellow-800 p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{statusCounts["Menunggu"]}</p>
            <p className="text-sm font-medium">Menunggu</p>
          </div>
          <div className="text-2xl">👤</div>
        </div>

        <div className="flex-1 bg-blue-50 text-blue-800 p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{statusCounts["Sedang Diperiksa"]}</p>
            <p className="text-sm font-medium">Sedang Diperiksa</p>
          </div>
          <div className="text-2xl">🩺</div>
        </div>

        <div className="flex-1 bg-green-50 text-green-800 p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{statusCounts["Selesai"]}</p>
            <p className="text-sm font-medium">Selesai</p>
          </div>
          <div className="text-2xl">✔️</div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 mb-4">
        <div className="flex gap-2">
          {["Semua","Menunggu","Sedang Diperiksa","Selesai"].map(f => (
            <button
              key={f}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                filter === f ? "bg-[#6B8F71] text-white" : "bg-gray-100 text-[#1E1E1E]"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Cari nama pasien..."
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm placeholder:text-[#6B7280] w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {filteredPatients.map((p) => (
          <PatientQueueCard key={p.id} patient={p} />
        ))}
      </div>
    </div>
  );
}