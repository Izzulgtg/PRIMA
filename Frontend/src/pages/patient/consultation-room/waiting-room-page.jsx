import {
  useEffect,
  useState,
} from "react";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import WaitingRoomCard from "@/components/patient/consultation/waiting-room-card";
import ConsultationQueue from "@/components/patient/consultation/consultation-queue";

import {
  getQueue,
} from "@/services/patient/consultation-service";

import { formatDateOnly } from "@/utils/patient/format-date-only";
import { formatTime } from "@/utils/patient/format-time";

function WaitingRoomPage() {
  const navigate = useNavigate();

  const [queueData, setQueueData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchQueue =
      async () => {
        try {
          const response =
            await getQueue();

          setQueueData(
            response.data
          );
        } catch (error) {
          console.error(
            "Gagal mengambil antrean",
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

  useEffect(() => {
    if (
      queueData?.status ===
      "berlangsung"
    ) {
      navigate(
        `/patient/consultation-room/${queueData.id}`
      );
    }
  }, [
    queueData,
    navigate,
  ]);

  const handleJoinConsultation =
    () => {
      if (!queueData?.id) return;

      navigate(
        `/patient/consultation-room/${queueData.id}`
      );
    };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-prima-secondary">
          Memuat data konsultasi...
        </p>
      </div>
    );
  }

  if (!queueData) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">
          Data konsultasi tidak ditemukan
        </p>
      </div>
    );
  }

  const formattedDate =
    formatDateOnly(
      queueData.tanggal
    );

  const formattedTime = `${formatTime(
    queueData.jam_mulai
  )} - ${formatTime(
    queueData.jam_selesai
  )}`;

  return (
    <div className="space-y-8">

      {/* BACK BUTTON */}
      <div className="flex items-center justify-between">

        <button
          onClick={() =>
            navigate(
              "/patient/consultation"
            )
          }
          className="
            inline-flex
            items-center
            gap-2
            font-medium
            text-prima-secondary
            transition-colors
            hover:text-prima-green
          "
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

      </div>

      {/* HERO */}
      <section className="rounded-[32px] bg-prima-green p-8 text-white">

        <p className="text-sm opacity-80">
          Waiting Room
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Ruang Tunggu Konsultasi
        </h1>

        <p className="mt-4 max-w-2xl text-lg opacity-90">
          Silakan menunggu hingga dokter
          memulai sesi konsultasi.
          Sistem akan mengarahkan Anda
          ke ruang konsultasi ketika
          giliran tiba.
        </p>

      </section>

      {/* WAITING CARD */}
      <WaitingRoomCard
        doctorName={
          queueData.dokter_nama
        }
        consultationDate={
          formattedDate
        }
        consultationTime={
          formattedTime
        }
        initialSeconds={600}
        onJoin={
          handleJoinConsultation
        }
      />

      {/* QUEUE */}
      <ConsultationQueue
        queueNumber={
          queueData.nomor_antrian
        }
        currentQueue={0}
        estimatedTime="Menunggu"
        status={queueData.status}
        canJoin={
          queueData.status ===
          "berlangsung"
        }
        onJoin={
          handleJoinConsultation
        }
      />

      {/* INFO */}
      <section className="rounded-[32px] border border-[#F1ECE4] bg-prima-card p-6 shadow-sm">

        <h2 className="text-xl font-bold text-prima-text">
          Informasi Konsultasi
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl bg-prima-background p-4">

            <p className="text-sm text-prima-secondary">
              Dokter
            </p>

            <p className="mt-2 font-semibold text-prima-text">
              {queueData.dokter_nama}
            </p>

          </div>

          <div className="rounded-2xl bg-prima-background p-4">

            <p className="text-sm text-prima-secondary">
              Jadwal
            </p>

            <p className="mt-2 font-semibold text-prima-text">
              {formattedDate}
            </p>

          </div>

          <div className="rounded-2xl bg-prima-background p-4">

            <p className="text-sm text-prima-secondary">
              Jam Konsultasi
            </p>

            <p className="mt-2 font-semibold text-prima-text">
              {formattedTime}
            </p>

          </div>

          <div className="rounded-2xl bg-prima-background p-4">

            <p className="text-sm text-prima-secondary">
              Status
            </p>

            <p className="mt-2 font-semibold capitalize text-prima-green">
              {queueData.status}
            </p>

          </div>

          <div className="rounded-2xl bg-prima-background p-4">

            <p className="text-sm text-prima-secondary">
              Nomor Antrian
            </p>

            <p className="mt-2 font-semibold text-prima-text">
              {queueData.nomor_antrian}
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default WaitingRoomPage;