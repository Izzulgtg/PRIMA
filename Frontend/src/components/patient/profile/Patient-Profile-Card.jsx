import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  User,
  Pencil,
} from "lucide-react";

const PatientProfileCard = ({ profile }) => {
  const navigate = useNavigate();

  const initialName =
    profile?.nama_lengkap?.charAt(0)?.toUpperCase() ||
    "U";

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

      {/* Info */}
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
      <div className="mt-8 border-t border-[#F1ECE4] pt-6">

        <h3 className="font-semibold text-prima-text">
          Informasi Kesehatan
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-4">

          <div>
            <p className="text-xs text-prima-secondary">
              Golongan Darah
            </p>

            <p className="font-medium">
              {profile?.golongan_darah}
            </p>
          </div>

          <div>
            <p className="text-xs text-prima-secondary">
              Jenis Kelamin
            </p>

            <p className="font-medium">
              {profile?.jenis_kelamin}
            </p>
          </div>

          <div>
            <p className="text-xs text-prima-secondary">
              Tinggi Badan
            </p>

            <p className="font-medium">
              {profile?.tinggi_badan} cm
            </p>
          </div>

          <div>
            <p className="text-xs text-prima-secondary">
              Berat Badan
            </p>

            <p className="font-medium">
              {profile?.berat_badan} kg
            </p>
          </div>

        </div>

      </div>
      <div className="mt-6 rounded-2xl bg-prima-sand p-4">

        <p className="text-xs text-prima-secondary">
          Riwayat Alergi
        </p>

        <p className="mt-2 text-prima-text">
          {profile?.alergi || "Tidak Ada"}
        </p>

      </div>

      {/* Login terakhir */}
      {profile?.last_login_at && (
        <div className="mt-8 rounded-2xl bg-prima-sand p-4">

          <p className="text-xs text-prima-secondary">
            Login Terakhir
          </p>

          <p className="mt-1 text-sm text-prima-text">
            {new Date(
              profile.last_login_at
            ).toLocaleString("id-ID")}
          </p>

        </div>
      )}

      {/* Button Edit */}
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

    </div>
  );
};

export default PatientProfileCard;