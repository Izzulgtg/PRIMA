function UpcomingAppointmentCard() {
  return (
    <section className="bg-prima-card rounded-3xl p-6 shadow-sm border border-prima-sand space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-prima-secondary text-sm">
            Jadwal Konsultasi
          </p>

          <h2 className="text-2xl font-bold text-prima-text mt-1">
            Upcoming Appointment
          </h2>
        </div>

        <span className="bg-prima-green/10 text-prima-green px-4 py-2 rounded-full text-sm font-medium">
          Upcoming
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-prima-background rounded-2xl p-4">
          <p className="text-prima-secondary text-sm">
            Dokter
          </p>

          <h3 className="font-semibold text-prima-text mt-1">
            Dr. Andi Saputra
          </h3>
        </div>

        <div className="bg-prima-background rounded-2xl p-4">
          <p className="text-prima-secondary text-sm">
            Tanggal
          </p>

          <h3 className="font-semibold text-prima-text mt-1">
            20 Mei 2026
          </h3>
        </div>

        <div className="bg-prima-background rounded-2xl p-4">
          <p className="text-prima-secondary text-sm">
            Waktu
          </p>

          <h3 className="font-semibold text-prima-text mt-1">
            13:00 WIB
          </h3>
        </div>
      </div>

      <button className="bg-prima-green text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all duration-300">
        Join Consultation
      </button>
    </section>
  );
}

export default UpcomingAppointmentCard;