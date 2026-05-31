const PatientProfileCard = ({ profile }) => {
  const initialName =
    profile?.nama_lengkap?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="rounded-xl bg-prima-card p-6 shadow-sm">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-prima-green text-3xl font-bold text-white">
          {initialName}
        </div>

        {/* Nama */}
        <h2 className="text-center text-xl font-semibold text-prima-text">
          {profile?.nama_lengkap ||
            "Nama Belum Diisi"}
        </h2>

        {/* Email */}
        <p className="mt-1 text-center text-prima-muted">
          {profile?.email ||
            "Email Belum Diisi"}
        </p>

        {/* Nomor HP */}
        <p className="mt-2 text-center text-prima-muted">
          {profile?.nomor_hp ||
            "Nomor HP Belum Diisi"}
        </p>

        {/* Status */}
        <span className="mt-4 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          Akun Aktif
        </span>

        {/* Info Tambahan */}
        {profile?.last_login_at && (
          <div className="mt-4 text-center">
            <p className="text-xs text-prima-muted">
              Login Terakhir
            </p>

            <p className="text-sm text-prima-text">
              {new Date(
                profile.last_login_at
              ).toLocaleString("id-ID")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfileCard;