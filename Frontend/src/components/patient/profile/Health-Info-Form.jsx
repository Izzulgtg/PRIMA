const HealthInfoForm = () => {
  return (
    <div className="rounded-xl bg-prima-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-prima-text">
        Informasi Kesehatan
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-prima-muted">
            NIK
          </label>

          <input
            type="text"
            className="w-full rounded-lg border border-gray-200 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-prima-muted">
            Tanggal Lahir
          </label>

          <input
            type="date"
            className="w-full rounded-lg border border-gray-200 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-prima-muted">
            Jenis Kelamin
          </label>

          <select className="w-full rounded-lg border border-gray-200 p-3">
            <option>Laki-laki</option>
            <option>Perempuan</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-prima-muted">
            Golongan Darah
          </label>

          <select className="w-full rounded-lg border border-gray-200 p-3">
            <option>A</option>
            <option>B</option>
            <option>AB</option>
            <option>O</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-prima-muted">
            Alergi
          </label>

          <textarea
            rows="3"
            className="w-full rounded-lg border border-gray-200 p-3"
          />
        </div>
      </div>

      <button className="mt-6 rounded-lg bg-prima-green px-6 py-3 text-white transition hover:opacity-90">
        Simpan Perubahan
      </button>
    </div>
  );
};

export default HealthInfoForm;