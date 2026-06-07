import { 
  useEffect,
  useState,
} from "react";

import AppointmentStepper from "@/components/patient/appointment/appointment-stepper";
import AppointmentDatePicker from "@/components/patient/appointment/appointment-date-picker";
import TimeSlotPicker from "@/components/patient/appointment/time-slot-picker";
import AppointmentForm from "@/components/patient/appointment/appointment-form";
import AppointmentSummaryCard from "@/components/patient/appointment/appointment-summary-card";
import {
  createAppointment,
  getDoctors,
  getDoctorSlots,
} from "@/services/patient/appointment-service";

function PatientAppointmentPage() {
  const [doctors, setDoctors] =
    useState([]);

  const [
    selectedDoctor,
    setSelectedDoctor,
  ] = useState(null);

  const [slots, setSlots] =
    useState([]);
  const [step, setStep] =
    useState(1);

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedSlot, setSelectedSlot] =
    useState(null);
  
  useEffect(() => {
    const fetchDoctors =
      async () => {
        try {
          const data =
            await getDoctors();

          setDoctors(data);

          if (data.length > 0) {
            setSelectedDoctor(
              data[0]
            );
          }
        } catch (error) {
          console.error(error);
        }
      };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!selectedDoctor) return;

    const fetchSlots =
      async () => {
        try {
          const data =
            await getDoctorSlots(
              selectedDoctor.id
            );

          setSlots(data);
        } catch (error) {
          console.error(error);
        }
      };

    fetchSlots();
  }, [selectedDoctor]);

  const handleSubmit = async (
    formData
  ) => {
    try {
      const payload = {
        dokter_id:
          selectedDoctor.id,

        slot_id:
          selectedSlot.id,

        jenis_kunjungan:
          formData.jenis_kunjungan,

        keluhan_utama:
          formData.keluhan_utama,

        durasi_keluhan:
          formData.durasi_keluhan,

        metode_bayar:
          formData.metode_bayar,
      };

      const result =
        await createAppointment(
          payload
        );

      alert(
        result.message ||
          "Pendaftaran berhasil"
      );
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data
          ?.message ||
          "Gagal membuat pendaftaran"
      );
    }
  };
  console.log("Selected Doctor", selectedDoctor);
  console.log("Slots", slots);

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

                <div className="mb-6">

                  <label className="mb-2 block text-sm font-medium text-prima-text">
                    Pilih Dokter
                  </label>

                  <select
                    value={
                      selectedDoctor?.id || ""
                    }
                    onChange={(e) => {
                      const doctor =
                        doctors.find(
                          (d) =>
                            d.id ===
                            Number(
                              e.target.value
                            )
                        );

                      setSelectedDoctor(
                        doctor
                      );
                    }}
                    className="w-full rounded-xl border border-[#E5E7EB] p-3"
                  >

                    {doctors.map((doctor) => (
                      <option
                        key={doctor.id}
                        value={doctor.id}
                      >
                        {doctor.nama_lengkap}
                        {" - "}
                        {doctor.spesialisasi}
                      </option>
                    ))}

                  </select>

                </div>
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
            doctor={
              selectedDoctor
                ?.nama_lengkap || "-"
            }
            date={selectedDate}
            slot={
              selectedSlot
                ? `${selectedSlot.jam_mulai} - ${selectedSlot.jam_selesai}`
                : "-"
            }
          />

        </div>

      </section>

    </div>
  );
}

export default PatientAppointmentPage;