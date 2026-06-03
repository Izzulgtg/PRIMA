function MedicalHistoryFilter({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
        rounded-xl
        border border-[#E7E1D8]
        bg-white
        px-4 py-2
        text-sm
        text-prima-text
        focus:outline-none
      "
    >
      <option value="">
        Semua Status
      </option>

      <option value="selesai">
        Selesai
      </option>

      <option value="menunggu">
        Menunggu
      </option>

      <option value="dibatalkan">
        Dibatalkan
      </option>
    </select>
  );
}

export default MedicalHistoryFilter;