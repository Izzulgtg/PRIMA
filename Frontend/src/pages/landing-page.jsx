import Button from "../components/ui/button"

function LandingPage() {
  return (
    <div className="bg-prima-background min-h-screen">

      {/* NAVBAR */}
      <nav
        className="
          flex
          items-center
          justify-between
          px-10
          py-6
        "
      >

        <h1 className="text-3xl font-bold text-prima-green">
          PRIMA
        </h1>

        <div className="flex items-center gap-4">

          <Button variant="outline">
            Login
          </Button>

          <Button variant="primary">
            Register
          </Button>

        </div>

      </nav>

      {/* HERO SECTION */}
      <section
        className="
          px-10
          py-16
          flex
          items-center
          justify-between
          gap-20
        "
      >

        {/* LEFT CONTENT */}
        <div className="max-w-xl">

          <div
            className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              bg-[#DDE8D7]
              text-prima-green
              text-sm
              font-medium
            "
          >
            Ayo Kelola Kesehatan Anda
          </div>

          <h1
            className="
              text-6xl
              font-bold
              text-prima-text
              leading-tight
              mt-8
            "
          >
            Layanan Kesehatan
            Masyarakat yang
            <span className="text-prima-green italic">
              {" "}Mudah & Terpercaya
            </span>
          </h1>

          <p
            className="
              text-prima-muted
              text-lg
              leading-relaxed
              mt-8
            "
          >
            Akses layanan medis profesional
            langsung dari genggaman Anda.
            Mulai dari pendaftaran dokter
            hingga konsultasi real-time.
          </p>

          <div className="flex gap-4 mt-10">

            <Button variant="primary">
              Daftar Berobat Sekarang
            </Button>

            <Button variant="outline">
              Lihat Layanan
            </Button>

          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div
          className="
            relative
            w-[520px]
            h-[620px]
            rounded-[40px]
            bg-prima-sand
            shadow-xl
            overflow-hidden
          "
        >

          {/* IMAGE PLACEHOLDER */}
          <div
            className="
              w-full
              h-full
              bg-[#D8CCBC]
            "
          />

          {/* FLOATING CARD */}
          <div
            className="
              absolute
              bottom-6
              left-6
              right-6
              bg-white
              rounded-3xl
              p-5
              shadow-lg
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-prima-green
              "
            />

            <div>

              <h3 className="font-semibold text-prima-text">
                Konsultasi Berkualitas
              </h3>

              <p className="text-sm text-prima-muted mt-1">
                Praktis, mudah, dan real-time.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURE SECTION */}
      <section className="px-10 py-28">

        <div className="text-center">

          <p
            className="
              text-prima-teal
              font-medium
            "
          >
            Layanan Unggulan Kami
          </p>

          <h2
            className="
              text-5xl
              font-bold
              text-prima-text
              mt-5
            "
          >
            Solusi Digital Kesehatan
            yang Modern & Aman
          </h2>

          <p
            className="
              text-prima-muted
              mt-6
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            PRIMA membantu pengelolaan layanan kesehatan
            dengan sistem modern yang cepat,
            aman, dan mudah digunakan.
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-3
            gap-8
            mt-20
          "
        >

          {/* CARD 1 */}
          <div
            className="
              bg-white
              rounded-[32px]
              p-8
              border
              border-prima-sand
              hover:shadow-lg
              transition-all
            "
          >

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-[#E8F0FF]
                mb-8
              "
            />

            <h3 className="text-2xl font-semibold text-prima-text">
              Jadwal Dokter Real-Time
            </h3>

            <p
              className="
                text-prima-muted
                mt-5
                leading-relaxed
              "
            >
              Pantau jadwal dokter secara langsung
              untuk proses reservasi yang lebih cepat.
            </p>

          </div>

          {/* CARD 2 */}
          <div
            className="
              bg-white
              rounded-[32px]
              p-8
              border
              border-prima-sand
              hover:shadow-lg
              transition-all
            "
          >

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-[#F3E8FF]
                mb-8
              "
            />

            <h3 className="text-2xl font-semibold text-prima-text">
              Konsultasi Mudah
            </h3>

            <p
              className="
                text-prima-muted
                mt-5
                leading-relaxed
              "
            >
              Konsultasi online dengan sistem chat
              yang cepat dan efisien.
            </p>

          </div>

          {/* CARD 3 */}
          <div
            className="
              bg-white
              rounded-[32px]
              p-8
              border
              border-prima-sand
              hover:shadow-lg
              transition-all
            "
          >

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-[#FCE7F3]
                mb-8
              "
            />

            <h3 className="text-2xl font-semibold text-prima-text">
              Data Aman
            </h3>

            <p
              className="
                text-prima-muted
                mt-5
                leading-relaxed
              "
            >
              Seluruh data pasien dan rekam medis
              tersimpan aman dan terenkripsi.
            </p>

          </div>

        </div>

      </section>

   <section className="px-10 py-28">

  <div
    className="
      bg-prima-sand
      rounded-[40px]
      p-16
      flex
      items-center
      justify-between
      gap-20
      relative
      overflow-hidden
    "
  >

    {/* LEFT CONTENT */}
    <div className="max-w-xl z-10">

      <p className="text-prima-teal font-medium">
        Ekosistem PRIMA
      </p>

      <h2
        className="
          text-5xl
          font-bold
          text-prima-text
          leading-tight
          mt-6
        "
      >
        Bergabung dengan
        Ekosistem Kesehatan
        Masa Depan
      </h2>

      <p
        className="
          text-prima-muted
          leading-relaxed
          mt-6
          text-lg
        "
      >
        PRIMA membantu rumah sakit,
        dokter, dan pasien dalam satu
        sistem kesehatan digital
        yang modern dan terintegrasi.
      </p>

      {/* STATS */}
      <div className="flex gap-16 mt-12">

        <div>

          <h3 className="text-4xl font-bold text-prima-green">
            98%
          </h3>

          <p className="text-prima-muted mt-2">
            Kepuasan Pasien
          </p>

        </div>

        <div>

          <h3 className="text-4xl font-bold text-prima-teal">
            24/7
          </h3>

          <p className="text-prima-muted mt-2">
            Dukungan Medis
          </p>

        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="relative z-10">

      <div
        className="
          bg-white
          rounded-[32px]
          p-8
          w-[360px]
          shadow-lg
        "
      >

        <div className="space-y-6">

          <div className="flex items-start gap-4">

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-[#FFDCCF]
              "
            />

            <div>

              <h3 className="font-semibold text-prima-text">
                Integrasi BPJS
              </h3>

              <p className="text-prima-muted text-sm mt-1">
                Sistem terhubung dengan layanan nasional.
              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-[#DDE8D7]
              "
            />

            <div>

              <h3 className="font-semibold text-prima-text">
                Monitoring Real-Time
              </h3>

              <p className="text-prima-muted text-sm mt-1">
                Monitoring data pasien dan sistem.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

    {/* DECORATION */}
    <div
      className="
        absolute
        right-[-120px]
        top-[-120px]
        w-[320px]
        h-[320px]
        rounded-full
        border-[40px]
        border-[#D8CCBC]
        opacity-40
      "
    />

  </div>

</section>

      <footer
  className="
    px-10
    pt-24
    pb-10
    mt-24
    border-t
    border-prima-sand
    bg-[#F1ECE4]
  "
>

  <div
    className="
      grid
      grid-cols-4
      gap-12
    "
  >

    {/* BRAND */}
    <div>

      <h2 className="text-4xl font-bold text-prima-green">
        PRIMA
      </h2>

      <p
        className="
          text-prima-muted
          leading-relaxed
          mt-6
        "
      >
        Platform layanan kesehatan modern
        untuk membantu pasien, dokter,
        dan admin dalam satu sistem
        terintegrasi.
      </p>

    </div>

    {/* MENU */}
    <div>

      <h3 className="text-lg font-semibold text-prima-text">
        Navigasi
      </h3>

      <div className="space-y-4 mt-6">

        <p className="text-prima-muted cursor-pointer">
          Home
        </p>

        <p className="text-prima-muted cursor-pointer">
          Layanan
        </p>

        <p className="text-prima-muted cursor-pointer">
          Konsultasi
        </p>

        <p className="text-prima-muted cursor-pointer">
          Dashboard
        </p>

      </div>

    </div>

    {/* SYSTEM */}
    <div>

      <h3 className="text-lg font-semibold text-prima-text">
        Sistem
      </h3>

      <div className="space-y-4 mt-6">

        <p className="text-prima-muted cursor-pointer">
          Login
        </p>

        <p className="text-prima-muted cursor-pointer">
          Register
        </p>

        <p className="text-prima-muted cursor-pointer">
          Maintenance
        </p>

        <p className="text-prima-muted cursor-pointer">
          Support
        </p>

      </div>

    </div>

    {/* CONTACT */}
    <div>

      <h3 className="text-lg font-semibold text-prima-text">
        Kontak
      </h3>

      <div className="space-y-4 mt-6">

        <p className="text-prima-muted">
          primahealth@gmail.com
        </p>

        <p className="text-prima-muted">
          +62 812 3456 7890
        </p>

        <p className="text-prima-muted">
          Sidoarjo, Indonesia
        </p>

      </div>

    </div>

  </div>

  {/* BOTTOM */}
  <div
    className="
      flex
      items-center
      justify-between
      border-t
      border-prima-sand
      mt-16
      pt-8
    "
  >

    <p className="text-prima-muted text-sm">
      © 2026 PRIMA Healthcare. All rights reserved.
    </p>

    <div className="flex gap-6">

      <p className="text-prima-muted text-sm cursor-pointer">
        Privacy Policy
      </p>

      <p className="text-prima-muted text-sm cursor-pointer">
        Terms
      </p>

      <p className="text-prima-muted text-sm cursor-pointer">
        Disclaimer
      </p>

    </div>

  </div>

</footer>

    </div>
  )
}

export default LandingPage