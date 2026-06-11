import { 
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
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

  const [slots, setSlots] = useState([]);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
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
          console.error(
            "Fetch doctor error:",
            error
          );
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
          console.error(
            "Fetch slot error:",
            error
          );
        }
      };

    fetchSlots();
  }, [selectedDoctor]);

  const handleSubmit = async (
    formData
  ) => {
    setSubmitting(true);
    try {
      const payload = {
        dokter_id: selectedDoctor.id,
        slot_id: selectedSlot.id,
        tanggal: selectedDate,
        jenis_kunjungan: formData.jenis_kunjungan,
        keluhan_utama: formData.keluhan_utama,
        durasi_keluhan: formData.durasi_keluhan,
        metode_bayar: formData.metode_bayar,
      };

      const result =
        await createAppointment(
          payload
        );

      alert(
        result.message ||
        "Pendaftaran berhasil"
      );
      setTimeout(() => {
        const consultationId =
          result.data
            ?.consultation_id;

        if (
          consultationId
        ) {
          navigate(
            `/patient/waiting-room/${consultationId}`
          );
        }
      }, 1500);
      } catch (error) {
        console.error(
          "Create appointment error:",
          error
        );
        
      alert(
        error?.response?.data
          ?.message ||
          "Gagal membuat pendaftaran"
      );
    } finally {
      setSubmitting(false);
    }
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

                <div className="mb-6">

                  <div className="mb-6 rounded-2xl bg-prima-background p-4">

                    <p className="text-sm text-prima-secondary">
                      Dokter Pemeriksa
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-prima-text">
                      {selectedDoctor?.nama_lengkap}
                    </h3>

                    <p className="text-sm text-prima-secondary">
                      {selectedDoctor?.spesialisasi}
                    </p>

                  </div>

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
                  selectedDate={ selectedDate }
                  selectedSlot={ selectedSlot }
                  onSubmit={ handleSubmit }
                  loading={ submitting }
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