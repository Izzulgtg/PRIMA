import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "@/services/patient/profile-service";

const HealthInfoForm = ({
  profile,
  setProfile,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] =
    useState({
      nama_lengkap: "",
      nomor_hp: "",

      nik: "",
      tanggal_lahir: "",
      jenis_kelamin: "",

      golongan_darah: "",
      alamat: "",

      nomor_bpjs: "",
      faskes_bpjs: "",
      kelas_bpjs: "",

      tinggi_badan: "",
      berat_badan: "",
      tekanan_darah: "",

      riwayat_alergi: "",
      riwayat_penyakit: "",
      obat_rutin: "",
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

      nik:
        profile.nik || "",

      tanggal_lahir:
        profile.tanggal_lahir?.substring(
          0,
          10
        ) || "",

      jenis_kelamin:
        profile.jenis_kelamin || "",

      golongan_darah:
        profile.golongan_darah || "",

      alamat:
        profile.alamat || "",

      nomor_bpjs:
        profile.nomor_bpjs || "",

      faskes_bpjs:
        profile.faskes_bpjs || "",

      kelas_bpjs:
        profile.kelas_bpjs || "",

      tinggi_badan:
        profile.tinggi_badan || "",

      berat_badan:
        profile.berat_badan || "",

      tekanan_darah:
        profile.tekanan_darah || "",

      riwayat_alergi:
        profile.riwayat_alergi || "",

      riwayat_penyakit:
        profile.riwayat_penyakit || "",

      obat_rutin:
        profile.obat_rutin || "",
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
    setError("");
    setSuccess("");
    if (!formData.nama_lengkap.trim()) {
      setError(
        "Nama lengkap wajib diisi"
      );
      return;
    }

    if (
      formData.nik &&
      (formData.nik.length !== 16 ||
        isNaN(formData.nik))
    ) {
      setError(
        "NIK harus terdiri dari 16 digit angka"
      );
      return;
    }

    if (
      formData.nomor_bpjs &&
      formData.nomor_bpjs.length < 10
    ) {
      setError(
        "Nomor BPJS tidak valid"
      );
      return;
    }

    if (
      formData.tinggi_badan &&
      Number(formData.tinggi_badan) <= 0
    ) {
      setError(
        "Tinggi badan tidak valid"
      );
      return;
    }

    if (
      formData.berat_badan &&
      Number(formData.berat_badan) <= 0
    ) {
      setError(
        "Berat badan tidak valid"
      );
      return;
    }

    if (
      formData.nomor_hp &&
      !/^08\d{8,13}$/.test(
        formData.nomor_hp
      )
    ) {
      setError(
        "Format nomor HP tidak valid"
      );
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        ...formData,

        kelas_bpjs:
          formData.kelas_bpjs || null,

        nomor_bpjs:
          formData.nomor_bpjs || null,

        faskes_bpjs:
          formData.faskes_bpjs || null,
      };

      const response =
        await updateProfile(payload);

      setProfile((prev) => ({
        ...prev,
        ...payload,
      }));

      setSuccess(
        response.message ||
          "Profil berhasil diperbarui"
      );

      setTimeout(() => {
        navigate("/patient/profile");
        }, 2000);
      } catch (error) {
      console.error(
        "Update profile error:",
        error
      );

      setError(
        error?.response?.data
          ?.message ||
          "Gagal memperbarui profil"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-[28px] border border-[#F1ECE4] bg-prima-card p-8 shadow-sm">
      {
        error && (
          <div className="mb-4 rounded-xl bg-red-50 p-4 text-red-500">
            {error}
          </div>
        )
      }

      {
        success && (
          <div className="mb-4 rounded-xl bg-green-50 p-4 text-green-600">
            {success}
          </div>
        )
      }
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
            className="w-full rounded-xl border border-gray-200 p-3"
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
            className="w-full rounded-xl border border-gray-200 p-3"
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
            className="w-full rounded-xl border border-gray-200 p-3"
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
            className="w-full rounded-xl border border-gray-200 p-3"
          >
            <option value="">
              Pilih Jenis Kelamin
            </option>

            <option value="laki-laki">
              Laki-laki
            </option>

            <option value="perempuan">
              Perempuan
            </option>
          </select>
        </div>

        {/* Golongan Darah */}
        <div>
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Golongan Darah
          </label>

          <select
            value={
              formData.golongan_darah
            }
            onChange={(e) =>
              handleChange(
                "golongan_darah",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3"
          >
            <option value="">
              Pilih
            </option>

            <option value="A">
              A
            </option>

            <option value="A-">
              A-
            </option>

            <option value="B">
              B
            </option>

            <option value="B-">
              B-
            </option>

            <option value="AB">
              AB
            </option>
            
            <option value="AB-">
              AB-
            </option>

            <option value="O">
              O
            </option>

            <option value="O-">
              O-
            </option>
          </select>
        </div>

        {/* Tinggi Badan */}
        <div>
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Tinggi Badan (cm)
          </label>

          <input
            type="number"
            value={
              formData.tinggi_badan
            }
            onChange={(e) =>
              handleChange(
                "tinggi_badan",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3"
          />
        </div>

        {/* Berat Badan */}
        <div>
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Berat Badan (kg)
          </label>

          <input
            type="number"
            value={
              formData.berat_badan
            }
            onChange={(e) =>
              handleChange(
                "berat_badan",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3"
          />
        </div>

        {/* Tekanan Darah */}
        <div>
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Tekanan Darah
          </label>

          <input
            type="text"
            placeholder="120/80"
            value={
              formData.tekanan_darah
            }
            onChange={(e) =>
              handleChange(
                "tekanan_darah",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3"
          />
        </div>

        {/* Alamat */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Alamat
          </label>

          <textarea
            rows={3}
            value={formData.alamat}
            onChange={(e) =>
              handleChange(
                "alamat",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3"
          />
        </div>

        <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-semibold text-prima-text">
            Informasi BPJS
          </h3>
        </div>

        {/* Nomor BPJS */}
        <div>
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Nomor BPJS
          </label>

          <input
            type="text"
            value={formData.nomor_bpjs}
            onChange={(e) =>
              handleChange(
                "nomor_bpjs",
                e.target.value
              )
            }
            placeholder="Masukkan nomor BPJS"
            className="w-full rounded-xl border border-gray-200 p-3 focus:border-prima-green focus:outline-none"
          />
        </div>

        {/* Faskes BPJS */}
        <div>
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Faskes BPJS
          </label>

          <input
            type="text"
            value={formData.faskes_bpjs}
            onChange={(e) =>
              handleChange(
                "faskes_bpjs",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3"
          />
        </div>

        {/* Kelas BPJS */}
        <div>
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Kelas BPJS
          </label>

          <select
            value={formData.kelas_bpjs}
            onChange={(e) =>
              handleChange(
                "kelas_bpjs",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3"
          >
            <option value="">
              Pilih Kelas
            </option>

            <option value="1">
              Kelas 1
            </option>

            <option value="2">
              Kelas 2
            </option>

            <option value="3">
              Kelas 3
            </option>
          </select>
        </div>

        <div className="md:col-span-2 mt-4">
          <h3 className="text-lg font-semibold text-prima-text">
            Riwayat Kesehatan
          </h3>
        </div>
        {/* Riwayat Penyakit */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Riwayat Penyakit
          </label>

          <textarea
            rows={3}
            value={
              formData.riwayat_penyakit
            }
            onChange={(e) =>
              handleChange(
                "riwayat_penyakit",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3"
          />
        </div>

        {/* Riwayat Alergi */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Riwayat Alergi
          </label>

          <textarea
            rows={3}
            value={
              formData.riwayat_alergi
            }
            onChange={(e) =>
              handleChange(
                "riwayat_alergi",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3"
          />
        </div>

        {/* Obat Rutin */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-prima-text">
            Obat Rutin
          </label>

          <textarea
            rows={3}
            value={
              formData.obat_rutin
            }
            onChange={(e) =>
              handleChange(
                "obat_rutin",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-200 p-3"
          />
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