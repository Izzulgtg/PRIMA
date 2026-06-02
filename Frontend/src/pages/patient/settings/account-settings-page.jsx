import AccountSettingsCard from "@/components/patient/security/account-settings-card";

const AccountSettingsPage = () => {
  return (
    <div className="space-y-6">

      <section className="bg-prima-green rounded-[32px] p-8 text-white">

        <p className="text-sm opacity-80">
          Preferences
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Pengaturan Akun
        </h1>

        <p className="mt-4 max-w-2xl text-lg opacity-90">
          Kelola preferensi akun, notifikasi,
          bahasa, dan pengaturan umum lainnya.
        </p>

      </section>

      <AccountSettingsCard />

    </div>
  );
};

export default AccountSettingsPage;