function PatientStatsCard({ title, value }) {
  return (
    <div className="bg-prima-card rounded-3xl p-6 shadow-sm border border-prima-sand">
      <div className="space-y-2">
        <p className="text-prima-secondary text-sm">
          {title}
        </p>

        <h3 className="text-3xl font-bold text-prima-text">
          {value}
        </h3>
      </div>
    </div>
  );
}

export default PatientStatsCard;