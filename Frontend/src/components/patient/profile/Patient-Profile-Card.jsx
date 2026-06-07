import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  User,
  Pencil,
  LogOut,
} from "lucide-react";
import { formatDate } from "@/utils/patient/format-date";
import { formatDateOnly } from "@/utils/patient/format-date-only";

const PatientProfileCard = ({ profile }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // optional: reset state kalau nanti pakai context
    navigate("/");
    };

  const initialName =
    profile?.nama_lengkap
      ?.charAt(0)
      ?.toUpperCase() || "U";

  return (
    <div className="rounded-[28px] bg-prima-card p-8 border border-[#F1ECE4] shadow-sm">

      {/* Avatar */}
      <div className="flex flex-col items-center">

        <div className="h-24 w-24 rounded-full bg-prima-green flex items-center justify-center text-3xl font-bold text-white">
          {initialName}
        </div>

        <h2 className="mt-4 text-2xl font-bold text-prima-text text-center">
          {profile?.nama_lengkap ||
            "Nama Belum Diisi"}
        </h2>

        <span className="mt-3 rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
          Akun Aktif
        </span>

      </div>

      {/* Informasi Akun */}
      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">

          <Mail
            size={18}
            className="text-prima-teal"
          />

          <p className="text-prima-secondary">
            {profile?.email ||
              "Email Belum Diisi"}
          </p>

        </div>

        <div className="flex items-center gap-3">

          <Phone
            size={18}
            className="text-prima-teal"
          />

          <p className="text-prima-secondary">
            {profile?.nomor_hp ||
              "Nomor HP Belum Diisi"}
          </p>

        </div>

        <div className="flex items-center gap-3">

          <User
            size={18}
            className="text-prima-teal"
          />

          <p className="text-prima-secondary">
            {profile?.nik ||
              "NIK Belum Diisi"}
          </p>

        </div>

      </div>

      {/* Informasi Pasien */}
      <div className="mt-8 border-t border-[#F1ECE4] pt-6">

        <h3 className="font-semibold text-prima-text">
          Informasi Pasien
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-4">

          <div>

            <p className="text-xs text-prima-secondary">
              Jenis Kelamin
            </p>

            <p className="font-medium text-prima-text">
              {profile?.jenis_kelamin ||
                "-"}
            </p>

          </div>

          <div>

            <p className="text-xs text-prima-secondary">
              Tanggal Lahir
            </p>

            <p className="font-medium text-prima-text">
              {profile?.tanggal_lahir
                ? formatDateOnly(
                    profile.tanggal_lahir
                  )
                : "-"}
            </p>

          </div>

          <div>

            <p className="text-xs text-prima-secondary">
              Role
            </p>

            <p className="font-medium capitalize text-prima-text">
              {profile?.role || "-"}
            </p>

          </div>

          <div>

            <p className="text-xs text-prima-secondary">
              ID Pasien
            </p>

            <p className="font-medium text-prima-text">
              ID No {profile?.id || "-"}
            </p>

          </div>

        </div>

      </div>

      {/* Login Terakhir */}
      {profile?.last_login_at && (
        <div className="mt-6 rounded-2xl bg-prima-sand p-4">

          <p className="text-xs text-prima-secondary">
            Login Terakhir
          </p>

          <p className="mt-2 text-sm text-prima-text">
            {formatDate(profile.last_login_at)}
          </p>

        </div>
      )}

      {/* Tombol Edit */}
      <button
        onClick={() =>
          navigate(
            "/patient/profile/edit"
          )
        }
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-prima-green py-3 text-white font-medium transition hover:opacity-90"
      >

        <Pencil size={18} />

        Edit Profil

      </button>
      <div className="mt-6 border-t border-[#F1ECE4] pt-4">
        <button 
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-prima-text hover:bg-prima-sand transition-all duration-300">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </div>
  );
};

export default PatientProfileCard;