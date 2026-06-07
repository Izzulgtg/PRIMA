import MedicineList from "./medicine-list";
import PrescriptionStatusBadge from "./prescription-status-badge";

function MedicalRecordCard({
  date,
  doctor,
  specialization,
  diagnosis,
  complaint,
  prescription,
  medicines,
  status,
}) {
  return (
    <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="text-sm text-prima-secondary">
            Consultation Date
          </p>

          <h3 className="text-xl font-bold text-prima-text mt-2">
            {date}
          </h3>

        </div>

        <PrescriptionStatusBadge
          status={status}
        />

      </div>

      <div className="mt-6 space-y-5">

        <div>

          <p className="text-sm text-prima-secondary">
            Doctor
          </p>

          <h4 className="text-lg font-semibold text-prima-text mt-1">
            {doctor}
          </h4>

          <p className="inline-flex mt-2 px-3 py-1 rounded-full bg-prima-sand text-prima-green text-xs font-medium">
            {specialization}
          </p>

        </div>

        <div>

          <p className="text-sm text-prima-secondary">
            Diagnosis
          </p>

          <p className="text-prima-text mt-1 leading-relaxed">
            {diagnosis}
          </p>

        </div>

        <div>

          <p className="text-sm text-prima-secondary">
            Complaint
          </p>

          <p className="text-prima-text mt-1 leading-relaxed">
            {complaint}
          </p>

        </div>

        {prescription?.trim() && (
          <div>

            <p className="text-sm text-prima-secondary">
              Prescription Notes
            </p>

            <div className="mt-2 bg-prima-sand rounded-2xl p-4">

              <p className="text-prima-text leading-relaxed">
                {prescription}
              </p>

            </div>

          </div>
        )}

        <MedicineList
          medicines={medicines}
        />

      </div>

    </div>
  );
}

export default MedicalRecordCard;