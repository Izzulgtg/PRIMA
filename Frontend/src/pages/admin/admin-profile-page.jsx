import { useEffect, useState } from "react";
import { getProfile } from "../../services/admin/profile-service";

function AdminProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

const fetchProfile = async () => {
  try {
    const response = await getProfile();

    console.log("PROFILE RESPONSE =", response);

    setProfile(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

if (loading) {
  return <div className="p-6">Loading...</div>;
}

if (!profile) {
  return (
    <div className="p-6">
      Profil admin tidak ditemukan
    </div>
  );
}
  return (
    <div className="p-6 bg-[#F7F4EC] min-h-screen">

      {/* Header */}
      <div className="bg-[#E8F0DF] rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4">

          <div className="w-20 h-20 rounded-full bg-[#6B8F71] flex items-center justify-center text-white text-3xl font-bold">
            {profile.nama_lengkap?.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {profile.nama_lengkap}
            </h1>

            <p className="text-gray-600">
              {profile.level_akses || "Administrator"}
            </p>

            <p className="text-sm text-gray-500">
              Login terakhir :
              {" "}
              {profile.last_login_at
                ? new Date(profile.last_login_at).toLocaleString()
                : "-"}
            </p>
          </div>

        </div>
      </div>

      {/* Data Pribadi */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-6">
          Data Pribadi
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500 text-sm">
              Nama Lengkap
            </p>

            <p className="font-medium">
              {profile.nama_lengkap}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Email
            </p>

            <p className="font-medium">
              {profile.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Nomor HP
            </p>

            <p className="font-medium">
              {profile.nomor_hp || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Role
            </p>

            <p className="font-medium">
              {profile.role}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              NIK
            </p>

            <p className="font-medium">
              {profile.nik || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Jenis Kelamin
            </p>

            <p className="font-medium">
              {profile.jenis_kelamin || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Tanggal Lahir
            </p>

            <p className="font-medium">
              {profile.tanggal_lahir
  ? new Date(profile.tanggal_lahir)
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
  : "-"
}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Level Akses
            </p>

            <p className="font-medium">
              {profile.level_akses || "-"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminProfilePage;