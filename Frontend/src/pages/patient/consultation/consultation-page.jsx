import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Clock3,
  CalendarDays,
  Stethoscope,
} from "lucide-react";

import ConsultationStatusCard from "@/components/patient/consultation/consultation-status-card";

import { getQueue } from "@/services/patient/consultation-service";

import { formatDateOnly } from "@/utils/patient/format-date-only";
import { formatTime } from "@/utils/patient/format-time";

function ConsultationPage() {
  const navigate = useNavigate();

  const [queueData, setQueueData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /*
  |--------------------------------------------------------------------------
  | LOAD QUEUE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchQueue = async () => {
        try {
          const response =
            await getQueue();

          setQueueData(
            response.data
          );
        } catch (error) {
          console.error(
            "Gagal mengambil data konsultasi:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchQueue();
      const interval =
        setInterval(
          fetchQueue,
          5000
        );

      return () =>
        clearInterval(interval);
    }, []);

  /*
  |--------------------------------------------------------------------------
  | NAVIGATION
  |--------------------------------------------------------------------------
  */

  const handleWaitingRoom =
    () => {
      navigate(
        "/patient/waiting-room"
      );
    };

  const handleJoinConsultation =
    () => {
      if (!queueData?.id) return;

      navigate(
        `/patient/consultation-room/${queueData.id}`
      );
    };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-prima-secondary">
          Memuat data konsultasi...
        </p>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | NO DATA
  |--------------------------------------------------------------------------
  */

  if (!queueData) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">
          Belum ada jadwal konsultasi
        </p>
      </div>
    );
  }

  const consultationDate =
    formatDateOnly(
      queueData.tanggal
    );

  const consultationTime = `${formatTime(
    queueData.jam_mulai
  )} - ${formatTime(
    queueData.jam_selesai
  )}`;

  const isReady =
    queueData.status ===
    "berlangsung";

  return (
    <div className="space-y-6">

      {/* HERO */}
      <section className="rounded-[32px] bg-prima-green p-8 text-white">

        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">

          {/* LEFT */}
          <div className="max-w-2xl">

            <p className="text-sm opacity-80">
              Online Consultation
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight">
              Konsultasi Online Bersama Dokter
            </h1>

            <p className="mt-5 text-lg leading-relaxed opacity-90">
              Pantau jadwal konsultasi,
              masuk ruang tunggu,
              dan lakukan konsultasi online
              secara aman melalui PRIMA.
            </p>

            <button
              onClick={
                handleWaitingRoom
              }
              className="
                mt-8 rounded-2xl
                bg-white
                px-6 py-3
                font-semibold
                text-prima-green
                transition-all duration-300
                hover:scale-105
                hover:shadow-xl
              "
            >
              Masuk Waiting Room
            </button>

          </div>

          {/* RIGHT */}
          <div className="w-[320px] rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">

            <p className="text-sm opacity-80">
              Doctor Status
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              {isReady
                ? "Online"
                : "Waiting"}
            </h3>

            <p className="mt-3 leading-relaxed opacity-80">
              {
                queueData.dokter_nama
              }
            </p>

            <div className="mt-6 flex items-center gap-2">

              <div className="h-3 w-3 animate-pulse rounded-full bg-green-300" />

              <span className="text-sm">
                {
                  queueData.status
                }
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* STATUS CARD */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <ConsultationStatusCard
          title="Upcoming Session"
          subtitle="Jadwal Konsultasi"
          doctor={
            queueData.dokter_nama
          }
          time={consultationDate}
          actionText="Waiting Room"
          status={
            queueData.status
          }
          background="bg-prima-card"
          buttonColor="bg-prima-green text-white"
          icon={
            <CalendarDays className="h-5 w-5" />
          }
          onAction={
            handleWaitingRoom
          }
        />

        <ConsultationStatusCard
          title="Jam Konsultasi"
          subtitle="Sesi Konsultasi"
          doctor="Jadwal Dokter"
          time={
            consultationTime
          }
          actionText="Lihat Jadwal"
          status="Terjadwal"
          background="bg-prima-card"
          buttonColor="bg-prima-teal text-white"
          icon={
            <Clock3 className="h-5 w-5" />
          }
          onAction={
            handleWaitingRoom
          }
        />

        <ConsultationStatusCard
          title="Doctor Online"
          subtitle="Ready Consultation"
          doctor={
            queueData.dokter_nama
          }
          time={
            isReady
              ? "Online"
              : "Menunggu"
          }
          actionText={
            isReady
              ? "Masuk Chat"
              : "Belum Dimulai"
          }
          status={
            isReady
              ? "Ready"
              : "Waiting"
          }
          background="bg-prima-card"
          buttonColor={
            isReady
              ? "bg-prima-green text-white"
              : "bg-gray-300 text-gray-500"
          }
          icon={
            <Stethoscope className="h-5 w-5" />
          }
          onAction={
            isReady
              ? handleJoinConsultation
              : undefined
          }
        />

      </section>

    </div>
  );
}

export default ConsultationPage;