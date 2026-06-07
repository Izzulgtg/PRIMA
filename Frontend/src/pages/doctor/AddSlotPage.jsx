import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddSlotPage() {
  const navigate = useNavigate();

  const [type, setType] = useState("Keduanya");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("12:00");

  const handleSubmit = () => {
    console.log({
      type,
      startTime,
      endTime,
    });

    navigate("/doctor/schedule");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-[20px] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDE8DC] px-6 py-5">
          <h2 className="text-sm font-medium text-[#1E1E1E]">
            Tambah Slot Jadwal
          </h2>

          <button
            onClick={() => navigate("/doctor/schedule")}
            className="text-xl text-[#6B7280]"
          >
            ×
          </button>
        </div>

        <div className="p-5">
          {/* Dokter */}
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#F5F0E8] p-4">
            <div className="h-12 w-12 rounded-full bg-[#6B8F71]" />

            <div>
              <p className="text-sm font-medium text-[#1E1E1E]">
                dr. Dila
              </p>

              <p className="text-xs text-[#4A7C8E]">
                Poli Umum
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

            <div className="flex gap-2">
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(
                (d) => (
                  <button
                    key={d}
                    className="rounded-lg bg-[#6B8F71] px-4 py-2 text-xs font-medium text-white"
                  >
                    {d}
                  </button>
                )
              )}
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
                onChange={(e) =>
                  setStartTime(e.target.value)
                }
                className="w-full rounded-xl border border-[#EDE8DC] bg-[#F5F0E8] px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs text-[#6B7280]">
                Jam Selesai
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) =>
                  setEndTime(e.target.value)
                }
                className="w-full rounded-xl border border-[#EDE8DC] bg-[#F5F0E8] px-4 py-3 outline-none"
              />
            </div>
          </div>

          {/* Tipe */}
          <div className="mb-5">
            <p className="mb-3 text-sm text-[#1E1E1E]">
              Tipe Kunjungan
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                "Tatap Muka",
                "Daring",
                "Keduanya",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setType(item)}
                  className={`rounded-xl border p-4 transition ${
                    type === item
                      ? "border-[#6B8F71] bg-[#EEF5EF]"
                      : "border-[#EDE8DC]"
                  }`}
                >
                  <p className="text-xs font-medium">
                    {item}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Rentang */}
          <div className="mb-5 rounded-xl bg-[#F5F0E8] p-4">
            <p className="mb-3 text-sm font-medium">
              Rentang Waktu Berulang
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-[#6B7280]">
                  Berlaku dari
                </label>

                <input
                  type="text"
                  value="01 Mei 2025"
                  readOnly
                  className="w-full rounded-lg border border-[#EDE8DC] bg-white px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-[#6B7280]">
                  Hingga
                </label>

                <input
                  type="text"
                  value="31 Mei 2025"
                  readOnly
                  className="w-full rounded-lg border border-[#EDE8DC] bg-white px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-[#EDE8DC] p-4">
          <button
            onClick={() =>
              navigate("/doctor/schedule")
            }
            className="flex-1 rounded-xl border border-[#D7D7D7] py-3 text-sm font-medium"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-[#567A58] py-3 text-sm font-medium text-white"
          >
            Buat Semua Slot
          </button>
        </div>
      </div>
    </div>
  );
}