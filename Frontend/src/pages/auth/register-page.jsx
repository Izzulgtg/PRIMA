import Button from "../../components/ui/button"
import Input from "../../components/ui/input"
import { useNavigate } from "react-router-dom"

function RegisterPage() {
const navigate = useNavigate()
  return (
    <div
      className="
        min-h-screen
        bg-prima-background
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div
        className="
          bg-prima-card
          w-full
          max-w-md
          rounded-3xl
          p-8
          shadow-sm
          border
          border-prima-sand
        "
      >

        <div>

          <h1 className="text-4xl font-bold text-prima-green">
            PRIMA
          </h1>

          <h2 className="text-2xl font-semibold text-prima-text mt-6">
            Create Account
          </h2>

          <p className="text-prima-muted mt-2">
            Daftar untuk menggunakan layanan PRIMA.
          </p>

        </div>

        <div className="mt-8 space-y-5">

          <Input
            type="text"
            placeholder="Nama lengkap"
          />

          <Input
            type="email"
            placeholder="Masukkan email"
          />

          <Input
            type="password"
            placeholder="Masukkan password"
          />

          <select
            className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-prima-sand
              bg-white
              text-prima-text

              focus:outline-none
              focus:ring-2
              focus:ring-prima-green
            "
          >

            <option>
              Pilih Role
            </option>

            <option>
              Pasien
            </option>

            <option>
              Dokter
            </option>

          </select>

          <Input
            type="password"
            placeholder="Konfirmasi password"
          />

        </div>

        <div className="mt-8">

          <Button variant="primary">
            Register
          </Button>

        </div>

        <p className="text-prima-muted text-sm mt-6 text-center">

          Sudah punya akun?

          <span className="text-prima-teal cursor-pointer ml-1">
            Login
          </span>

        </p>

      </div>

    </div>
  )
}

export default RegisterPage