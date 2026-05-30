const PatientProfileCard = () => {
  return (
    <div className="rounded-xl bg-prima-card p-6 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-prima-green text-3xl font-bold text-white">
          B
        </div>

        <h2 className="text-xl font-semibold text-prima-text">
          Budi Santoso
        </h2>

        <p className="text-prima-muted">
          budi@gmail.com
        </p>

        <p className="mt-2 text-prima-muted">
          08123456789
        </p>

        <span className="mt-4 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
          Akun Aktif
        </span>
      </div>
    </div>
  );
};

export default PatientProfileCard;