import { useState } from "react";

function AppointmentForm({
  selectedDate,
  selectedSlot,
  onSubmit,
}) {
  const [complaint, setComplaint] =
    useState("");

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    onSubmit({
      tanggal: selectedDate,
      jam: selectedSlot,
      keluhan: complaint,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-[#F1ECE4] bg-prima-card p-6 shadow-sm"
    >

      <h2 className="mb-6 text-2xl font-bold text-prima-text">
        Konfirmasi Pendaftaran
      </h2>

      <div className="space-y-4">

        <div>

          <label className="mb-2 block text-sm text-prima-secondary">
            Tanggal Pemeriksaan
          </label>

          <input
            value={selectedDate}
            disabled
            className="w-full rounded-xl bg-prima-background p-3"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-prima-secondary">
            Jam Konsultasi
          </label>

          <input
            value={selectedSlot}
            disabled
            className="w-full rounded-xl bg-prima-background p-3"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-prima-secondary">
            Keluhan Awal
          </label>

          <textarea
            rows={4}
            value={complaint}
            onChange={(e) =>
              setComplaint(
                e.target.value
              )
            }
            placeholder="Tuliskan keluhan Anda..."
            className="w-full rounded-xl border border-[#E5E7EB] p-3 focus:border-prima-green focus:outline-none"
          />

        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-prima-green py-3 font-medium text-white transition hover:opacity-90"
        >
          Daftar Pemeriksaan
        </button>

      </div>

    </form>
  );
}

export default AppointmentForm;