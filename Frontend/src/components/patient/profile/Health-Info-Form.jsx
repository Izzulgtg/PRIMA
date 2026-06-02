import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateProfile } from "@/services/patient/profile-service";

const HealthInfoForm = ({ profile, setProfile }) => {
  const [formData, setFormData] = useState({
    nik: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;

    setFormData({
      nik: profile.nik || "",
      tanggal_lahir: profile.tanggal_lahir || "",
      jenis_kelamin: profile.jenis_kelamin || "",
    });
  }, [profile]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      formData.nik &&
      (formData.nik.length !== 16 ||
        isNaN(formData.nik))
    ) {
      alert("NIK harus terdiri dari 16 digit angka");
      return;
    }

    if (!formData.jenis_kelamin) {
      alert("Pilih jenis kelamin terlebih dahulu");
      return;
    }

    try {
      setIsSaving(true);

      const response = await updateProfile({
        nama_lengkap: profile.nama_lengkap,
        nomor_hp: profile.nomor_hp,
        nik: formData.nik,
        tanggal_lahir: formData.tanggal_lahir,
        jenis_kelamin: formData.jenis_kelamin,
      });

      setProfile((prev) => ({
        ...prev,
        ...formData,
      }));

      console.log(
        "Profil berhasil diperbarui:",
        response
      );

      alert("Profil berhasil diperbarui");
    } catch (error) {
      console.error(
        "Gagal memperbarui profil:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Gagal memperbarui profil"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-xl bg-prima-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-prima-text">
        Informasi Kesehatan
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {/* NIK */}
        <div>
          <label className="mb-2 block text-sm text-prima-muted">
            NIK
          </label>

          <input
            type="text"
            value={formData.nik}
            onChange={(e) =>
              handleChange("nik", e.target.value)
            }
            placeholder="Masukkan NIK"
            className="w-full rounded-lg border border-gray-200 p-3 focus:border-prima-green focus:outline-none"
          />
        </div>

        {/* Tanggal Lahir */}
        <div>
          <label className="mb-2 block text-sm text-prima-muted">
            Tanggal Lahir
          </label>

          <input
            type="date"
            value={formData.tanggal_lahir}
            onChange={(e) =>
              handleChange(
                "tanggal_lahir",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-gray-200 p-3 focus:border-prima-green focus:outline-none"
          />
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="mb-2 block text-sm text-prima-muted">
            Jenis Kelamin
          </label>

          <select
            value={formData.jenis_kelamin}
            onChange={(e) =>
              handleChange(
                "jenis_kelamin",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-gray-200 p-3 focus:border-prima-green focus:outline-none"
          >
            <option value="">
              Pilih Jenis Kelamin
            </option>

            <option value="Laki-laki">
              Laki-laki
            </option>

            <option value="Perempuan">
              Perempuan
            </option>
          </select>
        </div>

        {/* Placeholder Backend Berikutnya */}
        <div>
          <label className="mb-2 block text-sm text-prima-muted">
            Golongan Darah
          </label>

          <select
            className="w-full rounded-lg border border-gray-200 p-3 focus:border-prima-green focus:outline-none"
          >
            <option>
              Belum dipilih
            </option>
            <option value="A">
              A
            </option>
            <option value="B">
              B
            </option>
            <option value="AB">
              AB
            </option>
            <option value="O">
              O
            </option>
          </select>
        </div>

        {/* Placeholder Backend Berikutnya */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-prima-muted">
            Alergi
          </label>

          <textarea
            rows="3"
            disabled
            placeholder="Tidak Ada Alergi"
            className="w-full rounded-lg border border-gray-200 bg-gray-100 p-3 text-gray-400"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSaving}
        className="mt-6 rounded-lg bg-prima-green px-6 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving
          ? "Menyimpan..."
          : "Simpan Perubahan"}
      </button>
    </div>
  );
};

export default HealthInfoForm;