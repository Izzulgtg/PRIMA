import PasswordChangeForm from "@/components/patient/security/password-change-form";
import PrivacySettingsCard from "@/components/patient/security/privacy-settings-card";
import LoginHistoryCard from "@/components/patient/security/login-history-card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { dummyLoginHistory } from "@/data/dummy-login-history";

const SecurityPage = () => {
  const navigate = useNavigate();
  const lastLogin =
    dummyLoginHistory.length > 0
      ? new Date(
          dummyLoginHistory[0].login_at
        ).toLocaleString("id-ID")
      : "-";

  return (
    <div className="space-y-6">

      {/* HERO */}

        <div className="flex items-center gap-4">
          <button 
          onClick={() =>navigate("/patient/profile")}
          className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-prima-background hover:bg-prima-sand transition-all duration-200 text-prima-text">
            <ArrowLeft size={18} />kembali
          </button>
        </div>

      {/* HERO */}
      <section className="bg-prima-green rounded-[32px] p-8 text-white">

        <p className="text-sm opacity-80">
          Account Protection
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Keamanan & Privasi Data
        </h1>

        <p className="mt-4 max-w-2xl text-lg opacity-90 leading-relaxed">
          Lindungi akun dan informasi kesehatan pribadi Anda
          melalui pengaturan keamanan serta kontrol privasi
          data medis pada sistem PRIMA.
        </p>

      </section>

      {/* SUMMARY */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* PASSWORD STATUS */}
        <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

          <p className="text-sm text-prima-secondary">
            Password Status
          </p>

          <h2 className="mt-3 text-3xl font-bold text-prima-green">
            Strong
          </h2>

          <p className="mt-2 text-sm text-prima-secondary">
            Password memenuhi standar keamanan.
          </p>

        </div>

        {/* PRIVACY LEVEL */}
        <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

          <p className="text-sm text-prima-secondary">
            Privacy Level
          </p>

          <h2 className="mt-3 text-3xl font-bold text-prima-teal">
            Protected
          </h2>

          <p className="mt-2 text-sm text-prima-secondary">
            Data medis hanya dapat diakses oleh pihak berwenang.
          </p>

        </div>

        {/* LAST LOGIN */}
        <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

          <p className="text-sm text-prima-secondary">
            Last Login
          </p>

          <h2 className="mt-3 text-xl font-bold text-prima-text">
            {lastLogin}
          </h2>

          <p className="mt-2 text-sm text-prima-secondary">
            Aktivitas akun terakhir terdeteksi normal.
          </p>

        </div>

      </section>

      {/* SECURITY SETTINGS HEADER */}
      <section>

        <h2 className="text-2xl font-bold text-prima-text">
          Pengaturan Keamanan
        </h2>

        <p className="mt-2 text-prima-secondary">
          Kelola password akun dan preferensi privasi
          data kesehatan Anda.
        </p>

      </section>

      {/* PASSWORD + PRIVACY */}
      <section className="grid gap-6 lg:grid-cols-2">

        <PasswordChangeForm />

        <PrivacySettingsCard />

      </section>

      {/* LOGIN HISTORY */}
      <section>

        <h2 className="text-2xl font-bold text-prima-text">
          Riwayat Aktivitas Login
        </h2>

        <p className="mt-2 text-prima-secondary">
          Pantau aktivitas login akun untuk menjaga
          keamanan akses ke sistem PRIMA.
        </p>

      </section>

      <LoginHistoryCard
        loginHistory={dummyLoginHistory}
      />

    </div>
  );
};

export default SecurityPage;