import { useEffect, useState } from "react";

import DashboardHero from "@/components/patient/dashboard/dashboard-hero";
import PatientStatsCard from "@/components/patient/dashboard/patient-stats-card";
import UpcomingAppointmentCard from "@/components/patient/dashboard/upcoming-appointment-card";
import QuickActionGrid from "@/components/patient/dashboard/quick-action-grid";
import RecentActivityList from "@/components/patient/dashboard/recent-activity-list";

function PatientDashboardPage() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [upcomingAppointment, setUpcomingAppointment] =
    useState(null);

  useEffect(() => {
    /*
      Karena login masih dummy,
      kita buat data dummy juga
    */

    const dummyPatient = {
      nama: "Verdi",
      email: "verdi@gmail.com",
    };

    setProfile(dummyPatient);

    setStats([
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
        value: 3,
      },
      {
        title: "Pemeriksaan Terakhir",
        value: "29 Mei",
      },
    ]);

    setActivities([
      {
        title: "Konsultasi dengan Dr. Dila Andini",
        time: "29 Mei 2026",
      },
      {
        title: "Pemeriksaan Umum",
        time: "20 Mei 2026",
      },
      {
        title: "Pengambilan Resep",
        time: "18 Mei 2026",
      },
      {
        title: "Konsultasi Online",
        time: "15 Mei 2026",
      },
      {
        title: "Medical Checkup",
        time: "10 Mei 2026",
      },
    ]);

    setUpcomingAppointment({
      doctor: "Dila Andini",
      date: "5 Juni 2026",
      time: "13:00 WIB",
    });
  }, []);

  return (
    <div className="space-y-6">

      <DashboardHero
        patientName={profile?.nama || "Pasien"}
        appointment={upcomingAppointment}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <PatientStatsCard
            key={index}
            title={item.title}
            value={item.value}
          />
        ))}
      </section>

      <UpcomingAppointmentCard
        appointment={upcomingAppointment}
      />

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">
          <QuickActionGrid />
        </div>

        <RecentActivityList
          loading={false}
          activities={activities}
        />

      </section>

    </div>
  );
}

export default PatientDashboardPage;