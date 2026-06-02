import { useState } from "react";
import {
  Eye,
  EyeOff,
} from "lucide-react";

const PasswordChangeForm = () => {
  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [showOld, setShowOld] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (
      !oldPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError(
        "Semua field wajib diisi."
      );

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setError(
        "Konfirmasi password tidak sesuai."
      );

      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Password minimal 8 karakter."
      );

      return;
    }

    try {
      setIsSaving(true);

      /*
      Nanti hubungkan ke API Ainur

      await changePassword({
        oldPassword,
        newPassword,
      });
      */

      setSuccess(
        "Password berhasil diperbarui."
      );

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);

      setError(
        "Gagal memperbarui password."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const renderPasswordField = ({
    label,
    value,
    onChange,
    show,
    setShow,
  }) => (
    <div>
      <label className="mb-2 block text-sm text-prima-secondary">
        {label}
      </label>

      <div className="relative">

        <input
          type={
            show
              ? "text"
              : "password"
          }
          value={value}
          onChange={onChange}
          className="
            w-full
            rounded-lg
            border
            border-[#E5E7EB]
            p-3
            pr-12
            focus:border-prima-green
            focus:outline-none
          "
        />

        <button
          type="button"
          onClick={() =>
            setShow(!show)
          }
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-prima-secondary
          "
        >
          {show ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>
    </div>
  );

  return (
    <div className="rounded-[28px] border border-[#F1ECE4] bg-prima-card p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold text-prima-text">
        Ubah Password
      </h2>

      <div className="space-y-4">

        {renderPasswordField({
          label: "Password Lama",
          value: oldPassword,
          onChange: (e) =>
            setOldPassword(
              e.target.value
            ),
          show: showOld,
          setShow: setShowOld,
        })}

        {renderPasswordField({
          label: "Password Baru",
          value: newPassword,
          onChange: (e) =>
            setNewPassword(
              e.target.value
            ),
          show: showNew,
          setShow: setShowNew,
        })}

        {renderPasswordField({
          label:
            "Konfirmasi Password Baru",
          value: confirmPassword,
          onChange: (e) =>
            setConfirmPassword(
              e.target.value
            ),
          show: showConfirm,
          setShow: setShowConfirm,
        })}

        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="
            w-full
            rounded-lg
            bg-prima-green
            py-3
            font-medium
            text-white
            transition
            hover:opacity-90
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isSaving
            ? "Menyimpan..."
            : "Simpan Password Baru"}
        </button>

      </div>

    </div>
  );
};

export default PasswordChangeForm;