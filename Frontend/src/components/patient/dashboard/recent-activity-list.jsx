function RecentActivityList({ activities }) {
  return (
    <section className="bg-prima-card rounded-3xl p-6 shadow-sm border border-prima-sand space-y-6">
      <div>
        <p className="text-prima-secondary text-sm">
          Aktivitas Terbaru
        </p>

        <h2 className="text-2xl font-bold text-prima-text mt-1">
          Recent Activity
        </h2>
      </div>

      <div className="space-y-4">
        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4"
          >
            <div className="w-3 h-3 rounded-full bg-prima-green mt-2" />

            <div>
              <h3 className="font-medium text-prima-text">
                {item.title}
              </h3>

              <p className="text-sm text-prima-secondary mt-1">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentActivityList;