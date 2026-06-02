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

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data =
          await getProfile();

        setProfile(data);
      } catch (error) {
        console.error(error);
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

  return (
    <div className="space-y-6">

      <button
        onClick={() =>
          navigate(
            "/patient/profile"
          )
        }
        className="flex items-center gap-2 text-prima-teal"
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