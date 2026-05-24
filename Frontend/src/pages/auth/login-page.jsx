import Button from "../../components/ui/button"
import Input from "../../components/ui/input"

function LoginPage() {
  return (
  <div className="bg-prima-background min-h-screen p-6">

    {/* MAIN CONTAINER */}
    <div
      className="
        bg-[#F7F2EA]
        min-h-[95vh]
        rounded-sm
        border
        border-prima-sand
        overflow-hidden
        flex
        flex-col
      "
    >

      {/* TOP NAVBAR */}
      <div
        className="
          flex
          items-center
          justify-between
          px-8
          py-5
          border-b
          border-prima-sand
        "
      >

        <h1 className="text-3xl font-bold text-prima-green">
          PRIMA
        </h1>

        <Button variant="primary">
          Masuk
        </Button>

      </div>

      {/* CONTENT */}
      <div
        className="
          flex
          items-center
          justify-center
          flex-1
          px-16
          py-10
        "
      >

        <div
          className="
            w-full
            max-w-7xl
            flex
            items-center
            gap-10
          "
        >

          {/* LEFT IMAGE */}
          <div
            className="
              relative
              w-[520px]
              h-[650px]
              rounded-[36px]
              overflow-hidden
              shadow-lg
              bg-[#D8CCBC]
              flex-shrink-0
            "
          >

            {/* IMAGE PLACEHOLDER */}
            <div className="w-full h-full bg-[#CDBBA5]" />

            {/* OVERLAY */}
            <div
              className="
                absolute
                inset-0
                bg-black/10
              "
            />

            {/* TEXT */}
            <div
              className="
                absolute
                bottom-10
                left-10
                right-10
                text-white
              "
            >

              <h2
                className="
                  text-5xl
                  font-bold
                  leading-tight
                "
              >
                Kesehatan bermula dari ketenangan.
              </h2>

              <p className="mt-5 text-lg leading-relaxed">

                Nikmati akses layanan kesehatan
                profesional dengan pengalaman
                yang nyaman dan modern.

              </p>

            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="flex-1 max-w-xl">

            <div>

              <h2
                className="
                  text-5xl
                  font-bold
                  text-prima-text
                  leading-tight
                "
              >
                Selamat Datang Kembali
              </h2>

              <p
                className="
                  text-prima-muted
                  mt-4
                  text-lg
                "
              >
                Silakan masuk untuk melanjutkan
                akses kesehatan Anda.
              </p>

            </div>

            {/* FORM CARD */}
            <div
              className="
                bg-[#F4EFE6]
                rounded-[36px]
                p-10
                mt-10
                border
                border-prima-sand
              "
            >

              <div className="space-y-6">

                <Input
                  type="email"
                  placeholder="nama@email.com"
                />

                <Input
                  type="password"
                  placeholder="password"
                />

              </div>

              <div className="mt-8">

                <Button variant="primary">
                  Masuk
                </Button>

              </div>

              <p
                className="
                  text-center
                  text-prima-muted
                  text-sm
                  mt-8
                  leading-relaxed
                "
              >
                “Akses dashboard akan disesuaikan
                otomatis berdasarkan akun Anda”
              </p>

            </div>

            {/* SECURITY TEXT */}
            <div className="mt-8">

              <p className="text-prima-muted">
                Sistem Keamanan Terenkripsi PRIMA
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div
        className="
          flex
          items-center
          justify-between
          px-8
          py-6
          border-t
          border-prima-sand
        "
      >

        <div>

          <h3 className="text-prima-green font-semibold">
            PRIMA
          </h3>

          <p className="text-prima-muted text-sm mt-2">
            © 2026 PRIMA Healthcare.
          </p>

        </div>

        <div className="flex gap-8">

          <p className="text-prima-muted text-sm">
            Kontak Kami
          </p>

          <p className="text-prima-muted text-sm">
            Kebijakan Privasi
          </p>

          <p className="text-prima-muted text-sm">
            Disclaimer
          </p>

        </div>

      </div>

    </div>

  </div>
)
}

export default LoginPage