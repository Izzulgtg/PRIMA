import { Pill } from "lucide-react";
import { formatDate } from "@/utils/patient/format-date";

const STATUS_STYLES = {
  aktif:
    "bg-prima-green/10 text-prima-green",

  selesai:
    "bg-prima-teal/10 text-prima-teal",
};

function MedicationHistoryCard({
  medicine,
  doctor,
  date,
  status = "Selesai",
}) {
  const statusClass =
    STATUS_STYLES[
      status?.toLowerCase()
    ] ||
    "bg-prima-sand text-prima-secondary";

  return (
    <div className="rounded-2xl border border-[#F1ECE4] bg-white p-4 transition hover:shadow-sm">

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <Pill
              size={16}
              className="text-prima-green shrink-0"
            />

            <h4 className="font-semibold text-prima-text truncate">
              {medicine}
            </h4>

          </div>

          <p className="mt-2 text-sm text-prima-secondary">
            {doctor}
          </p>

          <p className="mt-1 text-xs text-prima-secondary">
            {formatDate(date)}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${statusClass}`}
        >
          {status}
        </span>

      </div>

    </div>
  );
}

export default MedicationHistoryCard;