import { useNavigate } from "react-router-dom";
import {
  Bell,
  Globe,
  Lock,
  Shield,
  ChevronRight,
} from "lucide-react";

function AccountSettingsCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-prima-card rounded-[28px] border border-[#F1ECE4] shadow-sm">

      {/* HEADER */}
      <div className="p-6 border-b border-[#F1ECE4]">
        <h2 className="text-xl font-semibold text-prima-text">
          Pengaturan Akun
        </h2>
      </div>

      {/* MENU */}
      <div className="divide-y divide-[#F1ECE4]">

        <SettingItem
          icon={<Bell size={18} />}
          title="Notifikasi"
          description="Atur pengingat antrean dan hasil lab"
          onClick={() =>
            navigate("/patient/security")
          }
        />

        <SettingItem
          icon={<Globe size={18} />}
          title="Bahasa"
          description="Bahasa Indonesia"
          onClick={() =>
            navigate("/patient/security")
          }
        />

        <SettingItem
          icon={<Lock size={18} />}
          title="Ubah Kata Sandi"
          description="Perbarui keamanan akun"
          onClick={() =>
            navigate("/patient/security")
          }
        />

        <SettingItem
          icon={<Shield size={18} />}
          title="Keamanan & Privasi"
          description="Kelola privasi dan perlindungan data"
          onClick={() =>
            navigate("/patient/security")
          }
        />

      </div>

    </div>
  );
}

function SettingItem({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        justify-between
        gap-4
        p-5
        text-left
        transition
        hover:bg-prima-background
      "
    >

      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-prima-sand
            text-prima-green
          "
        >
          {icon}
        </div>

        <div>
          <p className="font-medium text-prima-text">
            {title}
          </p>

          <p className="text-sm text-prima-secondary">
            {description}
          </p>
        </div>

      </div>

      <ChevronRight
        size={18}
        className="text-prima-secondary"
      />

    </button>
  );
}

export default AccountSettingsCard;