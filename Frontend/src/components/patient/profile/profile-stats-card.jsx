function ProfileStatsCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-prima-card rounded-2xl p-5 border border-[#F1ECE4] shadow-sm">
      <div className="flex items-center gap-4">

        <div className="w-12 h-12 rounded-xl bg-prima-sand flex items-center justify-center text-prima-green">
          {icon}
        </div>

        <div>
          <p className="text-sm text-prima-secondary">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-prima-text">
            {value}
          </h3>
        </div>

      </div>
    </div>
  );
}

export default ProfileStatsCard;