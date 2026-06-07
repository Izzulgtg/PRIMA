function TermsPage() {
  return (
    <div className="bg-prima-background min-h-screen py-16 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="bg-prima-green text-white rounded-[32px] p-10">

          <h1 className="text-5xl font-bold">
            Syarat & Ketentuan
          </h1>

          <p className="mt-4 text-lg opacity-90">
            Dengan menggunakan layanan PRIMA,
            pengguna dianggap telah memahami
            dan menyetujui seluruh syarat yang berlaku.
          </p>

        </div>

        <div className="bg-white rounded-[32px] p-10 mt-8 border border-prima-sand shadow-sm space-y-8">

          <div>
            <h2 className="text-2xl font-bold">
              Penggunaan Akun
            </h2>

            <p className="mt-3 text-prima-muted">
              Pengguna wajib memberikan informasi
              yang benar dan menjaga kerahasiaan akun.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Kewajiban Pengguna
            </h2>

            <p className="mt-3 text-prima-muted">
              Pengguna bertanggung jawab atas seluruh
              aktivitas yang dilakukan melalui akun PRIMA.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Larangan Penggunaan
            </h2>

            <p className="mt-3 text-prima-muted">
              Dilarang menggunakan sistem untuk aktivitas
              ilegal, penyalahgunaan data, maupun tindakan
              yang merugikan pengguna lain.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Penangguhan Akun
            </h2>

            <p className="mt-3 text-prima-muted">
              PRIMA berhak menonaktifkan akun yang
              terbukti melanggar kebijakan sistem.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default TermsPage;