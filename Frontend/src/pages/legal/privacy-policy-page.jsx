function PrivacyPolicyPage() {
  return (
    <div className="bg-prima-background min-h-screen py-16 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="bg-prima-green text-white rounded-[32px] p-10">

          <h1 className="text-5xl font-bold">
            Kebijakan Privasi
          </h1>

          <p className="mt-4 text-lg opacity-90">
            PRIMA berkomitmen menjaga keamanan
            dan kerahasiaan data pribadi pengguna.
          </p>

        </div>

        <div className="bg-white rounded-[32px] p-10 mt-8 border border-prima-sand shadow-sm space-y-8">

          <div>
            <h2 className="text-2xl font-bold">
              Data yang Dikumpulkan
            </h2>

            <ul className="mt-4 list-disc pl-6 space-y-2 text-prima-muted">
              <li>Nama lengkap</li>
              <li>Email</li>
              <li>Nomor telepon</li>
              <li>Data rekam medis</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Penggunaan Data
            </h2>

            <p className="mt-3 text-prima-muted">
              Data digunakan untuk pengelolaan layanan
              kesehatan dan peningkatan kualitas layanan PRIMA.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Keamanan Data
            </h2>

            <p className="mt-3 text-prima-muted">
              Seluruh data disimpan menggunakan mekanisme
              keamanan yang sesuai untuk melindungi
              kerahasiaan pengguna.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default PrivacyPolicyPage;