function MedicineList({
  medicines = [],
  title = "Medicines",
}) {
  if (!medicines.length) {
    return null;
  }

  return (
    <div>

      {/* TITLE */}
      <p className="text-sm text-prima-secondary">
        {title}
      </p>

      {/* LIST */}
      <div className="mt-3 space-y-2">

        {medicines.map(
          (medicine, index) => (
            <div
              key={`${medicine}-${index}`}
              className="rounded-xl bg-prima-sand p-3"
            >

              <div className="flex items-center justify-between gap-4">

                <span className="text-sm font-medium text-prima-text">
                  {medicine}
                </span>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-prima-green">
                  Obat
                </span>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default MedicineList;