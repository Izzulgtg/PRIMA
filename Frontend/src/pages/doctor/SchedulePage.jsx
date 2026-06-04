// File: src/pages/doctor/SchedulePage.jsx
import React, { useState } from "react";
import AddSlotModal from "../../components/doctor/AddSlotModal"; // pakai file komponenmu
import SlotCard from "../../components/doctor/SlotCard";
import Calendar from "../../components/doctor/Calendar";

export default function SchedulePage() {
  const [showAddModal, setShowAddModal] = useState(false);

  const [slots, setSlots] = useState([
    { id: 1, start: "08:00", end: "08:30", type: "Tatap Muka", status: "Dipesan", patient: "Budi Wijaya", note: "Nomor Antrian A-01" },
    { id: 2, start: "08:30", end: "09:00", type: "Daring", status: "Tersedia", patient: "Slot Tersedia", note: "Belum ada pasien" },
    { id: 3, start: "09:00", end: "09:30", type: "Tatap Muka", status: "Selesai", patient: "Siti Aminah", note: "Kontrol rutin" },
  ]);

  const handleAddSlot = (newSlot) => {
    setSlots([...slots, { ...newSlot, id: Date.now() }]);
    setShowAddModal(false);
  };

  const upcomingDays = [
    { day: "Sel, 30 Apr", percentage: 85, slot: "10/12", status: "available" },
    { day: "Rab, 01 Mei", status: "Terjadwal", note: "Cuti Lebaran" },
    { day: "Kam, 02 Mei", status: "Terjadwal", note: "Cuti Lebaran" },
    { day: "Jum, 03 Mei", status: "Terjadwal", note: "Cuti Lebaran" },
    { day: "Sab, 04 Mei", percentage: 40, slot: "4/10", status: "available" },
    { day: "Min, 05 Mei", percentage: 10, slot: "1/10", status: "available" },
  ];

  const holidays = [
    { date: "01 - 05 Mei 2025", description: "Libur Lebaran 1446H", status: "Terjadwal" },
    { date: "17 Agustus 2025", description: "Hari Kemerdekaan RI", status: "Mendatang" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex gap-6">
        <Calendar />

        <div className="flex-1 space-y-4">
          {slots.map((s) => (
            <SlotCard key={s.id} slot={s} />
          ))}
        </div>
      </div>

      <button
        className="px-4 py-2 bg-[#6B8F71] text-white rounded-lg hover:bg-[#57785c] self-start"
        onClick={() => setShowAddModal(true)}
      >
        Tambah Slot Baru
      </button>

      {showAddModal && (
        <AddSlotModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onCreateSlot={handleAddSlot}
        />
      )}

      {/* 7 Hari ke Depan */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2 flex items-center gap-2">📅 7 Hari ke Depan</h3>
        <div className="flex gap-2 overflow-x-auto">
          {upcomingDays.map((d, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-28 bg-white border rounded-xl p-3 shadow flex flex-col items-center gap-1"
            >
              <div className="text-xs text-gray-500">{d.day}</div>
              {d.status === "Terjadwal" ? (
                <>
                  <div className="text-sm font-semibold text-red-600">{d.status}</div>
                  <div className="text-[10px] text-gray-400">{d.note}</div>
                </>
              ) : (
                <>
                  <div className="text-sm font-semibold text-green-600">{d.percentage}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div className="bg-green-600 h-1 rounded-full" style={{ width: `${d.percentage}%` }} />
                  </div>
                  <div className="text-[10px] text-gray-400">{d.slot} Slot</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Jadwal Libur & Cuti */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Jadwal Libur & Cuti</h3>
        <div className="flex flex-col gap-2">
          {holidays.map((h, idx) => (
            <div key={idx} className="bg-white border rounded-xl p-4 shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{h.date}</div>
                <div className="text-sm text-gray-500">{h.description}</div>
              </div>
              <div className={`text-sm font-semibold ${h.status === "Terjadwal" ? "text-red-600" : "text-gray-600"}`}>
                {h.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}