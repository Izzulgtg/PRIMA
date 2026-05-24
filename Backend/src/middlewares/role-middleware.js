module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Pastikan data user dari token JWT sudah ada
    if (!req.user) {
      return res.status(401).json({ message: 'Autentikasi diperlukan. Hubungi admin.' });
    }

    // 2. Cek apakah role user saat ini ada di dalam daftar role yang diizinkan
    // allowedRoles berbentuk array, misalnya: ['admin', 'dokter']
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: `Akses ditolak! Menu ini khusus untuk role: ${allowedRoles.join(', ')}. Akun Anda adalah: ${req.user.role}` 
      });
    }

    // 3. Jika cocok, lolos! Lanjut ke controller utama
    next();
  };
};