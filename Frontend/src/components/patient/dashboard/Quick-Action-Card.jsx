const QuickActionCard = ({
  title,
  description,
  icon,
  notification,
}) => {
  return (
    <div className="relative rounded-3xl bg-prima-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">

      {notification && (
        <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-red-500" />
      )}

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-prima-sand">
        {icon}
      </div>

      <h3 className="text-base font-semibold text-prima-text">
        {title}
      </h3>

      <p className="mt-1 text-sm text-prima-secondary">
        {description}
      </p>
    </div>
  )
}

export default QuickActionCard