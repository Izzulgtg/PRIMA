const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Ambil token dari header HTTP 'Authorization'
  const authHeader = req.header('Authorization');

  // 2. Cek jika token tidak dikirimkan oleh frontend
  if (!authHeader) {
    return res.status(401).json({ message: 'Akses ditolak! Token tidak ditemukan.' });
  }

  // Biasanya format token berupa: "Bearer <TOKEN_JWT_PANJANG>"
  // Kita split berdasarkan spasi dan ambil indeks ke-1 (tokennya saja)
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Format token salah! Autentikasi gagal.' });
  }

  try {
    // 3. Verifikasi token menggunakan kunci rahasia dari .env
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Simpan data user hasil verifikasi ke dalam objek 'req'
    // Jadi rute selanjutnya (controller) bisa tahu ID dan Role siapa yang sedang akses
    req.user = verified;

    // 5. Lolos verifikasi, lanjut ke proses berikutnya (controller)
    next();
  } catch (error) {
    // Jika token kedaluwarsa atau dimanipulasi
    return res.status(403).json({ message: 'Token tidak valid atau telah kedaluwarsa!' });
  }
};