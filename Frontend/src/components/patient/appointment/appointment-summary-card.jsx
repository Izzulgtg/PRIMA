import { Stethoscope } from "lucide-react";

function AppointmentSummaryCard({
  doctor,
  date,
  slot,
}) {
  return (
    <div className="sticky top-6 rounded-[32px] border border-[#F1ECE4] bg-prima-card p-8 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-prima-sand text-prima-green">
          <Stethoscope size={22} />
        </div>

        <div>

          <p className="text-sm text-prima-secondary">
            Booking Summary
          </p>

          <h2 className="text-2xl font-bold text-prima-text">
            Appointment Detail
          </h2>

        </div>

      </div>

      <div className="mt-8 space-y-5">

        <div className="flex justify-between">
          <span className="text-prima-secondary">
            Doctor
          </span>

          <span className="font-semibold text-prima-text">
            {doctor}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-prima-secondary">
            Date
          </span>

          <span className="font-semibold text-prima-text">
            {date || "-"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-prima-secondary">
            Time
          </span>

          <span className="font-semibold text-prima-green">
            {slot || "-"}
          </span>
        </div>

      </div>

    </div>
  );
}

export default AppointmentSummaryCard;