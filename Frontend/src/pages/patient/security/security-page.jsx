import PasswordChangeForm from '@/components/patient/security/password-change-form';
import PrivacySettingsCard from '@/components/patient/security/privacy-settings-card';

const SecurityPage = () => {
  return (
    <div className="min-h-screen bg-prima-background p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-prima-text">
          Keamanan & Privasi
        </h1>

        <p className="mt-2 text-prima-muted">
          Kelola keamanan akun dan privasi data medis Anda.
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PasswordChangeForm />
        <PrivacySettingsCard />
      </div>
    </div>
  );
};

export default SecurityPage;