import { useEffect, useState } from "react";
import { getProfile } from "@/services/patient/profile-service";
import PatientProfileCard from '@/components/patient/profile/patient-profile-card';
import HealthInfoForm from '@/components/patient/profile/health-info-form';

const PatientProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Gagal mengambil profil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Memuat profil...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-prima-background p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-prima-text">
          Profil Saya
        </h1>

        <p className="mt-2 text-prima-muted">
          Kelola informasi pribadi dan data kesehatan Anda.
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div>
          <PatientProfileCard profile={profile} />
        </div>

        <div className="lg:col-span-2">
          <HealthInfoForm
            profile={profile}
            setProfile={setProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientProfilePage;