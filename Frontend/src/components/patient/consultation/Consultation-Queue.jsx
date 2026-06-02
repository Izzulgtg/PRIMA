import {
  Clock,
  Users,
  MessageCircle,
} from "lucide-react";

const ConsultationQueue = ({
  queueNumber,
  currentQueue,
  estimatedTime,
  status,
  onJoin,
  canJoin = false,
}) => {
  const progress =
    currentQueue >= queueNumber
      ? 100
      : Math.max(
          0,
          ((currentQueue /
            queueNumber) *
            100)
        );

  return (
    <div className="bg-prima-card rounded-[32px] border border-[#F1ECE4] p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-wide text-prima-secondary font-medium">
            Consultation Queue
          </p>

          <h2 className="mt-2 text-2xl font-bold text-prima-text">
            Antrian Konsultasi
          </h2>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-prima-sand text-prima-green">

          <Users size={24} />

        </div>

      </div>

      {/* QUEUE NUMBER */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl bg-prima-background p-4">

          <p className="text-sm text-prima-secondary">
            Nomor Antrian
          </p>

          <h3 className="mt-2 text-3xl font-bold text-prima-text">
            {queueNumber}
          </h3>

        </div>

        <div className="rounded-2xl bg-prima-background p-4">

          <p className="text-sm text-prima-secondary">
            Antrian Saat Ini
          </p>

          <h3 className="mt-2 text-3xl font-bold text-prima-text">
            {currentQueue}
          </h3>

        </div>

        <div className="rounded-2xl bg-prima-background p-4">

          <p className="text-sm text-prima-secondary">
            Estimasi Tunggu
          </p>

          <h3 className="mt-2 text-3xl font-bold text-prima-text">
            {estimatedTime}
          </h3>

        </div>

      </div>

      {/* STATUS */}
      <div className="mt-6 rounded-2xl bg-prima-sand p-4">

        <div className="flex items-center gap-3">

          <Clock
            size={18}
            className="text-prima-green"
          />

          <span className="font-medium text-prima-text">
            {status}
          </span>

        </div>

      </div>

      {/* PROGRESS */}
      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-sm text-prima-secondary">
            Progress Antrian
          </span>

          <span className="text-sm font-medium text-prima-text">
            {Math.round(progress)}%
          </span>

        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-prima-sand">

          <div
            className="h-full rounded-full bg-prima-green transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* ACTION */}
      <button
        type="button"
        disabled={!canJoin}
        onClick={onJoin}
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-prima-green
          py-3
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:scale-[1.02]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <MessageCircle size={18} />

        {canJoin
          ? "Masuk Konsultasi"
          : "Menunggu Giliran"}
      </button>

    </div>
  );
};

export default ConsultationQueue;