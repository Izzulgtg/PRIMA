import {
  Clock,
  Calendar,
  UserRound,
  MessageCircle,
} from "lucide-react";

const WaitingRoomCard = ({
  doctorName,
  consultationDate,
  consultationTime,
  remainingSeconds,
  canJoin,
  onJoin,
}) => {

  const minutes = Math.floor(
    remainingSeconds / 60
  );

  const seconds = remainingSeconds % 60;

  const formattedTime = `${String(
    minutes
  ).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="bg-prima-card rounded-[32px] border border-[#F1ECE4] p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-wide text-prima-secondary">
            Waiting Room
          </p>

          <h2 className="mt-2 text-2xl font-bold text-prima-text">
            Konsultasi Online
          </h2>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-prima-sand text-prima-green">

          <MessageCircle size={24} />

        </div>

      </div>

      {/* DOCTOR INFO */}
      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">

          <UserRound
            size={18}
            className="text-prima-green"
          />

          <span className="text-prima-text font-medium">
            {doctorName}
          </span>

        </div>

        <div className="flex items-center gap-3">

          <Calendar
            size={18}
            className="text-prima-green"
          />

          <span className="text-prima-secondary">
            {consultationDate}
          </span>

        </div>

        <div className="flex items-center gap-3">

          <Clock
            size={18}
            className="text-prima-green"
          />

          <span className="text-prima-secondary">
            {consultationTime}
          </span>

        </div>

      </div>

      {/* COUNTDOWN */}
      <div className="mt-8 rounded-3xl bg-prima-background p-6 text-center">

        <p className="text-sm text-prima-secondary">
          Waktu Menuju Konsultasi
        </p>

        <h3 className="mt-3 text-5xl font-bold text-prima-text">
          {formattedTime}
        </h3>

      </div>

      {/* STATUS */}
      <div className="mt-6 rounded-2xl bg-prima-sand p-4">

        <p className="text-center text-sm font-medium text-prima-text">

          {canJoin
            ? "Dokter siap menerima konsultasi."
            : remainingSeconds <= 0
              ? "Menunggu dokter memulai sesi konsultasi."
              : "Silakan tunggu hingga waktu konsultasi dimulai."}

        </p>

      </div>

      {/* ACTION BUTTON */}
      <button
        type="button"
        disabled={!canJoin}
        onClick={onJoin}
        className="
          mt-8
          w-full
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
        {canJoin
          ? "Masuk Konsultasi"
          : "Menunggu Jadwal"}
      </button>

    </div>
  );
};

export default WaitingRoomCard;