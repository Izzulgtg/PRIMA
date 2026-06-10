import {
  useEffect,
  useState,
} from "react";

import PatientProfileCard from "@/components/patient/profile/patient-profile-card";
import AccountSettingsCard from "@/components/patient/security/account-settings-card";

import {getProfile} from "@/services/patient/profile-service";

const PatientProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setProfile(data);
      } catch (error) {
          setError(
            "Gagal mengambil data profil"
          );
        } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-prima-secondary">
          Memuat profil...
        </p>
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

      <section className="bg-prima-green rounded-[32px] p-8 text-white">

        <p className="text-sm opacity-80">
          Patient Account
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Profil & Pengaturan Akun
        </h1>

        <p className="mt-4 max-w-2xl text-lg opacity-90 leading-relaxed">
          Kelola informasi pribadi,
          identitas pasien,
          serta preferensi akun Anda
          dalam sistem PRIMA Healthcare.
        </p>

      </section>

      <section className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">

          <div className="mb-4">

            <h2 className="text-2xl font-bold text-prima-text">
              Informasi Profil
            </h2>

            <p className="mt-2 text-prima-secondary">
              Data identitas dan informasi akun pasien.
            </p>

          </div>

          { profile ? (
              <PatientProfileCard
                profile={profile}
              />
            ) : (
              <div className="rounded-3xl bg-prima-card p-8 text-center">
                Data profil tidak ditemukan
              </div>
            )
          }

        </div>

        <div>

          <div className="mb-4">

            <h2 className="text-2xl font-bold text-prima-text">
              Pengaturan Akun
            </h2>

            <p className="mt-2 text-prima-secondary">
              Kelola notifikasi,
              bahasa,
              dan preferensi akun.
            </p>

          </div>

          <AccountSettingsCard />

        </div>

      </section>

    </div>
  );
};

export default PatientProfilePage;