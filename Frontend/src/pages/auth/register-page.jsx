import Button from "../../components/ui/button"
import Input from "../../components/ui/input"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "../../services/api"

function RegisterPage() {

  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

const handleRegister = async () => {

  setError("")

  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword
  ) {

    setError("Semua field wajib diisi")

    return
  }

  if (password !== confirmPassword) {

    setError("Konfirmasi password tidak sama")

    return
  }

  try {

    await api.post(
      "/auth/register-pasien",
      {
        nama_lengkap: name,
        email,
        password,
      }
    )

    alert("Registrasi berhasil")

    navigate("/login")

  } catch (err) {

    setError(
      err.response?.data?.message ||
      "Registrasi gagal"
    )
  }
}

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

      <div className="w-full max-w-2xl">

<div className="text-center mb-8">

  <h1 className="text-4xl font-bold text-prima-green">
    PRIMA
  </h1>

  <p className="text-prima-muted">
    Health Services
  </p>

  <h2 className="text-4xl font-bold mt-8">
    Buat Akun Baru
  </h2>

  <p className="text-prima-muted mt-2">
    Daftar untuk mulai menggunakan layanan kesehatan PRIMA
  </p>

</div>

        {/* CARD */}
        <div
          className="
            bg-white
            rounded-[32px]
            border
            border-prima-sand
            p-10
            shadow-sm
          "
        >

          {/* HEADER */}
          <div className="text-center">

          </div>

          {/* FORM */}
          <div className="mt-10 space-y-6">

            {/* NAMA */}
            <div>

              <label
                className="
                  text-sm
                  font-medium
                  text-prima-text
                "
              >
                Nama lengkap
              </label>

              <div className="mt-2">

            <Input
              type="text"
              placeholder="Masukkan nama sesuai KTP"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

              </div>

            </div>

            {/* NIK */}
            <div>

              <label
                className="
                  text-sm
                  font-medium
                  text-prima-text
                "
              >
                NIK/SIP/NIP
              </label>

              <input
                type="text"
                placeholder="16 digit nomor induk kependudukan"
                className="
                  w-full
                  mt-2
                  px-4
                  py-3
                  rounded-2xl
                  border
                  border-red-300
                  bg-[#F8F5EF]
                  outline-none
                "
              />

              <p className="text--400 text-xs mt-2">
                Wajib diisi • Sesuai KTP Anda
              </p>

            </div>

            {/* HP + EMAIL */}
            <div className="grid grid-cols-2 gap-4">

              <div>

                <label
                  className="
                    text-sm
                    font-medium
                    text-prima-text
                  "
                >
                  Nomor HP
                </label>

                <div className="flex gap-3 mt-2">

                  <div
                    className="
                      px-4
                      py-3
                      rounded-2xl
                      bg-[#F8F5EF]
                      border
                      border-prima-sand
                      text-prima-text
                    "
                  >
                    +62
                  </div>

                  <input
                    type="text"
                    placeholder="812345678"
                    className="
                      flex-1
                      px-4
                      py-3
                      rounded-2xl
                      bg-[#F8F5EF]
                      border
                      border-prima-sand
                      outline-none
                    "
                  />

                </div>

              </div>

              <div>

                <label
                  className="
                    text-sm
                    font-medium
                    text-prima-text
                  "
                >
                  Email
                </label>

                <div className="mt-2">

                <Input
                  type="email"
                  placeholder="contoh@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                </div>

              </div>

            </div>

            {/* TANGGAL + GENDER */}
            <div className="grid grid-cols-2 gap-4">

              <div>

                <label
                  className="
                    text-sm
                    font-medium
                    text-prima-text
                  "
                >
                  Tanggal lahir
                </label>

                <div className="mt-2">

                  <input
                    type="date"
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-2xl
                      bg-[#F8F5EF]
                      border
                      border-prima-sand
                      outline-none
                    "
                  />

                </div>

              </div>

              <div>

                <label
                  className="
                    text-sm
                    font-medium
                    text-prima-text
                  "
                >
                  Jenis kelamin
                </label>

                <div className="flex gap-5 mt-5">

                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" />
                    Laki-laki
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" />
                    Perempuan
                  </label>

                </div>

              </div>

            </div>

            {/* PASSWORD */}
            <div>

              <label
                className="
                  text-sm
                  font-medium
                  text-prima-text
                "
              >
                Password
              </label>

              <div className="mt-2">

              <Input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              </div>

            </div>

            {/* KONFIRMASI PASSWORD */}
            <div>

              <label
                className="
                  text-sm
                  font-medium
                  text-prima-text
                "
              >
                Konfirmasi password
              </label>

              <div className="mt-2">

              <Input
                type="password"
                placeholder="Konfirmasi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              </div>

            </div>

            {/* CHECKBOX */}
            <label className="flex items-start gap-3">

              <input
                type="checkbox"
                className="mt-1"
              />

              <p
                className="
                  text-sm
                  text-prima-muted
                  leading-relaxed
                "
              >
                Saya menyetujui Syarat &
                Ketentuan serta Kebijakan
                Privasi yang berlaku
                di layanan kesehatan PRIMA.
              </p>

            </label>

            {/* BUTTON */}
            <div className="pt-2">
<Button
  variant="primary"
  className="w-full mt-6"
  onClick={handleRegister}
>
  Daftar Sekarang
</Button>

            </div>

              {
                error && (
                  <p className="text-red-500 text-sm mt-4">
                    {error}
                  </p>
                )
              }

<div className="mt-8">

  <div className="text-center text-xs text-prima-muted mb-4">
    SUDAH PUNYA AKUN?
  </div>

<Button
  variant="outline"
  className="w-full h-14 text-lg"
  onClick={() => navigate("/login")}
>
  Masuk
</Button>

</div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="text-center mt-8">

          <p className="text-prima-muted text-sm">
            Data Anda dienkripsi secara aman dan rahasia
          </p>

        </div>

      </div>

    </div>
  )
}

export default RegisterPage