import { useNavigate } from "react-router-dom"

import {
  Clock3,
  CalendarDays,
  Stethoscope,
} from "lucide-react"

import ConsultationStatusCard from "@/components/patient/consultation/consultation-status-card"

function ConsultationPage() {

  const navigate = useNavigate()

  return (
    <div className="space-y-6">

      {/* HERO */}
      <section className="bg-prima-green rounded-[32px] p-8 text-white">

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">

          {/* LEFT */}
          <div className="max-w-2xl">

            <p className="text-sm opacity-80">
              Online Consultation
            </p>

            <h1 className="text-4xl font-bold mt-3 leading-tight">
              Konsultasi Online Bersama Dokter
            </h1>

            <p className="mt-5 text-lg opacity-90 leading-relaxed">
              Pantau jadwal konsultasi, masuk ruang tunggu,
              dan lakukan konsultasi online secara aman melalui PRIMA.
            </p>

            <button
              onClick={() => navigate("/patient/consultation-room")}
              className="mt-8 bg-white text-prima-green px-6 py-3 rounded-2xl font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Join Consultation
            </button>

          </div>

          {/* RIGHT */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 w-[320px] border border-white/10">

            <p className="text-sm opacity-80">
              Doctor Status
            </p>

            <h3 className="text-3xl font-bold mt-3">
              Online
            </h3>

            <p className="mt-3 opacity-80 leading-relaxed">
              Dokter tersedia untuk konsultasi hari ini.
            </p>

            <div className="mt-6 flex items-center gap-2">

              <div className="w-3 h-3 rounded-full bg-green-300 animate-pulse"></div>

              <span className="text-sm">
                Active Session
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* STATUS CARD */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <ConsultationStatusCard
          title="Upcoming Session"
          subtitle="Jadwal Konsultasi"
          doctor="Dr. Sarah Johnson"
          time="14:55 WIB"
          actionText="Waiting Session"
          status="Waiting Session"
          background="bg-prima-card"
          buttonColor="bg-prima-green text-white"
          icon={
            <CalendarDays className="h-5 w-5" />
          }
        />

        <ConsultationStatusCard
          title="Countdown"
          subtitle="Sesi Dimulai"
          doctor="Konsultasi dimulai dalam"
          time="00:14:32"
          actionText="Prepare Session"
          status="Prepare Session"
          background="bg-prima-card"
          buttonColor="bg-prima-teal text-white"
          icon={
            <Clock3 className="h-5 w-5" />
          }
        />

        <ConsultationStatusCard
          title="Doctor Online"
          subtitle="Ready Consultation"
          doctor="Dokter sedang aktif"
          time="Online"
          actionText="Ready"
          status="Ready"
          background="bg-prima-card"
          buttonColor="bg-prima-green text-white"
          icon={
            <Stethoscope className="h-5 w-5" />
          }
        />

      </section>

      

    </div>
  )
}

export default ConsultationPage