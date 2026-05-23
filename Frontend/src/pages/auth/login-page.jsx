import Button from "../../components/ui/button"
import Input from "../../components/ui/input"

function LoginPage() {
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
            Welcome Back
          </h2>

          <p className="text-prima-muted mt-2">
            Login untuk melanjutkan ke dashboard PRIMA.
          </p>

        </div>

        <div className="mt-8 space-y-5">

          <Input
            type="email"
            placeholder="Masukkan email"
          />

          <Input
            type="password"
            placeholder="Masukkan password"
          />

        </div>

        <div className="mt-8">

          <Button variant="primary">
            Login
          </Button>

        </div>

        <p className="text-prima-muted text-sm mt-6 text-center">

          Belum punya akun?

          <span className="text-prima-teal cursor-pointer ml-1">
            Register
          </span>

        </p>

      </div>

    </div>
  )
}

export default LoginPage