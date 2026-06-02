import api from "../api";

/*
|--------------------------------------------------------------------------
| UBAH PASSWORD
|--------------------------------------------------------------------------
*/

export const changePassword = async ({
  oldPassword,
  newPassword,
}) => {
  const response = await api.put(
    "/patient/security/change-password",
    {
      oldPassword,
      newPassword,
    }
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| RIWAYAT LOGIN
|--------------------------------------------------------------------------
*/

export const getLoginHistory = async () => {
  const response = await api.get(
    "/patient/security/login-history"
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| LOGOUT SEMUA PERANGKAT
|--------------------------------------------------------------------------
*/

export const logoutAllDevices = async () => {
  const response = await api.post(
    "/patient/security/logout-all"
  );

  return response.data;
};