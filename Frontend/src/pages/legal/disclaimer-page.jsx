function DisclaimerPage() {
  return (
    <div className="bg-prima-background min-h-screen py-16 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="bg-prima-green text-white rounded-[32px] p-10">

          <h1 className="text-5xl font-bold">
            Disclaimer
          </h1>

          <p className="mt-4 text-lg opacity-90">
            Informasi dalam sistem PRIMA digunakan
            sebagai pendukung layanan kesehatan.
          </p>

        </div>

        <div className="bg-white rounded-[32px] p-10 mt-8 border border-prima-sand shadow-sm">

          <ul className="space-y-4 text-prima-muted">

            <li>
              • PRIMA bukan pengganti diagnosis medis profesional.
            </li>

            <li>
              • Seluruh keputusan medis tetap berada pada tenaga kesehatan.
            </li>

            <li>
              • Data yang ditampilkan bergantung pada informasi pengguna.
            </li>

            <li>
              • PRIMA tidak bertanggung jawab atas kesalahan input data pengguna.
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
}

export default DisclaimerPage;