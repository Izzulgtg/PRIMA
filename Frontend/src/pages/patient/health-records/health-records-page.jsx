import {
  Activity,
  Pill,
  HeartPulse,
} from "lucide-react"

import MedicalRecordCard from "@/components/patient/health-records/medical-record-card"

function HealthRecordsPage() {

  const records = [
    {
      date: "24 Mei 2026",
      doctor: "Dr. Sarah Johnson",
      diagnosis: "Vertigo ringan dan gangguan lambung",
      complaint: "Pusing, mual, dan tubuh terasa lemas.",
      status: "Completed",
    },
    {
      date: "12 Mei 2026",
      doctor: "Dr. Andi Saputra",
      diagnosis: "Flu dan demam ringan",
      complaint: "Demam dan sakit tenggorokan selama 3 hari.",
      status: "Reviewed",
    },
    {
      date: "05 Mei 2026",
      doctor: "Dr. Michael Adrian",
      diagnosis: "Hipertensi ringan",
      complaint: "Tekanan darah meningkat dan sakit kepala.",
      status: "Prescription",
    },
  ]

  return (
    <div className="space-y-6">

      {/* HERO */}
      <section className="bg-prima-green rounded-[32px] p-8 text-white">

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">

          {/* LEFT */}
          <div className="max-w-2xl">

            <p className="text-sm opacity-80">
              Electronic Medical Record
            </p>

            <h1 className="text-4xl font-bold mt-3 leading-tight">
              Riwayat Kesehatan & Rekam Medis
            </h1>

            <p className="mt-5 text-lg opacity-90 leading-relaxed">
              Pantau riwayat konsultasi, diagnosis,
              dan resep obat Anda secara aman melalui PRIMA.
            </p>

          </div>

          {/* RIGHT */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 w-[320px] border border-white/10">

            <p className="text-sm opacity-80">
              Health Status
            </p>

            <h3 className="text-3xl font-bold mt-3">
              Stable
            </h3>

            <p className="mt-3 opacity-80 leading-relaxed">
              Kondisi kesehatan terakhir dalam status baik.
            </p>

            <div className="mt-6 flex items-center gap-2">

              <div className="w-3 h-3 rounded-full bg-green-300 animate-pulse"></div>

              <span className="text-sm">
                Medical Record Active
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* SUMMARY CARD */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CARD 1 */}
        <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

          <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">

            <HeartPulse size={22} />

          </div>

          <p className="text-sm text-prima-secondary mt-5">
            Total Consultation
          </p>

          <h2 className="text-4xl font-bold text-prima-text mt-2">
            12
          </h2>

        </div>

        {/* CARD 2 */}
        <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

          <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">

            <Pill size={22} />

          </div>

          <p className="text-sm text-prima-secondary mt-5">
            Active Prescription
          </p>

          <h2 className="text-4xl font-bold text-prima-text mt-2">
            4
          </h2>

        </div>

        {/* CARD 3 */}
        <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

          <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">

            <Activity size={22} />

          </div>

          <p className="text-sm text-prima-secondary mt-5">
            Health Monitoring
          </p>

          <h2 className="text-4xl font-bold text-prima-text mt-2">
            Stable
          </h2>

        </div>

      </section>

      {/* MEDICAL HISTORY */}
      <section className="bg-prima-card rounded-[32px] p-8 border border-[#F1ECE4] shadow-sm">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-prima-secondary">
              Medical Timeline
            </p>

            <h2 className="text-3xl font-bold text-prima-text mt-2">
              Consultation History
            </h2>

          </div>

          <button className="text-prima-teal font-medium hover:underline">

            View All

          </button>

        </div>

        {/* RECORD LIST */}
        <div className="mt-8 space-y-5">

          {records.map((record, index) => (
            <MedicalRecordCard
              key={index}
              date={record.date}
              doctor={record.doctor}
              diagnosis={record.diagnosis}
              complaint={record.complaint}
              status={record.status}
            />
          ))}

        </div>

      </section>

    </div>
  )
}

export default HealthRecordsPage