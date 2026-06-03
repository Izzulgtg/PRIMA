function MedicineList({
  medicines = [],
}) {
  if (!medicines.length) {
    return null;
  }

  return (
    <div>

      <p className="text-sm text-prima-secondary">
        Medicines
      </p>

      <div className="mt-3 space-y-2">

        {medicines.map(
          (medicine, index) => (
            <div
              key={`${medicine}-${index}`}
              className="rounded-xl bg-prima-sand p-3"
            >
              <span className="text-sm text-prima-text">
                {medicine}
              </span>
            </div>
          )
        )}

      </div>

    </div>
  );
}

export default MedicineList;