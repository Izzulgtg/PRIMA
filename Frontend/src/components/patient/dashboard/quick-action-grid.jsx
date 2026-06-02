import {
  CalendarPlus,
  Video,
  FileText,
  UserRound,
} from "lucide-react";

import QuickActionCard from "./quick-action-card";

function QuickActionGrid() {
  const actions = [
    {
      title: "Daftar Berobat",
      description: "Buat janji temu baru",
      icon: CalendarPlus,
      path: "/patient/appointment",
    },
    {
      title: "Konsultasi Online",
      description: "Masuk ruang konsultasi",
      icon: Video,
      path: "/patient/consultation",
    },
    {
      title: "Riwayat Medis",
      description: "Lihat data pemeriksaan",
      icon: FileText,
      path: "/patient/health-records",
    },
    {
      title: "Profil Kesehatan",
      description: "Kelola informasi pribadi",
      icon: UserRound,
      path: "/patient/profile",
    },
  ];

  return (
    <section className="bg-prima-card rounded-[32px] p-6 border border-[#F1ECE4] shadow-sm">

      {/* HEADER */}
      <div>

        <p className="text-sm text-prima-secondary">
          Quick Access
        </p>

        <h2 className="text-2xl font-bold text-prima-text mt-1">
          Quick Actions
        </h2>

      </div>

      {/* GRID */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

        {actions.map((action) => (
          <QuickActionCard
            key={action.title}
            title={action.title}
            description={action.description}
            icon={action.icon}
            path={action.path}
          />
        ))}

      </div>

    </section>
  );
}

export default QuickActionGrid;