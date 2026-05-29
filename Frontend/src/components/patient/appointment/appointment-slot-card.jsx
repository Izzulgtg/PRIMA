function AppointmentSlotCard({
  time,
  status,
  selected,
  onClick,
}) {

  return (
    <button
      onClick={onClick}
      className={`
        rounded-2xl border p-5 text-left transition-all duration-300
        ${
          selected
            ? "border-prima-green bg-prima-green text-white shadow-lg"
            : "border-[#E5E7EB] bg-prima-card hover:border-prima-green hover:shadow-md"
        }
      `}
    >

      <p className={`
        text-lg font-bold
        ${selected ? "text-white" : "text-prima-text"}
      `}>
        {time}
      </p>

      <p className={`
        mt-2 text-sm
        ${selected ? "text-white/80" : "text-prima-secondary"}
      `}>
        {status}
      </p>

    </button>
  )
}

export default AppointmentSlotCard