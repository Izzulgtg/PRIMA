function DashboardHero() {
  return (
    <section className="bg-prima-green rounded-3xl p-8 text-white shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div>
            <p className="text-sm text-white/80">
              Dashboard Pasien
            </p>

            <h1 className="text-4xl font-bold mt-2">
              Selamat Datang, Verdi 👋
            </h1>
          </div>

          <p className="text-white/90 text-lg leading-relaxed">
            Tetap jaga kesehatanmu hari ini dan
            pantau jadwal konsultasi dengan mudah.
          </p>

          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm w-fit">
            <p className="text-sm text-white/70">
              Konsultasi Berikutnya
            </p>

            <h3 className="text-xl font-semibold mt-1">
              Dr. Andi Saputra
            </h3>

            <p className="text-white/80 mt-1">
              Hari ini • 13:00 WIB
            </p>
          </div>

          <button className="bg-white text-prima-green font-semibold px-6 py-3 rounded-2xl hover:opacity-90 transition-all duration-300">
            Masuk Konsultasi
          </button>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <div className="space-y-3">
              <p className="text-sm text-white/70">
                Status Kesehatan
              </p>

              <h3 className="text-2xl font-bold">
                Kondisi Stabil
              </h3>

              <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                Jangan lupa melakukan pemeriksaan rutin
                untuk menjaga kesehatan tubuh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardHero;