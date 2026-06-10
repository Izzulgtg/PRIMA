import { useEffect, useState } from "react";

import { getProfile } from "@/services/patient/profile-service";
import { getDashboard } from "@/services/patient/dashboard-service";
import DashboardHero from "@/components/patient/dashboard/dashboard-hero";
import PatientStatsCard from "@/components/patient/dashboard/patient-stats-card";
import UpcomingAppointmentCard from "@/components/patient/dashboard/upcoming-appointment-card";
import QuickActionGrid from "@/components/patient/dashboard/quick-action-grid";
import RecentActivityList from "@/components/patient/dashboard/recent-activity-list";
import ArticleCard from "@/components/patient/dashboard/article-card";

function PatientDashboardPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [upcomingAppointment, setUpcomingAppointment] =
    useState(null);

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          profileData,
          dashboardData,
        ] = await Promise.all([
          getProfile(),
          getDashboard(),
        ]);

        setProfile(profileData);

        // Dashboard summary
        setStats([
          {
            title: "Total Pendaftaran",
            value:
              dashboardData.total_pendaftaran ||
              0,
          },
          {
            title: "Total Rekam Medis",
            value:
              dashboardData.total_rekam_medis ||
              0,
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
        ]);

        setUpcomingAppointment(
          dashboardData.upcoming
        );

        setArticles([
          {
            image:
              "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
            category: "Kesehatan",
            title:
              "Pentingnya Pemeriksaan Kesehatan Secara Berkala",
            date: "2 Juni 2026",
          },
          {
            image:
              "https://images.unsplash.com/photo-1584515933487-779824d29309",
            category: "Lifestyle",
            title:
              "5 Kebiasaan Sehat yang Bisa Dilakukan Setiap Hari",
            date: "30 Mei 2026",
          },
          {
            image:
              "https://images.unsplash.com/photo-1512678080530-7760d81faba6",
            category: "Nutrisi",
            title:
              "Panduan Pola Makan Seimbang untuk Menjaga Imunitas",
            date: "28 Mei 2026",
          },
        ]);
      } catch (error) {
        console.error(error);
        setError("Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-prima-secondary">
          Memuat dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <DashboardHero
        patientName={
          loading
            ? "Memuat..."
            : profile?.nama_lengkap || "Pasien"
        }
        appointment={upcomingAppointment}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <PatientStatsCard
            key={item.title}
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
          loading={loading}
          activities={activities}
        />

      </section>

      <section className="space-y-4">

        <div>
          <p className="text-sm text-prima-secondary">
            Edukasi Kesehatan
          </p>

          <h2 className="text-2xl font-bold text-prima-text mt-1">
            Artikel Terbaru
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard
                key={article.title}
                image={article.image}
                category={article.category}
                title={article.title}
                date={article.date}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-prima-secondary">
                Belum ada artikel tersedia.
              </p>
            </div>
          )}

        </div>

      </section>

    </div>
  );
}

export default PatientDashboardPage;