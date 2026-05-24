import PatientStatsCard from "@/components/patient/dashboard/Patient-Stats-Card"
import UpcomingAppointmentCard from "@/components/patient/dashboard/Upcoming-Appointment-Card"
import QuickActionCard from "@/components/patient/dashboard/Quick-Action-Card"

const PatientDashboardPage = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-[#1E1E1E]">
          Selamat Datang, [Nama Patient]
        </h1>

        <p className="mt-2 text-[#6B7280]">
          Kelola jadwal konsultasi dan riwayat kesehatan Anda.
        </p>
      </div>
    </div>
  )
}

export default PatientDashboardPage