import DashboardHero from "@/components/patient/dashboard/dashboard-hero";
import PatientStatsCard from "@/components/patient/dashboard/patient-stats-card";
import UpcomingAppointmentCard from "@/components/patient/dashboard/upcoming-appointment-card";
import QuickActionGrid from "@/components/patient/dashboard/quick-action-grid";
import RecentActivityList from "@/components/patient/dashboard/recent-activity-list";

function PatientDashboardPage() {
  const stats = [
    {
      title: "Total Konsultasi",
      value: 12,
    },
    {
      title: "Janji Aktif",
      value: 2,
    },
    {
      title: "Resep Aktif",
      value: 5,
    },
    {
      title: "Pemeriksaan Terakhir",
      value: "20 Mei",
    },
  ];

  const activities = [
    {
      title: "Konsultasi selesai dengan Dr. Budi",
      time: "2 jam lalu",
    },
    {
      title: "Resep baru berhasil ditambahkan",
      time: "Kemarin",
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardHero />

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <PatientStatsCard
            key={index}
            title={item.title}
            value={item.value}
          />
        ))}
      </section>

      <UpcomingAppointmentCard />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <QuickActionGrid />
        </div>

        <RecentActivityList activities={activities} />
      </div>
    </div>
  );
}

export default PatientDashboardPage;