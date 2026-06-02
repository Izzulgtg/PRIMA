function UpcomingAppointmentCard({
  appointment,
}) {
  if (!appointment) {
    return (
      <section className="bg-prima-card rounded-3xl p-6 shadow-sm border border-prima-sand">
        <h2 className="text-xl font-semibold text-prima-text">
          Belum ada jadwal konsultasi
        </h2>
      </section>
    );
  }

  return (
    <section className="bg-prima-card rounded-3xl p-6 shadow-sm border border-prima-sand">

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="bg-prima-background rounded-2xl p-4">
          <p className="text-prima-secondary text-sm">
            Dokter
          </p>

          <h3 className="font-semibold text-prima-text mt-1">
            {appointment.doctor}
          </h3>
        </div>

        <div className="bg-prima-background rounded-2xl p-4">
          <p className="text-prima-secondary text-sm">
            Tanggal
          </p>

          <h3 className="font-semibold text-prima-text mt-1">
            {appointment.date}
          </h3>
        </div>

        <div className="bg-prima-background rounded-2xl p-4">
          <p className="text-prima-secondary text-sm">
            Waktu
          </p>

          <h3 className="font-semibold text-prima-text mt-1">
            {appointment.time}
          </h3>
        </div>

      </div>

    </section>
  );
}

export default UpcomingAppointmentCard;