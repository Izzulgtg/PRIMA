function PrescriptionCard({
  medicine,
  dosage,
  doctor,
  status,
}) {

  return (
    <div className="bg-prima-background rounded-2xl p-5 flex items-center justify-between">

      {/* LEFT */}
      <div>

        <h3 className="font-semibold text-prima-text">
          {medicine}
        </h3>

        <p className="text-sm text-prima-secondary mt-1">
          {dosage}
        </p>

        <p className="text-sm text-prima-secondary mt-2">
          Prescribed by {doctor}
        </p>

      </div>

      {/* STATUS */}
      <div className="bg-prima-sand text-prima-green px-4 py-2 rounded-full text-sm font-medium">

        {status}

      </div>

    </div>
  )
}

export default PrescriptionCard