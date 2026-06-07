import { useState } from "react";

function AppointmentForm({
  selectedDate,
  selectedSlot,
  onSubmit,
}) {
  const [formData, setFormData] =
    useState({
      keluhan_utama: "",
      durasi_keluhan: "",
      jenis_kunjungan: "tatap_muka",
      metode_bayar: "bpjs",
    });

  const handleChange = (
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.jenis_kunjungan) {
      alert(
        "Pilih jenis kunjungan terlebih dahulu"
      );
      return;
    }

    if (!formData.metode_bayar) {
      alert(
        "Pilih metode pembayaran"
      );
      return;
    }

    if (
      !formData.keluhan_utama.trim()
    ) {
      alert(
        "Keluhan utama wajib diisi"
      );
      return;
    }

    onSubmit(formData);
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
          value={
            selectedSlot
              ? `${selectedSlot.jam_mulai} - ${selectedSlot.jam_selesai}`
              : ""
          }
          className="w-full rounded-xl bg-prima-background p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-prima-secondary">
          Jenis Kunjungan
        </label>

        <select
          value={
            formData.jenis_kunjungan
          }
          onChange={(e) =>
            handleChange(
              "jenis_kunjungan",
              e.target.value
            )
          }
          className="w-full rounded-xl border border-[#E5E7EB] p-3"
        >
          <option value="tatap_muka">
            Tatap Muka
          </option>

          <option value="daring">
            Online
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm text-prima-secondary">
          Durasi Keluhan
        </label>

        <input
          type="text"
          placeholder="Contoh: 3 hari"
          value={
            formData.durasi_keluhan
          }
          onChange={(e) =>
            handleChange(
              "durasi_keluhan",
              e.target.value
            )
          }
          className="w-full rounded-xl border border-[#E5E7EB] p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-prima-secondary">
          Keluhan Utama
        </label>

        <textarea
          rows={5}
          value={
            formData.keluhan_utama
          }
          onChange={(e) =>
            handleChange(
              "keluhan_utama",
              e.target.value
            )
          }
          placeholder="Tuliskan keluhan Anda..."
          className="w-full rounded-xl border border-[#E5E7EB] p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-prima-secondary">
          Metode Pembayaran
        </label>

        <select
          value={formData.metode_bayar}
          onChange={(e) =>
            handleChange(
              "metode_bayar",
              e.target.value
            )
          }
          className="w-full rounded-xl border border-[#E5E7EB] p-3"
        >
          <option value="bpjs">
            BPJS
          </option>

          <option value="umum">
            Umum
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-2xl bg-prima-green py-3 font-medium text-white hover:opacity-90"
      >
        Konfirmasi Pendaftaran
      </button>
    </form>
  );
}

export default AppointmentForm;