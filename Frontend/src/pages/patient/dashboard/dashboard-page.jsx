import {
  Calendar,
  MessageCircle,
  FileText,
  Shield,
} from 'lucide-react'

import QuickActionCard from '@/components/patient/dashboard/quick-action-card'
import ArticleCard from '@/components/patient/dashboard/article-card'

const PatientDashboardPage = () => {
  return (
    <div className="min-h-screen bg-prima-background px-6 py-6">

      {/* HERO SECTION */}
      <div className="overflow-hidden rounded-[32px] bg-prima-green">

        <div className="flex flex-col justify-between gap-8 p-8 lg:flex-row lg:items-center">

          <div className="max-w-2xl">

            <h1 className="text-4xl font-semibold leading-tight text-white">
              Halo Budi, jangan lupa janji temu Anda Besok pukul 09:00.
            </h1>

            <p className="mt-4 text-sm text-white/80">
              Senin, 20 Mei 2024
            </p>

          </div>

          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600"
              alt="Healthcare"
              className="h-48 w-80 rounded-3xl object-cover opacity-80"
            />
          </div>

        </div>
      </div>

      {/* QUICK ACTION */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

        <QuickActionCard
          title="Daftar Berobat"
          description="Buat janji temu baru"
          icon={<Calendar className="h-5 w-5 text-prima-green" />}
        />

        <QuickActionCard
          title="Konsultasi Daring"
          description="Chat dokter sekarang"
          notification
          icon={<MessageCircle className="h-5 w-5 text-prima-teal" />}
        />

        <QuickActionCard
          title="Riwayat Berobat"
          description="Lihat catatan medis"
          icon={<FileText className="h-5 w-5 text-prima-terracotta" />}
        />

        <QuickActionCard
          title="Keamanan Data"
          description="Privasi & pengaturan"
          icon={<Shield className="h-5 w-5 text-prima-secondary" />}
        />

      </div>

      {/* HEALTH TIPS */}
      <div className="mt-6 overflow-hidden rounded-[32px] bg-sky-200">

        <div className="flex flex-col justify-between gap-6 p-6 lg:flex-row lg:items-center">

          <div className="max-w-2xl">

            <span className="rounded-full bg-prima-text px-3 py-1 text-xs font-medium text-white">
              TIPS SEHAT
            </span>

            <h2 className="mt-4 text-3xl font-semibold text-prima-text">
              Pentingnya Hidrasi Saat Cuaca Panas
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-prima-text/80">
              Pastikan Anda mengonsumsi minimal 2 liter air per hari untuk menjaga metabolisme tubuh dan konsentrasi selama beraktivitas di bawah sinar matahari.
            </p>

            <button className="mt-5 rounded-full bg-prima-text px-5 py-2 text-sm font-medium text-white transition hover:opacity-90">
              Baca Selengkapnya
            </button>

          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=500"
              alt="Tips"
              className="h-48 w-72 rounded-3xl object-cover"
            />
          </div>

        </div>
      </div>

      {/* ARTICLE SECTION */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

        <ArticleCard
          image="https://images.unsplash.com/photo-1584515933487-779824d29309"
          category="PREVENTIF"
          title="Pentingnya Mencuci Tangan di Era Pasca Pandemi"
          date="13 Apr 2025"
        />

        <ArticleCard
          image="https://images.unsplash.com/photo-1482049016688-2d3e1b311543"
          category="DIET"
          title="Menu Sehat Seminggu untuk Penderita Diabetes"
          date="15 Apr 2025"
        />

        <ArticleCard
          image="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f"
          category="LIFESTYLE"
          title="Gejala Kolesterol Tinggi yang Sering Diabaikan"
          date="19 Apr 2025"
        />

      </div>

      {/* FOOTER */}
      <footer className="mt-10 rounded-3xl bg-prima-sand px-6 py-8">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h3 className="text-lg font-semibold text-prima-green">
              PRIMA
            </h3>

            <p className="mt-1 text-sm text-prima-secondary">
              © 2026 PRIMA Healthcare
            </p>
          </div>

          <div className="flex gap-6 text-sm text-prima-secondary">
            <button>Kebijakan Privasi</button>
            <button>Syarat & Ketentuan</button>
            <button>Pusat Bantuan</button>
          </div>

        </div>

      </footer>

    </div>
  )
}

export default PatientDashboardPage