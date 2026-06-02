const ConsultationStatusCard = ({
  title,
  subtitle,
  doctor,
  time,
  actionText,
  status,
  background = "bg-white",
  buttonColor = "bg-prima-green text-white",
  icon,
  onAction,
  disabled = false,
  loading = false,
}) => {
  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-green-600";

      case "waiting":
        return "text-amber-600";

      case "finished":
        return "text-prima-secondary";

      case "cancelled":
        return "text-red-500";

      default:
        return "text-prima-secondary";
    }
  };

  return (
    <div
      className={`
        ${background}
        rounded-[28px]
        p-6
        border
        border-[#F1ECE4]
        shadow-sm
      `}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">

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

        <div className="rounded-2xl bg-prima-sand p-3 text-prima-green">
          {icon}
        </div>

      </div>

      {/* CONTENT */}
      <div className="mt-8 flex items-end justify-between">

        <div>

          <p className="text-3xl font-bold text-prima-text">
            {time}
          </p>

          <p
            className={`
              mt-1
              text-sm
              font-medium
              ${getStatusColor()}
            `}
          >
            {status}
          </p>

        </div>

      </div>

      {/* ACTION BUTTON */}
      <button
        type="button"
        onClick={onAction}
        disabled={disabled || loading}
        className={`
          ${buttonColor}
          mt-6
          w-full
          rounded-2xl
          py-3
          text-sm
          font-semibold
          transition-all
          duration-300
          hover:scale-[1.02]
          disabled:opacity-50
          disabled:cursor-not-allowed
        `}
      >
        {loading
          ? "Memproses..."
          : actionText}
      </button>

    </div>
  );
};

export default ConsultationStatusCard;