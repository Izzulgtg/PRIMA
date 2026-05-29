import QuickActionCard from "./quick-action-card";

function QuickActionGrid() {
  const actions = [
    {
      title: "Daftar Berobat",
      description: "Buat janji temu baru",
    },
    {
      title: "Konsultasi Online",
      description: "Masuk ruang konsultasi",
    },
    {
      title: "Riwayat Medis",
      description: "Lihat data pemeriksaan",
    },
    {
      title: "Profil Kesehatan",
      description: "Kelola informasi pribadi",
    },
  ];

  return (
    <section className="bg-prima-card rounded-3xl p-6 shadow-sm border border-prima-sand space-y-6">
      <div>
        <p className="text-prima-secondary text-sm">
          Quick Access
        </p>

        <h2 className="text-2xl font-bold text-prima-text mt-1">
          Quick Actions
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((item, index) => (
          <QuickActionCard
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}

export default QuickActionGrid;