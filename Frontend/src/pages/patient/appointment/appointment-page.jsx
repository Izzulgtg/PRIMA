import { useState } from "react"

import {
  CalendarDays,
  Clock3,
  Stethoscope,
} from "lucide-react"

import AppointmentSlotCard from "@/components/patient/appointment/appointment-slot-card"

function PatientAppointmentPage() {

  const [selectedSlot, setSelectedSlot] = useState("09:00 AM")

  const slots = [
    {
      time: "09:00 AM",
      status: "Available",
    },
    {
      time: "10:00 AM",
      status: "Available",
    },
    {
      time: "11:00 AM",
      status: "Limited Slot",
    },
    {
      time: "01:00 PM",
      status: "Available",
    },
    {
      time: "02:00 PM",
      status: "Busy",
    },
    {
      time: "03:00 PM",
      status: "Available",
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
              Appointment Booking
            </p>

            <h1 className="text-4xl font-bold mt-3 leading-tight">
              Booking Jadwal Pemeriksaan
            </h1>

            <p className="mt-5 text-lg opacity-90 leading-relaxed">
              Pilih jadwal konsultasi sesuai waktu yang tersedia
              dan lakukan pendaftaran pemeriksaan secara online.
            </p>

          </div>

          {/* RIGHT */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 w-[320px] border border-white/10">

            <p className="text-sm opacity-80">
              Doctor Schedule
            </p>

            <h3 className="text-3xl font-bold mt-3">
              Available
            </h3>

            <p className="mt-3 opacity-80 leading-relaxed">
              Jadwal dokter tersedia hari ini.
            </p>

            <div className="mt-6 flex items-center gap-2">

              <div className="w-3 h-3 rounded-full bg-green-300 animate-pulse"></div>

              <span className="text-sm">
                Open Registration
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* APPOINTMENT CONTENT */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">

          {/* DATE CARD */}
          <div className="bg-prima-card rounded-[32px] p-8 border border-[#F1ECE4] shadow-sm">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">

                <CalendarDays size={22} />

              </div>

              <div>

                <p className="text-sm text-prima-secondary">
                  Appointment Date
                </p>

                <h2 className="text-2xl font-bold text-prima-text">
                  24 Mei 2026
                </h2>

              </div>

            </div>

          </div>

          {/* SLOT CARD */}
          <div className="bg-prima-card rounded-[32px] p-8 border border-[#F1ECE4] shadow-sm">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">

                <Clock3 size={22} />

              </div>

              <div>

                <p className="text-sm text-prima-secondary">
                  Available Slots
                </p>

                <h2 className="text-2xl font-bold text-prima-text">
                  Pilih Jam Konsultasi
                </h2>

              </div>

            </div>

            {/* SLOT GRID */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">

              {slots.map((slot) => (
                <AppointmentSlotCard
                  key={slot.time}
                  time={slot.time}
                  status={slot.status}
                  selected={selectedSlot === slot.time}
                  onClick={() => setSelectedSlot(slot.time)}
                />
              ))}

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-prima-card rounded-[32px] p-8 border border-[#F1ECE4] shadow-sm h-fit sticky top-6">

          {/* HEADER */}
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">

              <Stethoscope size={22} />

            </div>

            <div>

              <p className="text-sm text-prima-secondary">
                Booking Summary
              </p>

              <h2 className="text-2xl font-bold text-prima-text">
                Appointment Detail
              </h2>

            </div>

          </div>

          {/* CONTENT */}
          <div className="mt-8 space-y-5">

            <div className="flex items-center justify-between">

              <span className="text-prima-secondary">
                Doctor
              </span>

              <span className="font-semibold text-prima-text">
                Dr. Sarah Johnson
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-prima-secondary">
                Date
              </span>

              <span className="font-semibold text-prima-text">
                24 Mei 2026
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-prima-secondary">
                Selected Time
              </span>

              <span className="font-semibold text-prima-green">
                {selectedSlot}
              </span>

            </div>

          </div>

          {/* BUTTON */}
          <button className="mt-10 w-full bg-prima-green text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] hover:shadow-xl transition-all duration-300">

            Confirm Appointment

          </button>

        </div>

      </section>

    </div>
  )
}

export default PatientAppointmentPage