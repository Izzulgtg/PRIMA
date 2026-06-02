import { Shield, Lock, LogOut } from "lucide-react";

const PrivacySettingsCard = ({
  lastLogin,
  accountStatus = "Aktif",
  onLogoutAllDevices,
}) => {
  return (
    <div className="rounded-[28px] border border-[#F1ECE4] bg-prima-card p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold text-prima-text">
        Privasi Data
      </h2>

      <div className="space-y-4">

        {/* DATA PROTECTION */}
        <div className="rounded-2xl bg-prima-sand p-4">

          <div className="flex items-center gap-3">

            <Shield
              size={18}
              className="text-prima-green"
            />

            <h3 className="font-medium text-prima-text">
              Perlindungan Data Medis
            </h3>

          </div>

          <p className="mt-3 text-sm text-prima-secondary">
            Data kesehatan Anda hanya dapat diakses
            oleh dokter yang menangani dan administrator
            sistem yang berwenang.
          </p>

        </div>

        {/* LAST LOGIN */}
        <div className="rounded-2xl bg-prima-sand p-4">

          <div className="flex items-center gap-3">

            <Lock
              size={18}
              className="text-prima-green"
            />

            <h3 className="font-medium text-prima-text">
              Login Terakhir
            </h3>

          </div>

          <p className="mt-3 text-sm text-prima-secondary">
            {lastLogin || "Belum tersedia"}
          </p>

        </div>

        {/* STATUS */}
        <div className="rounded-2xl bg-prima-sand p-4">

          <h3 className="font-medium text-prima-text">
            Status Akun
          </h3>

          <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {accountStatus}
          </span>

        </div>

        {/* LOGOUT */}
        <button
          onClick={onLogoutAllDevices}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-prima-warning
            py-3
            font-medium
            text-white
            transition
            hover:opacity-90
          "
        >

          <LogOut size={18} />

          Logout Semua Perangkat

        </button>

      </div>

    </div>
  );
};

export default PrivacySettingsCard;