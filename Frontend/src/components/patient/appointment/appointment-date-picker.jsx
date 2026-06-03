function AppointmentDatePicker({
  value,
  onChange,
}) {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  return (
    <div>

      <h2 className="text-2xl font-bold text-prima-text">
        Pilih Tanggal Pemeriksaan
      </h2>

      <p className="mt-2 text-prima-secondary">
        Tentukan tanggal konsultasi yang
        Anda inginkan.
      </p>

      <input
        type="date"
        min={today}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          mt-8
          w-full
          rounded-2xl
          border border-[#E5E7EB]
          bg-white
          p-4
          text-prima-text
          shadow-sm
          transition
          focus:border-prima-green
          focus:ring-2
          focus:ring-prima-green/20
          focus:outline-none
        "
      />

    </div>
  );
}

export default AppointmentDatePicker;