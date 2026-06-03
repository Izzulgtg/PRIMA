import { useState } from "react";

import AppointmentStepper from "@/components/patient/appointment/appointment-stepper";
import AppointmentDatePicker from "@/components/patient/appointment/appointment-date-picker";
import TimeSlotPicker from "@/components/patient/appointment/time-slot-picker";
import AppointmentForm from "@/components/patient/appointment/appointment-form";
import AppointmentSummaryCard from "@/components/patient/appointment/appointment-summary-card";
import {createAppointment} from "@/services/patient/appointment-service";

function PatientAppointmentPage() {
  const [step, setStep] =
    useState(1);

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedSlot, setSelectedSlot] =
    useState("");

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
  ];

  const handleSubmit = async (formData) => {
    try {const user =
      JSON.parse(localStorage.getItem("user"));
      const payload = {
        pasien_id: user.id,
        dokter_id: 1,
        tanggal_periksa: selectedDate,
        keluhan: formData.keluhan
      };
      const result = await createAppointment(payload);
      alert(`Pendaftaran berhasil. Nomor antrean: ${result.data.nomor_antrean}`);
    } catch (error) {console.error(error);}
  };

  return (
    <div className="space-y-6">

      {/* HERO */}
      <section className="rounded-[32px] bg-prima-green p-8 text-white">

        <h1 className="text-4xl font-bold">
          Booking Jadwal Pemeriksaan
        </h1>

        <p className="mt-4 max-w-2xl opacity-90">
          Pilih tanggal pemeriksaan,
          tentukan jam konsultasi,
          lalu konfirmasi pendaftaran Anda.
        </p>

      </section>

      {/* STEPPER */}
      <section className="rounded-[32px] border border-[#F1ECE4] bg-prima-card p-8">

        <AppointmentStepper
          currentStep={step}
        />

      </section>

      {/* CONTENT */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* LEFT */}
        <div className="xl:col-span-2">

          <div className="rounded-[32px] border border-[#F1ECE4] bg-prima-card p-8">

            {/* STEP 1 */}
            {step === 1 && (
              <div>

                <AppointmentDatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                />

                <div className="mt-8 flex justify-end">

                  <button
                    disabled={!selectedDate}
                    onClick={() => setStep(2)}
                    className="
                      rounded-xl
                      bg-prima-green
                      px-6 py-3
                      text-white
                      transition
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    Lanjut
                  </button>

                </div>

              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>

                <h2 className="mb-6 text-2xl font-bold text-prima-text">
                  Pilih Jam Konsultasi
                </h2>

                <TimeSlotPicker
                  slots={slots}
                  selectedSlot={
                    selectedSlot
                  }
                  onSelect={
                    setSelectedSlot
                  }
                />

                <div className="mt-8 flex gap-4">

                  <button
                    onClick={() =>
                      setStep(1)
                    }
                    className="rounded-xl bg-prima-sand px-5 py-3"
                  >
                    Kembali
                  </button>

                  <button
                    disabled={!selectedSlot}
                    onClick={() =>
                      setStep(3)
                    }
                    className="rounded-xl bg-prima-green px-5 py-3 text-white disabled:opacity-50"
                  >
                    Lanjut
                  </button>

                </div>

              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>

                <AppointmentForm
                  selectedDate={
                    selectedDate
                  }
                  selectedSlot={
                    selectedSlot
                  }
                  onSubmit={
                    handleSubmit
                  }
                />

                <button
                  onClick={() =>
                    setStep(2)
                  }
                  className="mt-4 rounded-xl bg-prima-sand px-5 py-3"
                >
                  Kembali
                </button>

              </div>
            )}

          </div>

        </div>

        {/* RIGHT */}
        <div>

          <AppointmentSummaryCard
            doctor="Dr. Sarah Johnson"
            date={selectedDate}
            slot={selectedSlot}
          />

        </div>

      </section>

    </div>
  );
}

export default PatientAppointmentPage;