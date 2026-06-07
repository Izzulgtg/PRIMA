// src/pages/doctor/SchedulePage.jsx
import { useState } from "react";
import { Check } from "lucide-react";

const initialSlots = [
  { id: 1, time: "08.00 - 08.30", patient: "Budi Wijaya", type: "Tatap Muka", status: "Aktif", button: "Lanjut Periksa", bg: "bg-[#F1F9F5]", border: "border-[#E2E8ED]" },
  { id: 2, time: "08.30 - 09.00", patient: "Slot Tersedia", type: ["Daring", "Tersedia"], status: "Aktif", button: "Panggil", bg: "bg-[#E8F4FF]", border: "border-[#D9EFFF]" },
  { id: 3, time: "09.00 - 09.30", patient: "Siti Aminah", type: "Tatap Muka", status: "Selesai", button: <Check className="text-white" />, bg: "bg-[#F7F6F4]", border: "border-[#000]" },
  { id: 4, time: "09.30 - 10.00", patient: "Slot Nonaktif", type: "Tatap Muka", status: "Tutup", button: "Buka Slot", bg: "bg-[#FFEAEA]", border: "border-[#F5C6C6]" },
];

const weekSummary = [
  { date: "Sel, 30 Apr", progress: "85%", slots: "10/12" },
  { date: "Rab, 01 Mei", progress: "LIBUR", slots: "" },
  { date: "Kam, 02 Mei", progress: "LIBUR", slots: "" },
  { date: "Jum, 03 Mei", progress: "LIBUR", slots: "" },
  { date: "Sab, 04 Mei", progress: "40%", slots: "4/10" },
  { date: "Min, 05 Mei", progress: "10%", slots: "1/10" },
];

const holidays = [
  { date: "01 - 05 Mei 2025", name: "Libur Lebaran 1446H", status: "Terjadwal" },
  { date: "17 Agustus 2025", name: "Hari Kemerdekaan RI", status: "Mendatang" },
];

export default function SchedulePage() {
  const [slots, setSlots] = useState(initialSlots);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [selectedDays, setSelectedDays] = useState([]);
  const [visitType, setVisitType] = useState("Keduanya");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("08:30");

  const [quota, setQuota] = useState(1);
  const [slotStatus, setSlotStatus] = useState("Buka");



  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((d) => d !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const openEditModal = (slot) => {
    setSelectedSlot(slot);

    const times = slot.time.split(" - ");

    setStartTime(times[0]);
    setEndTime(times[1]);

    setEditType(
      Array.isArray(slot.type)
        ? slot.type[0]
        : slot.type
    );

    setEditStatus(
      slot.status === "Tutup"
        ? "Tutup"
        : "Buka"
    );

    setShowEditModal(true);
  };

  const handleAddSlot = () => {
    const newSlot = {
      id: Date.now(),
      time: `${startTime} - ${endTime}`,
      patient: "Slot Tersedia",
      type: visitType,
      status: "Aktif",
      button: "Panggil",
      bg: "bg-[#E8F4FF]",
      border: "border-[#D9EFFF]",
    };

    setSlots([...slots, newSlot]);

    setShowAddModal(false);
  };


  const handleDeleteSlot = (id) => {
    setSlots(
      slots.filter((slot) => slot.id !== id)
    );
  };

  const handleUpdateSlot = () => {
    setSlots(
      slots.map((slot) =>
        slot.id === selectedSlot.id
          ? {
            ...slot,
            time: `${startTime} - ${endTime}`,
            type: editType,
            status: editStatus,
          }
          : slot
      )
    );

    setShowEditModal(false);
  };



  const [editQuota, setEditQuota] = useState(1);
  const [editStatus, setEditStatus] =
    useState("Buka");

  const [editType, setEditType] =
    useState("Keduanya");

  return (
    <>
      <div className="flex flex-col px-8 py-7 space-y-6 bg-[#F7F3EB] min-h-screen">
        <div className="flex gap-4">
          {/* Kiri: Kalender + Ringkasan */}
          <div className="flex flex-col gap-4 w-[220px]">
            {/* Kalender */}
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="font-semibold mb-2 text-[14px]">April 2025</h3>
              <div className="grid grid-cols-7 gap-1 text-[12px] text-center text-gray-600">
                <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                {[...Array(30).keys()].map((i) => (
                  <div key={i} className={`p-1 rounded ${i + 1 === 29 ? "bg-[#C9E4C5] font-semibold" : ""}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-2 text-[10px] text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#4A7C5E] rounded-full" /> Tatap Muka
                </span>
                <span className="inline-flex items-center gap-1 ml-2">
                  <span className="w-2 h-2 bg-[#2D9CDB] rounded-full" /> Daring
                </span>
                <span className="inline-flex items-center gap-1 ml-2">
                  <span className="w-2 h-2 bg-[#EB5757] rounded-full" /> Libur
                </span>
              </div>
            </div>

            {/* Ringkasan Bulan */}
            <div className="bg-white p-4 rounded shadow-md text-center">
              <h3 className="text-[12px] text-gray-500 mb-2">Ringkasan Bulan Ini</h3>
              <div className="grid grid-cols-3 gap-2 text-[12px] font-semibold">
                <div>
                  <p className="text-[16px]">20</p>
                  <p className="text-gray-500">Hari Praktik</p>
                </div>
                <div>
                  <p className="text-[16px]">80</p>
                  <p className="text-gray-500">Total Slot</p>
                </div>
                <div>
                  <p className="text-[16px]">67</p>
                  <p className="text-gray-500">Dipesan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan: Slot Hari Ini + Tombol */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-end items-center mb-4 gap-4">
              <button
                className="px-4 py-2 bg-[#456955] text-white rounded text-[12px]"
                onClick={() => setShowAddModal(true)}
              >
                + Tambah Slot Baru
              </button>
              <label className="flex items-center gap-2 text-[12px]">
                Status:
                <input type="checkbox" className="toggle toggle-primary" checked />
              </label>
            </div>

            {slots.map((s) => (
              <div
                key={s.id}
                className={`flex justify-between items-center rounded border ${s.border} ${s.bg} p-4`}
              >
                <div>
                  <p className="text-[14px] font-semibold">{s.time}</p>
                  <p className="text-[15px] font-bold">{s.patient}</p>
                  {Array.isArray(s.type) ? (
                    <div className="flex gap-1 mt-1">
                      {s.type.map((t, i) => (
                        <span key={i} className="bg-blue-200 px-2 py-1 rounded text-[12px]">{t}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="bg-green-200 px-2 py-1 rounded text-[12px] mt-1 inline-block">{s.type}</span>
                  )}
                  {s.status && <span className="text-[12px] text-red-500 ml-2">{s.status}</span>}
                </div>
                <div className="flex items-center gap-4">

                  <button
                    onClick={() => openEditModal(s)}
                    className="text-[#6B7280] hover:text-[#1E1E1E]"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => handleDeleteSlot(s.id)}
                    className="text-[#E06B65] hover:text-red-600"
                  >
                    ✕
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7 Hari ke Depan */}
        <div className="grid grid-cols-6 gap-2 mt-4">
          {weekSummary.map((w, i) => (
            <div key={i} className="p-3 bg-[#F7F6F4] rounded text-center text-[12px]">
              <p>{w.date}</p>
              <p className={w.progress === "LIBUR" ? "text-red-500 font-semibold" : "font-bold"}>{w.progress}</p>
              {w.slots && <p className="text-[10px] text-gray-500">{w.slots} Slot</p>}
            </div>
          ))}
        </div>

        {/* Jadwal Libur & Cuti */}
        <div className="space-y-2 mt-4">
          {holidays.map((h, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-[#F7F6F4] rounded">
              <div className="flex items-center gap-2">
                <span className="text-red-500">{h.date}</span>
                <span>{h.name}</span>
              </div>
              <span className="text-[12px] bg-gray-200 px-2 py-1 rounded">{h.status}</span>
            </div>
          ))}
        </div>

        {/* Modal Add Slot */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="relative w-full max-w-xl rounded-[20px] bg-white shadow-2xl">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#EDE8DC] px-6 py-5">
                <h2 className="text-sm font-medium text-[#1E1E1E]">
                  Tambah Slot Jadwal
                </h2>

                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-xl text-[#6B7280]"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-5">

                {/* Dokter */}
                <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#F5F0E8] p-4">
                  <div className="h-12 w-12 rounded-full bg-[#6B8F71]" />

                  <div>
                    <p className="text-sm font-medium text-[#1E1E1E]">
                      Dr. Zeki
                    </p>

                    <p className="text-xs text-[#4A7C8E]">
                      Dokter Umum
                    </p>
                  </div>
                </div>

                {/* Tab */}
                <div className="mb-5 flex rounded-xl bg-[#F5F0E8] p-1">
                  <button className="flex-1 rounded-lg bg-white py-2 text-sm font-medium shadow-sm">
                    Satu Hari
                  </button>

                  <button className="flex-1 py-2 text-sm font-medium text-[#6B7280]">
                    Berulang
                  </button>
                </div>

                {/* Hari */}
                <div className="mb-4">
                  <p className="mb-3 text-sm text-[#1E1E1E]">
                    Pilih Hari Berulang
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`rounded-lg px-4 py-2 text-xs font-medium transition
        ${selectedDays.includes(day)
                            ? "bg-[#6B8F71] text-white"
                            : "bg-[#ECE8E0] text-[#1E1E1E]"
                          }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Jam */}
                <div className="mb-5 grid grid-cols-2 gap-3">

                  <div>
                    <label className="mb-2 block text-xs text-[#6B7280]">
                      Jam Mulai
                    </label>

                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full rounded-xl border border-[#EDE8DC] bg-[#F5F0E8] px-4 py-3 outline-none"
                    />

                    <div>
                      <label className="mb-2 block text-xs text-[#6B7280]">
                        Jam Selesai
                      </label>

                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full rounded-xl border border-[#EDE8DC] bg-[#F5F0E8] px-4 py-3 outline-none"
                      />

                    </div>

                    {/* Tipe */}
                    <div className="mb-5">
                      <p className="mb-3 text-sm text-[#1E1E1E]">
                        Tipe Kunjungan
                      </p>

                      <div className="grid grid-cols-3 gap-3">
                        {["Tatap Muka", "Daring", "Keduanya"].map(
                          (item) => (
                            <button
                              key={item}
                              onClick={() => setVisitType(item)}
                              className={`rounded-xl border p-4
        ${visitType === item
                                  ? "border-[#6B8F71] bg-[#EEF5EF]"
                                  : "border-[#EDE8DC]"
                                }`}
                            >
                              <p className="text-xs font-medium">
                                {item}
                              </p>
                            </button>
                          )
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Footer */}
                  <div className="flex gap-3 border-t border-[#EDE8DC] p-4">
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 rounded-xl border border-[#D7D7D7] py-3 text-sm font-medium"
                    >
                      Batal
                    </button>

                    <button
                      onClick={handleAddSlot}
                      className="flex-1 rounded-xl bg-[#567A58] py-3 text-sm font-medium text-white"
                    >
                      Buat Semua Slot
                    </button>
                  </div>

                </div>

              </div>

            </div>


            {showEditModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

                <div className="w-[560px] rounded-2xl bg-[#F5F0E8] shadow-2xl">

                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5">
                    <h2 className="text-sm font-medium text-[#1E1E1E]">
                      Edit Slot: {selectedSlot?.time}
                    </h2>

                    <button
                      onClick={() => setShowEditModal(false)}
                      className="text-xl text-[#6B7280]"
                    >
                      ×
                    </button>
                  </div>

                  <div className="px-6 pb-6">

                    {/* Jam */}
                    <div className="grid grid-cols-2 gap-3 mb-4">

                      <div>
                        <label>Jam Mulai</label>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full rounded-xl border border-[#EDE8DC] bg-[#F5F0E8] px-4 py-3 outline-none"
                        />
                      </div>

                      <div>
                        <label>Jam Selesai</label>
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full rounded-xl border border-[#EDE8DC] bg-[#F5F0E8] px-4 py-3 outline-none"
                        />
                      </div>

                    </div>

                    {/* Tipe */}
                    <p className="text-sm mb-2">
                      Tipe Kunjungan
                    </p>

                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {["Tatap Muka", "Daring", "Keduanya"].map((item) => (
                        <button
                          key={item}
                          onClick={() => setEditType(item)}
                          className={`rounded-lg py-2 text-sm border
        ${editType === item
                              ? "border-[#6B8F71] bg-[#EEF5EF] text-[#567A58]"
                              : "bg-white"
                            }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    {/* Kuota */}
                    <p className="text-sm mb-2">
                      Kuota
                    </p>

                    <div className="flex items-center gap-2 mb-5">

                      <button
                        onClick={() =>
                          setEditQuota(Math.max(1, editQuota - 1))
                        }
                        className="h-10 w-10 rounded-lg bg-[#ECE8E0]"
                      >
                        -
                      </button>

                      <div className="flex-1 rounded-lg bg-[#ECE8E0] py-3 text-center">
                        {editQuota}
                      </div>

                      <button
                        onClick={() =>
                          setEditQuota(editQuota + 1)
                        }
                        className="h-10 w-10 rounded-lg bg-[#ECE8E0]"
                      >
                        +
                      </button>

                    </div>

                    {/* Keterangan */}
                    <p className="text-sm mb-2">
                      Keterangan
                    </p>

                    <textarea
                      rows="3"
                      defaultValue="Prioritas pasien kontrol rutin"
                      className="mb-5 w-full resize-none rounded-lg bg-[#ECE8E0] p-4 outline-none"
                    />

                    {/* Status Slot */}
                    <div className="mb-6 flex items-center justify-between rounded-xl bg-[#ECE8E0] p-4">

                      <div>
                        <p className="text-sm font-medium">
                          Status Slot
                        </p>

                        <p className="text-xs text-[#6B7280]">
                          Tentukan apakah slot ini dapat dipesan oleh pasien.
                        </p>
                      </div>

                      <div className="flex rounded-full bg-white p-1">

                        <button
                          onClick={() => setEditStatus("Buka")}
                          className={`rounded-full px-4 py-1 text-xs
       ${editStatus === "Buka"
                              ? "bg-[#6B8F71] text-white"
                              : ""
                            }`}
                        >
                          Buka
                        </button>

                        <button
                          onClick={() => setEditStatus("Tutup")}
                          className={`rounded-full px-4 py-1 text-xs
       ${editStatus === "Tutup"
                              ? "bg-red-500 text-white"
                              : ""
                            }`}
                        >
                          Tutup
                        </button>

                      </div>

                    </div>

                    {/* Button */}
                    <button
                      onClick={handleUpdateSlot}
                      className="w-full rounded-xl bg-[#567A58] py-3 text-sm font-medium text-white shadow"
                    >
                      Simpan Perubahan
                    </button>

                    <button
                      onClick={() => {
                        if (selectedSlot) {
                          handleDeleteSlot(selectedSlot.id);
                          setShowEditModal(false);
                        }
                      }}
                    >
                      Hapus Slot Ini
                    </button>

                  </div>

                </div>

              </div>
            )}
          </>
        );
}