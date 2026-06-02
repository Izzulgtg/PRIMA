function RecentActivityList({
  activities = [],
  loading = false,
}) {
  return (
    <section className="bg-prima-card rounded-[32px] p-6 border border-[#F1ECE4] shadow-sm">

      {/* HEADER */}
      <div>

        <p className="text-sm text-prima-secondary">
          Aktivitas Terbaru
        </p>

        <h2 className="text-2xl font-bold text-prima-text mt-1">
          Recent Activity
        </h2>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="py-8 text-center">

          <p className="text-prima-secondary">
            Memuat aktivitas...
          </p>

        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        activities.length === 0 && (
          <div className="py-8 text-center">

            <p className="text-prima-secondary">
              Belum ada aktivitas.
            </p>

          </div>
        )}

      {/* DATA */}
      {!loading &&
        activities.length > 0 && (
          <div className="mt-6 max-h-[500px] overflow-y-auto pr-2">

            <div className="space-y-6">

              {activities.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >

                    {/* TIMELINE */}
                    <div className="flex flex-col items-center">

                      <div className="w-3 h-3 rounded-full bg-prima-green" />

                      {index !==
                        activities.length - 1 && (
                        <div className="w-[2px] flex-1 bg-[#E8E2D8] mt-2" />
                      )}

                    </div>

                    {/* CONTENT */}
                    <div className="pb-2">

                      <h3 className="font-semibold text-prima-text">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-prima-secondary">
                        {item.time}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>
        )}

    </section>
  );
}

export default RecentActivityList;