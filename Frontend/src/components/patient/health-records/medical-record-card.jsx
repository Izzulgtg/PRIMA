function MedicalRecordCard({
  date,
  doctor,
  diagnosis,
  complaint,
  status,
}) {

  return (
    <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

      {/* TOP */}
      <div className="flex items-start justify-between gap-4">

        {/* LEFT */}
        <div>

          <p className="text-sm text-prima-secondary">
            Consultation Date
          </p>

          <h3 className="text-xl font-bold text-prima-text mt-2">
            {date}
          </h3>

        </div>

        {/* STATUS */}
        <div className="bg-prima-sand text-prima-green px-4 py-2 rounded-full text-sm font-medium">

          {status}

        </div>

      </div>

      {/* CONTENT */}
      <div className="mt-6 space-y-5">

        {/* DOCTOR */}
        <div>

          <p className="text-sm text-prima-secondary">
            Doctor
          </p>

          <h4 className="text-lg font-semibold text-prima-text mt-1">
            {doctor}
          </h4>

        </div>

        {/* DIAGNOSIS */}
        <div>

          <p className="text-sm text-prima-secondary">
            Diagnosis
          </p>

          <p className="text-prima-text mt-1 leading-relaxed">
            {diagnosis}
          </p>

        </div>

        {/* COMPLAINT */}
        <div>

          <p className="text-sm text-prima-secondary">
            Complaint
          </p>

          <p className="text-prima-text mt-1 leading-relaxed">
            {complaint}
          </p>

        </div>

      </div>

    </div>
  )
}

export default MedicalRecordCard