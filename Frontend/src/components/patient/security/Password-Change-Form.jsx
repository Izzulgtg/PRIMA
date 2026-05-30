const PasswordChangeForm = () => {
  return (
    <div className="rounded-xl bg-prima-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-prima-text">
        Ubah Password
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-prima-muted">
            Password Lama
          </label>

          <input
            type="password"
            className="w-full rounded-lg border border-gray-200 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-prima-muted">
            Password Baru
          </label>

          <input
            type="password"
            className="w-full rounded-lg border border-gray-200 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-prima-muted">
            Konfirmasi Password Baru
          </label>

          <input
            type="password"
            className="w-full rounded-lg border border-gray-200 p-3"
          />
        </div>

        <button className="w-full rounded-lg bg-prima-green py-3 text-white transition hover:opacity-90">
          Simpan Password Baru
        </button>
      </div>
    </div>
  );
};

export default PasswordChangeForm;