// File: src/pages/doctor/SchedulePage.jsx
import React, { useState } from "react";
import AddSlotModal from "../../components/doctor/AddSlotModal";
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
  };

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
    </div>
  );
}