import Button from "../components/ui/button"
import landingHero from "../assets/images/landing-hero.webp"
import { useNavigate } from "react-router-dom"
function LandingPage() {
const navigate = useNavigate()

  return (
  <div className="bg-prima-background min-h-screen">

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
<Button
  variant="outline"
  onClick={() => navigate("/login")}
>
  Login
</Button>

<Button
  variant="primary"
  onClick={() => navigate("/register")}
>
  Register
</Button>

  </div>

</nav>

<section
  className="
    px-10
    py-24
    flex
    items-center
    justify-between
    gap-12
  "
>

  <div className="max-w-2xl">
    

    <h1
      className="
        text-6xl
        font-bold
        text-prima-text
        leading-tight
        mt-6
      "
    >
      Sistem Praktik Dokter Modern
      untuk Pelayanan yang Lebih Cepat
    </h1>

    <p
      className="
        text-prima-muted
        text-lg
        mt-6
        leading-relaxed
      "
    >
      PRIMA membantu pasien, dokter, dan admin
      mengelola layanan kesehatan secara
      terintegrasi, aman, dan efisien.
    </p>

      <div className="flex gap-4 mt-10">
      <Button
      variant="primary"
      onClick={() => navigate("/login")}
      >
      Masuk
      </Button>

    </div>

  </div>

<div
  className="
    relative
    w-[520px]
    h-[620px]
    rounded-[40px]
    overflow-hidden
    shadow-2xl
  "
>

  {/* HERO IMAGE */}
  <img
    src={landingHero}
    alt="PRIMA Hero"
    className="
      w-full
      h-full
      object-cover
    "
  />

  {/* OVERLAY */}
  <div
    className="
      absolute
      inset-0
      bg-black/10
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
      p-6
      shadow-xl
    "
  >


  </div>

</div>

</section>

<section className="px-10 py-24">

  <div className="text-center">


    <h2
      className="
        text-4xl
        font-bold
        text-prima-text
        mt-4
      "
    >
      Solusi Digital untuk
      Pelayanan Kesehatan Modern
    </h2>

  </div>

  <div
    className="
      grid
      grid-cols-4
      gap-6
      mt-16
    "
  >

    <div
      className="
        bg-prima-card
        rounded-3xl
        p-8
        border
        border-prima-sand
      "
    >
      <div
        className="
          w-14
          h-14
          rounded-2xl
          bg-prima-sand
          mb-6
        "
      />

      <h3 className="text-xl font-semibold text-prima-text">
        Rekam Medis Digital
      </h3>

      <p className="text-prima-muted mt-4 leading-relaxed">
        Penyimpanan data pasien secara aman,
        cepat, dan terintegrasi.
      </p>

    </div>

    <div
      className="
        bg-prima-card
        rounded-3xl
        p-8
        border
        border-prima-sand
      "
    >

      <div
        className="
          w-14
          h-14
          rounded-2xl
          bg-prima-sand
          mb-6
        "
      />

      <h3 className="text-xl font-semibold text-prima-text">
        Konsultasi Online
      </h3>

      <p className="text-prima-muted mt-4 leading-relaxed">
        Konsultasi pasien dan dokter
        melalui chat terjadwal.
      </p>

    </div>

    <div
      className="
        bg-prima-card
        rounded-3xl
        p-8
        border
        border-prima-sand
      "
    >

      <div
        className="
          w-14
          h-14
          rounded-2xl
          bg-prima-sand
          mb-6
        "
      />

      <h3 className="text-xl font-semibold text-prima-text">
        Dashboard Dokter
      </h3>

      <p className="text-prima-muted mt-4 leading-relaxed">
        Kelola pasien, jadwal,
        dan rekam medis dengan mudah.
      </p>

    </div>

    <div
      className="
        bg-prima-card
        rounded-3xl
        p-8
        border
        border-prima-sand
      "
    >

      <div
        className="
          w-14
          h-14
          rounded-2xl
          bg-prima-sand
          mb-6
        "
      />

      <h3 className="text-xl font-semibold text-prima-text">
        Monitoring Admin
      </h3>

      <p className="text-prima-muted mt-4 leading-relaxed">
        Monitoring sistem,
        maintenance, dan data layanan.
      </p>

    </div>

  </div>

</section>

   
<footer
  className="
    px-10
    py-16
    border-t
    border-prima-sand
    mt-24
  "
>

  <div
    className="
      flex
      items-start
      justify-between
      gap-12
    "
  >

    {/* LEFT */}
    <div className="max-w-md">

      <h2 className="text-3xl font-bold text-prima-green">
        PRIMA
      </h2>

      <p className="text-prima-muted mt-6 leading-relaxed">
        Program Rekam Medis & Interaksi Medis
        Terpadu untuk pelayanan kesehatan
        yang lebih modern, aman, dan efisien.
      </p>

    </div>

    {/* RIGHT */}
    <div className="flex gap-20">

      <div>

        <h3 className="text-prima-text font-semibold">
          Information
        </h3>

        <div className="mt-5 space-y-3">

          <p className="text-prima-muted cursor-pointer">
            Kontak Kami
          </p>

          <p className="text-prima-muted cursor-pointer">
            Syarat Dan Ketenntuan
          </p>

          <p className="text-prima-muted cursor-pointer">
            Kebijakan Privasi          </p>

        </div>

      </div>

      <div>

      </div>

    </div>

  </div>

  <div
    className="
      border-t
      border-prima-sand
      mt-12
      pt-8
      text-center
    "
  >

    <p className="text-prima-muted text-sm">
      © 2026 PRIMA. All rights reserved.
    </p>

  </div>

</footer>

  </div>
)
}

export default LandingPage