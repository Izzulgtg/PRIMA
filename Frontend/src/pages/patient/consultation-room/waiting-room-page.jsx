import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import WaitingRoomCard from "@/components/patient/consultation/waiting-room-card";
import ConsultationQueue from "@/components/patient/consultation/consultation-queue";

import { dummyWaitingRoom } from "@/data/dummy-waiting-room";

function WaitingRoomPage() {
  const navigate = useNavigate();

  const { session, queue } =
    dummyWaitingRoom;

  const handleJoinConsultation =
    () => {
      navigate("/patient/consultation-room");
    };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <button
          onClick={() =>
            navigate("/patient/consultation")
          }
          className="
            inline-flex items-center gap-2
            text-prima-secondary
            hover:text-prima-green
            transition-colors
            font-medium
          "
        >
          <ArrowLeft size={18} />
          Kembali
        </button>
      </div>

      {/* HERO */}
      <section className="bg-prima-green rounded-[32px] p-8 text-white">


        <p className="text-sm opacity-80">
          Waiting Room
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Ruang Tunggu Konsultasi
        </h1>

        <p className="mt-4 max-w-2xl text-lg opacity-90">
          Silakan menunggu hingga dokter memulai sesi
          konsultasi. Sistem akan mengarahkan Anda ke
          ruang konsultasi ketika giliran tiba.
        </p>

      </section>

      {/* WAITING CARD */}
      <WaitingRoomCard
        doctorName={session.doctorName}
        consultationDate={session.consultationDate}
        consultationTime={session.consultationTime}
        initialSeconds={session.remainingSeconds}
        onJoin={handleJoinConsultation}
      />

      {/* QUEUE */}
      <ConsultationQueue
        queueNumber={queue.queueNumber}
        currentQueue={queue.currentQueue}
        estimatedTime={queue.estimatedTime}
        status={queue.status}
        canJoin={queue.canJoin}
        onJoin={handleJoinConsultation}
      />

      {/* INFO */}
      <section className="bg-prima-card rounded-[32px] border border-[#F1ECE4] p-6 shadow-sm">

        <h2 className="text-xl font-bold text-prima-text">
          Informasi Konsultasi
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl bg-prima-background p-4">

            <p className="text-sm text-prima-secondary">
              Dokter
            </p>

            <p className="mt-2 font-semibold text-prima-text">
              {session.doctorName}
            </p>

          </div>

          <div className="rounded-2xl bg-prima-background p-4">

            <p className="text-sm text-prima-secondary">
              Jadwal
            </p>

            <p className="mt-2 font-semibold text-prima-text">
              {session.consultationDate}
            </p>

          </div>

          <div className="rounded-2xl bg-prima-background p-4">

            <p className="text-sm text-prima-secondary">
              Status
            </p>

            <p className="mt-2 font-semibold text-prima-green">
              {session.status}
            </p>

          </div>

          <div className="rounded-2xl bg-prima-background p-4">

            <p className="text-sm text-prima-secondary">
              Nomor Antrian
            </p>

            <p className="mt-2 font-semibold text-prima-text">
              {queue.queueNumber}
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default WaitingRoomPage;