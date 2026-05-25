module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Autentikasi diperlukan. Hubungi admin.' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: `Akses ditolak! Menu ini khusus untuk role: ${allowedRoles.join(', ')}. Akun Anda adalah: ${req.user.role}` 
      });
    }
    next();
  };
};