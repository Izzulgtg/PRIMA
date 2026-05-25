const ConsultationStatusCard = ({
  title,
  subtitle,
  doctor,
  time,
  actionText,
  background,
  buttonColor,
  icon,
}) => {
  return (
    <div
      className={`${background} rounded-3xl p-5 text-white shadow-sm`}
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium uppercase opacity-80">
            {title}
          </p>

          <h3 className="mt-2 text-lg font-semibold">
            {subtitle}
          </h3>

          <p className="mt-1 text-sm opacity-80">
            {doctor}
          </p>
        </div>

        <div className="rounded-xl bg-white/20 p-3">
          {icon}
        </div>

      </div>

      <div className="mt-8 flex items-center justify-between">

        <p className="text-2xl font-semibold">
          {time}
        </p>

        <span className="text-sm opacity-80">
          Menunggu antrean
        </span>

      </div>

      <button
        className={`${buttonColor} mt-5 w-full rounded-2xl py-3 text-sm font-medium transition hover:opacity-90`}
      >
        {actionText}
      </button>
    </div>
  )
}

export default ConsultationStatusCard