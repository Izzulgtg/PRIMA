import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getProfile,
} from "@/services/patient/profile-service";

import HealthInfoForm from "@/components/patient/profile/health-info-form";

const EditProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data =
          await getProfile();

        setProfile(data);
      } catch (error) {
        setError("Gagal memuat data profil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Memuat data...
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="py-20 text-center">
        Profil tidak ditemukan
      </div>
    );
  }
  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <button
        onClick={() =>
          navigate("/patient/profile")
        }
        className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-prima-background hover:bg-prima-sand transition-all duration-200 text-prima-text"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <div>

        <h1 className="text-3xl font-bold text-prima-text">
          Edit Profil
        </h1>

        <p className="mt-2 text-prima-secondary">
          Perbarui informasi kesehatan
          dan identitas pasien.
        </p>

      </div>

      <HealthInfoForm
        profile={profile}
        setProfile={setProfile}
      />

    </div>
  );
};

export default EditProfilePage;