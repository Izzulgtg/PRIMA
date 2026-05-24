import Button from "../../components/ui/button"
import Input from "../../components/ui/input"

function RegisterPage() {

  return (
  <div
    className="
      min-h-screen
      bg-prima-background
      flex
      items-center
      justify-center
      p-8
    "
  >

    <div className="w-full max-w-5xl">

      {/* HEADER */}
      <div className="text-center">

        <div
          className="
            flex
            items-center
            justify-center
            gap-4
          "
        >

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-prima-green
            "
          />

          <div className="text-left">

            <h1 className="text-3xl font-bold text-prima-green">
              PRIMA
            </h1>

            <p className="text-prima-muted text-sm">
              Health Services
            </p>

          </div>

        </div>

        <h2
          className="
            text-5xl
            font-bold
            text-prima-text
            mt-10
          "
        >
          Buat Akun Baru
        </h2>

        <p
          className="
            text-prima-muted
            mt-5
            text-lg
          "
        >
          Daftar untuk mulai menggunakan
          layanan kesehatan PRIMA.
        </p>

      </div>

      {/* FORM CARD */}
      <div
        className="
          bg-white
          rounded-[40px]
          border
          border-prima-sand
          shadow-sm
          max-w-3xl
          mx-auto
          mt-14
          p-12
          relative
          overflow-hidden
        "
      >

        {/* DECORATION */}
        <div
          className="
            absolute
            top-[-80px]
            right-[-80px]
            w-[220px]
            h-[220px]
            rounded-full
            border-[30px]
            border-[#EFE8DD]
          "
        />

        {/* FORM */}
        <div className="relative z-10">

          {/* NAMA */}
          <div>

            <label className="text-prima-text font-medium">
              Nama Lengkap
            </label>

            <div className="mt-3">

              <Input
                type="text"
                placeholder="Masukkan nama lengkap"
              />

            </div>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-6 mt-8">

            <div>

              <label className="text-prima-text font-medium">
                Nomor HP
              </label>

              <div className="mt-3">

                <Input
                  type="text"
                  placeholder="+62 812345678"
                />

              </div>

            </div>

            <div>

              <label className="text-prima-text font-medium">
                Email
              </label>

              <div className="mt-3">

                <Input
                  type="email"
                  placeholder="contoh@mail.com"
                />

              </div>

            </div>

          </div>

          {/* GRID 2 */}
          <div className="grid grid-cols-2 gap-6 mt-8">

            <div>

              <label className="text-prima-text font-medium">
                Tanggal Lahir
              </label>

              <div className="mt-3">

                <Input
                  type="date"
                />

              </div>

            </div>

            <div>

              <label className="text-prima-text font-medium">
                Jenis Kelamin
              </label>

              <div className="flex gap-6 mt-5">

                <label className="flex items-center gap-2 text-prima-muted">

                  <input type="radio" name="gender" />

                  Laki-laki

                </label>

                <label className="flex items-center gap-2 text-prima-muted">

                  <input type="radio" name="gender" />

                  Perempuan

                </label>

              </div>

            </div>

          </div>

          {/* PASSWORD */}
          <div className="mt-8">

            <label className="text-prima-text font-medium">
              Password
            </label>

            <div className="mt-3">

              <Input
                type="password"
                placeholder="Masukkan password"
              />

            </div>

            {/* STRENGTH */}
            <div className="mt-4">

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-[#EEE6DA]
                  overflow-hidden
                "
              >

                <div
                  className="
                    h-full
                    w-[70%]
                    bg-[#B38CF5]
                  "
                />

              </div>

              <div className="flex justify-between mt-2">

                <p className="text-sm text-prima-muted">
                  Password Strength
                </p>

                <p className="text-sm text-[#B38CF5]">
                  70%
                </p>

              </div>

            </div>

          </div>

          {/* CONFIRM */}
          <div className="mt-8">

            <label className="text-prima-text font-medium">
              Konfirmasi Password
            </label>

            <div className="mt-3">

              <Input
                type="password"
                placeholder="Konfirmasi password"
              />

            </div>

          </div>

          {/* CHECKBOX */}
          <div className="flex items-start gap-3 mt-10">

            <input type="checkbox" className="mt-1" />

            <p className="text-prima-muted text-sm leading-relaxed">

              Saya menyetujui syarat dan kebijakan
              layanan kesehatan PRIMA.

            </p>

          </div>

          {/* BUTTON */}
          <div className="mt-10">

            <Button variant="primary">
              Daftar Sekarang
            </Button>

          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 mt-10">

            <div className="h-[1px] bg-prima-sand flex-1" />

            <p className="text-prima-muted text-sm">
              SUDAH PUNYA AKUN?
            </p>

            <div className="h-[1px] bg-prima-sand flex-1" />

          </div>

          {/* LOGIN BUTTON */}
          <div className="mt-8">

            <button
              className="
                w-full
                py-4
                rounded-2xl
                bg-[#B38CF5]
                text-white
                font-medium
              "
            >
              Masuk
            </button>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center mt-12">

        <p className="text-prima-muted text-sm">
          Data Anda dienkripsi secara aman.
        </p>

      </div>

    </div>

  </div>
)
}

export default RegisterPage