import Button from "../components/ui/button"
import landingHero from "../assets/images/landing-hero.webp"
import { useNavigate } from "react-router-dom"
import {
  CalendarDays,
  MessageSquare,
  ShieldCheck
} from "lucide-react"
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
        text-5xl font-bold
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
    w-[480px]
    h-[520px]
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

</div>

</section>

<section className="px-10 py-24">

  <div className="text-center">
  <h2 className="text-4xl font-bold text-prima-text">
    Layanan Unggulan Kami
  </h2>

  <p className="text-prima-muted mt-4 max-w-2xl mx-auto">
    Kami mengintegrasikan teknologi terkini dengan empati medis
    untuk memberikan pengalaman perawatan terbaik bagi Anda
    dan keluarga.
  </p>
</div>


  <div
  
    className="
      grid
      md:grid-cols-3
      gap-6
      mt-16
    "
  >

    <div
      className="
        bg-[#F5F0E8]
        rounded-3xl
        p-8 min-h-[260px]
        border
        border-prima-sand
      "
    >
      


<div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-6">
  <CalendarDays
    size={22}
    className="text-blue-500"
  />

  
</div>

      <h3 className="text-xl font-semibold text-prima-text">
        Jadwal Dokter Real-Time
      </h3>

      <p className="text-prima-muted mt-4 leading-relaxed">
        Pesan pertemuan dengan dokter spesialis pilihan Anda tanpa perlu antre panjang di rumah sakit.
      </p>

    </div>

    

    <div
      className="
        bg-[#F5F0E8]
        rounded-3xl
        p-8 min-h-[260px]
        border
        border-prima-sand
      "
    >

<div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-6">
  <MessageSquare
    size={22}
    className="text-purple-500"
  />
</div>

      <h3 className="text-xl font-semibold text-prima-text">
        Konsultasi Mudah & Cepat
      </h3>

      <p className="text-prima-muted mt-4 leading-relaxed">
       Hubungi tim medis kami kapan saja
        melalui video call atau chat untuk
        diagnosis awal yang akurat.
      </p>



    </div>

    <div
      className="
        bg-[#F5F0E8]
        rounded-3xl
        p-8 min-h-[260px]
        border
        border-prima-sand
      "
    >

<div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-6">
  <ShieldCheck
    size={22}
    className="text-violet-500"
  />
</div>

      <h3 className="text-xl font-semibold text-prima-text">
        Data Kesehatan Aman
      </h3>

      <p className="text-prima-muted mt-4 leading-relaxed">
       Seluruh rekam medis Anda terenkripsi
dengan standar keamanan tertinggi
dan hanya dapat diakses oleh Anda.
      </p>


    </div>

  </div>

</section>

<section className="px-10 pb-24">

  <div
    className="
      bg-[#F0EBE3]
      rounded-[40px]
      p-12
      grid
      md:grid-cols-2
      gap-10
      items-center
    "
  >

    {/* LEFT */}
    <div>

      <h2 className="text-4xl font-bold text-prima-text leading-tight">
        Bergabung dengan Ekosistem
        <br />
        Kesehatan Masa Depan
      </h2>

      <p className="text-prima-muted mt-6 leading-relaxed">
        Kami percaya bahwa kesehatan adalah investasi paling
        berharga. Itulah mengapa kami menyediakan layanan
        yang inklusif, terjangkau, dan berkualitas tinggi
        bagi seluruh lapisan masyarakat.
      </p>

      <div className="flex gap-16 mt-10">

        <div>
          <h3 className="text-4xl font-bold text-purple-500">
            98%
          </h3>

          <p className="uppercase tracking-widest text-sm text-prima-muted mt-2">
            Kepuasan Pasien
          </p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-blue-500">
            24/7
          </h3>

          <p className="uppercase tracking-widest text-sm text-prima-muted mt-2">
            Dukungan Medis
          </p>
        </div>

      </div>

    </div>

    {/* RIGHT */}
    <div className="space-y-4">

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h3 className="font-semibold text-prima-text">
          ✓ Terintegrasi dengan BPJS
        </h3>

        <p className="text-prima-muted mt-2">
          Kemudahan klaim dan administrasi tanpa ribet.
        </p>

      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h3 className="font-semibold text-prima-text">
          ✓ Jaringan Lab Nasional
        </h3>

        <p className="text-prima-muted mt-2">
          Hasil tes laboratorium akurat dan cepat tersedia di aplikasi.
        </p>

      </div>

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
      © 2026 PRIMA Healthcare. Memberikan kenyamanan
      dalam setiap langkah pemulihan. Dedikasi kami untuk
      kesehatan Anda tidak pernah berhenti.
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
            Syarat Dan Ketentuan
          </p>


        </div>

      </div>

            <div>

        <h3 className="text-prima-text font-semibold">
          Legal
        </h3>

        <div className="mt-5 space-y-3">

          <p className="text-prima-muted cursor-pointer">
            Kebijakan Privasi
          </p>

          <p className="text-prima-muted cursor-pointer">
            Disclaimer      </p>

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
      Terakreditasi Kementerian Kesehatan Republik Indonesia
    </p>

  </div>

</footer>

  </div>
)
}

export default LandingPage