import { Pill } from "lucide-react";
import { formatDate } from "@/utils/patient/format-date";

function MedicationHistoryCard({
  medicine,
  doctor,
  date,
  status,
}) {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "aktif":
        return "bg-prima-green/10 text-prima-green";

      case "selesai":
        return "bg-prima-teal/10 text-prima-teal";

      default:
        return "bg-prima-sand text-prima-secondary";
    }
  };

  return (
    <div className="rounded-2xl border border-[#F1ECE4] bg-white p-4">

      <div className="flex items-start justify-between gap-3">

        <div>

          <div className="flex items-center gap-2">

            <Pill
              size={16}
              className="text-prima-green"
            />

            <h4 className="font-semibold text-prima-text">
              {medicine}
            </h4>

          </div>

          <p className="mt-2 text-sm text-prima-secondary">
            Dr. {doctor}
          </p>

          <p className="mt-1 text-xs text-prima-secondary">
            {formatDate(date)}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
            status
          )}`}
        >
          {status}
        </span>

      </div>

    </div>
  );
}

export default MedicationHistoryCard;