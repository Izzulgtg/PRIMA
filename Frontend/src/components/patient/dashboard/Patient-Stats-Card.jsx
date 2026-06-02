function PatientStatsCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div
      className="
        bg-prima-card
        rounded-[28px]
        p-6
        border
        border-[#F1ECE4]
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-prima-secondary">
            {title}
          </p>

          <h3 className="mt-3 text-4xl font-bold text-prima-text">
            {value}
          </h3>

        </div>

        {Icon && (
          <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">

            <Icon size={22} />

          </div>
        )}

      </div>

    </div>
  );
}

export default PatientStatsCard;