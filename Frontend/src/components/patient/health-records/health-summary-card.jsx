function HealthSummaryCard({
  title,
  value,
  icon,
}) {

  return (
    <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

      {/* ICON */}
      <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">

        {icon}

      </div>

      {/* TEXT */}
      <div className="mt-5">

        <p className="text-sm text-prima-secondary">
          {title}
        </p>

        <h2 className="text-4xl font-bold text-prima-text mt-2">
          {value}
        </h2>

      </div>

    </div>
  )
}

export default HealthSummaryCard