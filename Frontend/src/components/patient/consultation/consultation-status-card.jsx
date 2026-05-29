const ConsultationStatusCard = ({
  title,
  subtitle,
  doctor,
  time,
  actionText,
  status,
  background,
  buttonColor,
  icon,
}) => {

  return (
    <div
      className={`${background} rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm`}
    >

      {/* TOP */}
      <div className="flex items-start justify-between gap-4">

        {/* TEXT */}
        <div>

          <p className="text-sm font-medium text-prima-secondary uppercase tracking-wide">
            {title}
          </p>

          <h3 className="mt-2 text-xl font-bold text-prima-text">
            {subtitle}
          </h3>

          <p className="mt-2 text-sm text-prima-secondary leading-relaxed">
            {doctor}
          </p>

        </div>

        {/* ICON */}
        <div className="rounded-2xl bg-prima-sand p-3 text-prima-green">

          {icon}

        </div>

      </div>

      {/* MIDDLE */}
      <div className="mt-8 flex items-end justify-between">

        <div>

          <p className="text-3xl font-bold text-prima-text">
            {time}
          </p>

          <p className="mt-1 text-sm text-prima-secondary">
            {status}
          </p>

        </div>

      </div>

      {/* BUTTON */}
      <button
        className={`${buttonColor} mt-6 w-full rounded-2xl py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]`}
      >

        {actionText}

      </button>

    </div>
  )
}

export default ConsultationStatusCard