import { useEffect, useState } from "react";
import { updateProfile } from "@/services/patient/profile-service";

const HealthInfoForm = ({
  profile,
  setProfile,
}) => {
  const [formData, setFormData] =
    useState({
      nama_lengkap: "",
      nomor_hp: "",
      nik: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
    });

  const [isSaving, setIsSaving] =
    useState(false);

  useEffect(() => {
    if (!profile) return;

    setFormData({
      nama_lengkap:
        profile.nama_lengkap || "",

      nomor_hp:
        profile.nomor_hp || "",

      nik: profile.nik || "",

      tanggal_lahir:
        profile.tanggal_lahir?.substring(
          0,
          10
        ) || "",

      jenis_kelamin:
        profile.jenis_kelamin || "",
    });
  }, [profile]);

  const handleChange = (
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.nama_lengkap.trim()
    ) {
      alert(
        "Nama lengkap wajib diisi"
      );
      return;
    }

    if (
      formData.nik &&
      (formData.nik.length !== 16 ||
        isNaN(formData.nik))
    ) {
      alert(
        "NIK harus terdiri dari 16 digit angka"
      );
      return;
    }

    if (
      formData.nomor_hp &&
      !/^08\d{8,13}$/.test(
        formData.nomor_hp
      )
    ) {
      alert(
        "Format nomor HP tidak valid"
      );
      return;
    }

    try {
      setIsSaving(true);

      const response =
        await updateProfile({
          nama_lengkap:
            formData.nama_lengkap,
          nomor_hp:
            formData.nomor_hp,
          nik: formData.nik,
          tanggal_lahir:
            formData.tanggal_lahir,
          jenis_kelamin:
            formData.jenis_kelamin,
        });

      setProfile((prev) => ({
        ...prev,
        ...formData,
      }));

      alert(
        response.message ||
          "Profil berhasil diperbarui"
      );
    } catch (error) {
      console.error(
        "Update profile error:",
        error
      );

      alert(
        error?.response?.data
          ?.message ||
          "Gagal memperbarui profil"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-[28px] bg-prima-card p-8 border border-[#F1ECE4] shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-prima-text">
        Edit Informasi Profil
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        {/* Nama Lengkap */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Nama Lengkap
          </label>

          <input
            type="text"
            value={
              formData.nama_lengkap
            }
            onChange={(e) =>
              handleChange(
                "nama_lengkap",
                e.target.value
              )
            }
            placeholder="Masukkan nama lengkap"
            className="w-full rounded-xl border border-gray-200 p-3 focus:border-prima-green focus:outline-none"
          />
        </div>

        {/* Nomor HP */}
        <div>
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Nomor HP
          </label>

          <input
            type="text"
            value={
              formData.nomor_hp
            }
            onChange={(e) =>
              handleChange(
                "nomor_hp",
                e.target.value
              )
            }
            placeholder="08xxxxxxxxxx"
            className="w-full rounded-xl border border-gray-200 p-3 focus:border-prima-green focus:outline-none"
          />
        </div>

        {/* NIK */}
        <div>
          <label className="mb-2 block text-sm font-medium text-prima-text">
            NIK
          </label>

          <input
            type="text"
            maxLength={16}
            value={formData.nik}
            onChange={(e) =>
              handleChange(
                "nik",
                e.target.value
              )
            }
            placeholder="16 digit NIK"
            className="w-full rounded-xl border border-gray-200 p-3 focus:border-prima-green focus:outline-none"
          />
        </div>

        {/* Tanggal Lahir */}
        <div>
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Tanggal Lahir
          </label>

          <input
            type="date"
            value={
              formData.tanggal_lahir
            }
            onChange={(e) =>
              handleChange(
                "tanggal_lahir",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3 focus:border-prima-green focus:outline-none"
          />
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Jenis Kelamin
          </label>

          <select
            value={
              formData.jenis_kelamin
            }
            onChange={(e) =>
              handleChange(
                "jenis_kelamin",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3 focus:border-prima-green focus:outline-none"
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
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSaving}
        className="mt-8 w-full rounded-xl bg-prima-green py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving
          ? "Menyimpan..."
          : "Simpan Perubahan"}
      </button>
    </div>
  );
};

export default HealthInfoForm;