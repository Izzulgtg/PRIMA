import { useState } from "react";

function AppointmentForm({
  selectedDate,
  selectedSlot,
  onSubmit,
}) {
  const [complaint, setComplaint] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      tanggal: selectedDate,
      jam: selectedSlot,
      keluhan: complaint,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <div>

        <label className="mb-2 block text-sm text-prima-secondary">
          Tanggal Pemeriksaan
        </label>

        <input
          disabled
          value={selectedDate}
          className="w-full rounded-xl bg-prima-background p-3"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm text-prima-secondary">
          Jam Konsultasi
        </label>

        <input
          disabled
          value={selectedSlot}
          className="w-full rounded-xl bg-prima-background p-3"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm text-prima-secondary">
          Keluhan Awal
        </label>

        <textarea
          rows={5}
          value={complaint}
          onChange={(e) =>
            setComplaint(e.target.value)
          }
          placeholder="Tuliskan keluhan Anda..."
          className="
            w-full rounded-xl border border-[#E5E7EB]
            p-3 focus:border-prima-green
            focus:outline-none
          "
        />

      </div>

      <button
        type="submit"
        className="
          w-full rounded-2xl bg-prima-green py-3
          font-medium text-white
          hover:opacity-90
        "
      >
        Konfirmasi Pendaftaran
      </button>

    </form>
  );
}

export default AppointmentForm;