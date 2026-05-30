const PrivacySettingsCard = () => {
  return (
    <div className="rounded-xl bg-prima-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-prima-text">
        Privasi Data
      </h2>

      <div className="space-y-4">
        <div className="rounded-lg bg-prima-sand p-4">
          <h3 className="font-medium text-prima-text">
            Perlindungan Data Medis
          </h3>

          <p className="mt-2 text-sm text-prima-muted">
            Data kesehatan Anda hanya dapat diakses oleh dokter yang
            menangani dan administrator sistem yang berwenang.
          </p>
        </div>

        <div className="rounded-lg bg-prima-sand p-4">
          <h3 className="font-medium text-prima-text">
            Login Terakhir
          </h3>

          <p className="mt-2 text-sm text-prima-muted">
            30 Mei 2026 • 09:45 WIB
          </p>
        </div>

        <div className="rounded-lg bg-prima-sand p-4">
          <h3 className="font-medium text-prima-text">
            Status Akun
          </h3>

          <p className="mt-2 text-sm text-green-700">
            Akun Aktif
          </p>
        </div>

        <button className="w-full rounded-lg bg-prima-terracotta py-3 text-white transition hover:opacity-90">
          Logout Semua Perangkat
        </button>
      </div>
    </div>
  );
};

export default PrivacySettingsCard;