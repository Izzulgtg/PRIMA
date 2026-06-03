function HealthSummaryCard({
  title,
  value,
  icon,
}) {
  return (
    <div
      className="
        bg-prima-card
        rounded-[28px]
        p-6
        min-h-[170px]
        border border-[#F1ECE4]
        shadow-sm
        hover:shadow-md
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">
        {icon}
      </div>

      <p className="mt-5 text-sm text-prima-secondary">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold tracking-tight text-prima-text">
        {value}
      </h2>
    </div>
  );
}

export default HealthSummaryCard;