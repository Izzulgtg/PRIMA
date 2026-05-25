USE prima_db;

SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- 1. USERS
-- ============================================================
INSERT INTO users (id, nama_lengkap, email, password, role, nomor_hp, is_active, last_login_at, created_at, updated_at) VALUES
  (1, 'Zaki Maulana', 'zaki@prima.id', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '081211110001', 1, '2025-01-15 08:00:00', '2025-01-01 00:00:00', '2025-01-15 08:00:00'),
  (2, 'Dr. Dila Andini', 'dila.andini@prima.id', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'dokter', '081311110001', 1, '2025-01-15 07:30:00', '2025-01-01 00:00:00', '2025-01-15 07:30:00'),
  (3, 'Izzul Muttaqin', 'izzul@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'pasien', '081411110001', 1, '2025-01-14 10:00:00', '2025-01-05 00:00:00', '2025-01-14 10:00:00'),
  (4, 'Mersela Putri', 'mersela@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'pasien', '081411110002', 1, '2025-01-13 14:00:00', '2025-01-06 00:00:00', '2025-01-13 14:00:00'),
  (5, 'Verdi Kurniawan', 'verdi@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'pasien', '081411110003', 1, '2025-01-12 09:30:00', '2025-01-07 00:00:00', '2025-01-12 09:30:00'),
  (6, 'Andi Pratama', 'andi.pratama@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'pasien', '081411110004', 1, '2025-01-11 16:00:00', '2025-01-08 00:00:00', '2025-01-11 16:00:00'),
  (7, 'Siti Rahayu', 'siti.rahayu@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'pasien', '081411110005', 1, '2025-01-10 11:00:00', '2025-01-09 00:00:00', '2025-01-10 11:00:00'),
  (8, 'Reza Firmansyah', 'reza.firmansyah@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'pasien', '081411110006', 1, '2025-01-09 13:00:00', '2025-01-09 00:00:00', '2025-01-09 13:00:00');

-- ============================================================
-- 2. PROFIL ADMIN
-- ============================================================
INSERT INTO profil_admin (user_id, nik, tanggal_lahir, jenis_kelamin, level_akses) VALUES
  (1, '3578010505900001', '1990-05-05', 'laki-laki', 'administrator');

-- ============================================================
-- 3. PROFIL DOKTER
-- ============================================================
INSERT INTO profil_dokter (user_id, nik, tanggal_lahir, jenis_kelamin, spesialisasi, nomor_sip, sip_expired_at, institusi, jam_praktik_default) VALUES
  (2, '3578020808920002', '1992-08-08', 'perempuan', 'Dokter Umum', 'SIP-001/2023/DU', '2026-12-31', 'Klinik PRIMA', '08:00-12:00, 16:00-20:00');

-- ============================================================
-- 4. PROFIL PASIEN
-- ============================================================
INSERT INTO profil_pasien (user_id, nik, tanggal_lahir, jenis_kelamin, golongan_darah, alamat, nomor_bpjs, kelas_bpjs, tinggi_badan, berat_badan, tekanan_darah, riwayat_alergi, riwayat_penyakit) VALUES
  (3, '3578030101980003', '1998-01-01', 'laki-laki', 'O+', 'Jl. Raya Darmo No. 10, Surabaya', '0001111110001', '1', 170.0, 68.0, '120/80', NULL, NULL),
  (4, '3578040202000004', '2000-02-02', 'perempuan', 'A+', 'Jl. Pemuda No. 25, Surabaya', '0001111110002', '2', 158.0, 52.0, '110/70', 'Penisilin', NULL),
  (5, '3578050303950005', '1995-03-03', 'laki-laki', 'B+', 'Jl. Gubeng No. 5, Surabaya', NULL, NULL, 175.0, 72.0, '118/78', NULL, 'Maag kronis'),
  (6, '3578060606900006', '1990-06-06', 'laki-laki', 'AB+', 'Jl. Ahmad Yani No. 200, Surabaya', '0001111110003', '1', 172.0, 70.5, '130/85', NULL, 'Hipertensi ringan'),
  (7, '3578070707880007', '1988-07-07', 'perempuan', 'A-', 'Jl. Kertajaya No. 15, Surabaya', '0001111110004', '2', 155.0, 52.0, '108/68', 'Sulfa', 'Anemia'),
  (8, '3578080808920008', '1992-08-08', 'laki-laki', 'O-', 'Jl. Mayjend Sungkono No. 45, Surabaya', NULL, NULL, 168.0, 75.0, '125/80', NULL, 'Diabetes Mellitus tipe 2');

-- ============================================================
-- 5. SUPPLIER
-- ============================================================
INSERT INTO supplier (id, nama, nama_pic, nomor_hp, email, alamat, npwp, is_active) VALUES
  (1, 'PT Kimia Farma Tbk', 'Bapak Agus', '02112345678', 'kimiafarma@supplier.id', 'Jl. Veteran No. 9, Jakarta',          '01.234.567.8-001.000', 1),
  (2, 'PT Kalbe Farma Tbk', 'Ibu Rina',   '02198765432', 'kalbe@supplier.id',       'Jl. M.T. Haryono Kav. 58, Jakarta',  '01.345.678.9-002.000', 1),
  (3, 'PT Dexa Medica',     'Bapak Doni', '02111223344', 'dexa@supplier.id',        'Jl. Jendral Sudirman No. 28, Jakarta','01.456.789.0-003.000', 1);

-- ============================================================
-- 6. OBAT
-- ============================================================
INSERT INTO obat (id, nama, nama_generik, kategori_id, supplier_id, satuan, stok, batas_minimum, tanggal_kadaluarsa, harga_per_unit) VALUES
  (1, 'Amoxicillin 500mg', 'Amoxicillin', 1, 1, 'kapsul', 200, 20, '2026-06-30', 2500.0),
  (2, 'Ciprofloxacin 500mg', 'Ciprofloxacin', 1, 1, 'tablet', 150, 15, '2026-09-30', 4500.0),
  (3, 'Paracetamol 500mg', 'Paracetamol', 2, 2, 'tablet', 500, 50, '2027-01-31', 500.0),
  (4, 'Ibuprofen 400mg', 'Ibuprofen', 2, 2, 'tablet', 300, 30, '2026-12-31', 1200.0),
  (5, 'Vitamin C 1000mg', 'Asam Askorbat', 3, 3, 'tablet', 400, 40, '2027-06-30', 1500.0),
  (6, 'Vitamin B Kompleks', 'Vitamin B', 3, 3, 'tablet', 350, 30, '2027-03-31', 2000.0),
  (7, 'Antasida DOEN', 'Antasida', 4, 1, 'tablet', 250, 25, '2026-08-31', 800.0),
  (8, 'Omeprazole 20mg', 'Omeprazole', 4, 2, 'kapsul', 180, 20, '2026-11-30', 3500.0),
  (9, 'Amlodipine 5mg', 'Amlodipine', 5, 3, 'tablet', 200, 20, '2027-02-28', 2800.0),
  (10, 'Captopril 25mg', 'Captopril', 5, 1, 'tablet', 160, 15, '2026-10-31', 1800.0),
  (11, 'Metformin 500mg', 'Metformin', 6, 2, 'tablet', 220, 25, '2027-04-30', 2200.0),
  (12, 'Glibenclamide 5mg', 'Glibenclamide', 6, 3, 'tablet', 130, 15, '2026-07-31', 1500.0),
  (13, 'Cetirizine 10mg', 'Cetirizine', 7, 1, 'tablet', 280, 30, '2027-05-31', 2000.0),
  (14, 'Loratadine 10mg', 'Loratadine', 7, 2, 'tablet', 240, 25, '2026-09-30', 2500.0),
  (15, 'OBH Combi Sirup', 'Dextromethorphan', 8, 3, 'botol', 80, 10, '2026-05-31', 25000.0);

-- ============================================================
-- 7. JADWAL SLOTS (dokter_id = 2 / Dr. Dila)
-- ============================================================
INSERT INTO jadwal_slots (id, dokter_id, tanggal, jam_mulai, jam_selesai, tipe_kunjungan, kuota, status) VALUES
  (1, 2, '2025-01-13', '08:00:00', '08:30:00', 'tatap_muka', 1, 'buka'),
  (2, 2, '2025-01-13', '08:30:00', '09:00:00', 'tatap_muka', 1, 'buka'),
  (3, 2, '2025-01-13', '09:00:00', '09:30:00', 'tatap_muka', 1, 'buka'),
  (4, 2, '2025-01-13', '16:00:00', '16:30:00', 'tatap_muka', 1, 'buka'),
  (5, 2, '2025-01-13', '16:30:00', '17:00:00', 'daring', 1, 'buka'),
  (6, 2, '2025-01-14', '08:00:00', '08:30:00', 'tatap_muka', 1, 'buka'),
  (7, 2, '2025-01-14', '08:30:00', '09:00:00', 'keduanya', 1, 'buka'),
  (8, 2, '2025-01-14', '09:00:00', '09:30:00', 'tatap_muka', 1, 'buka'),
  (9, 2, '2025-01-14', '16:00:00', '16:30:00', 'tatap_muka', 1, 'buka'),
  (10, 2, '2025-01-15', '08:00:00', '08:30:00', 'tatap_muka', 1, 'buka'),
  (11, 2, '2025-01-15', '08:30:00', '09:00:00', 'tatap_muka', 1, 'buka'),
  (12, 2, '2025-01-15', '09:00:00', '09:30:00', 'keduanya', 1, 'buka');

-- ============================================================
-- 8. PENDAFTARAN
-- ============================================================
INSERT INTO pendaftaran (id, pasien_id, dokter_id, slot_id, nomor_antrian, jenis_kunjungan, keluhan_utama, durasi_keluhan, metode_bayar, status) VALUES
  (1, 3, 2, 1, 'A001', 'tatap_muka', 'Demam tinggi dan sakit kepala', '2 hari', 'umum', 'selesai'),
  (2, 4, 2, 2, 'A002', 'tatap_muka', 'Batuk dan tenggorokan sakit', '4 hari', 'bpjs', 'selesai'),
  (3, 5, 2, 3, 'A003', 'tatap_muka', 'Nyeri ulu hati dan mual setelah makan', '1 minggu', 'umum', 'selesai'),
  (4, 6, 2, 4, 'A004', 'tatap_muka', 'Tekanan darah tinggi dan pusing', '2 minggu', 'bpjs', 'selesai'),
  (5, 7, 2, 5, 'A005', 'daring', 'Konsultasi pusing dan badan lemas', '3 hari', 'bpjs', 'selesai'),
  (6, 8, 2, 6, 'A001', 'tatap_muka', 'Kontrol gula darah rutin', '1 bulan', 'umum', 'selesai'),
  (7, 3, 2, 7, 'A001', 'tatap_muka', 'Kontrol setelah demam, sudah membaik', '1 minggu', 'umum', 'selesai'),
  (8, 5, 2, 8, 'A002', 'tatap_muka', 'Maag kambuh, nyeri perut dan kembung', '2 hari', 'umum', 'selesai'),
  (9, 4, 2, 10, 'A001', 'tatap_muka', 'Flu dan hidung tersumbat', '3 hari', 'bpjs', 'selesai'),
  (10, 6, 2, 12, 'A001', 'tatap_muka', 'Kontrol tekanan darah rutin', '2 minggu', 'bpjs', 'menunggu');

-- ============================================================
-- 9. REKAM MEDIS
-- ============================================================
INSERT INTO rekam_medis (id, pendaftaran_id, pasien_id, dokter_id, keluhan, durasi_keluhan, skala_nyeri, tekanan_darah, nadi, suhu, berat_badan, tinggi_badan, saturasi_o2, diagnosis, kode_icd10, tindakan, catatan_pasien, kontrol_berikutnya, created_at) VALUES
  (1, 1, 3, 2, 'Demam tinggi dan sakit kepala berat', '2 hari', 6, '120/80', 90, 38.9, 68.0, 170.0, 97, 'Febris', 'R50.9', 'Pemeriksaan fisik, pengukuran suhu', 'Istirahat, minum air putih yang banyak', '2025-01-20', '2025-01-13 08:25:00'),
  (2, 2, 4, 2, 'Batuk kering dan tenggorokan terasa sakit', '4 hari', 3, '110/70', 80, 37.6, 52.0, 158.0, 98, 'Faringitis Akut', 'J02.9', 'Pemeriksaan tenggorokan', 'Minum obat teratur, hindari minuman dingin', '2025-01-20', '2025-01-13 08:55:00'),
  (3, 3, 5, 2, 'Nyeri dan perih di ulu hati setelah makan', '1 minggu', 7, '118/78', 82, 36.8, 72.0, 175.0, 99, 'Gastritis', 'K29.7', 'Pemeriksaan abdomen', 'Makan teratur, hindari pedas, asam, dan kopi', '2025-01-27', '2025-01-13 09:25:00'),
  (4, 4, 6, 2, 'Pusing dan tekanan darah tinggi', '2 minggu', 5, '158/100', 88, 36.5, 70.5, 172.0, 98, 'Hipertensi Primer', 'I10', 'Pengukuran TD 3 kali, edukasi hipertensi', 'Kurangi garam, kelola stres, olahraga rutin', '2025-01-27', '2025-01-13 16:25:00'),
  (5, 5, 7, 2, 'Pusing berputar dan badan terasa lemas', '3 hari', 4, '108/68', 76, 36.6, 52.0, 155.0, 97, 'Vertigo + Anemia', 'H81.3', 'Pemeriksaan fisik, cek konjungtiva', 'Makanan bergizi, istirahat cukup, hindari berdiri mendadak', '2025-01-27', '2025-01-13 16:55:00'),
  (6, 6, 8, 2, 'Kontrol rutin gula darah, hasil GDP 195', '1 bulan', 2, '125/80', 84, 36.9, 75.0, 168.0, 99, 'Diabetes Mellitus Tipe 2', 'E11', 'Konsultasi dan edukasi DM', 'Patuhi diit DM, olahraga 30 menit sehari', '2025-02-06', '2025-01-14 08:25:00'),
  (7, 7, 3, 2, 'Demam sudah turun, kondisi membaik', '1 minggu', 2, '118/78', 80, 36.9, 68.0, 170.0, 99, 'Febris dalam penyembuhan', 'R50.9', 'Pemeriksaan fisik', 'Lanjutkan vitamin, boleh beraktivitas ringan', '2025-01-28', '2025-01-14 08:55:00'),
  (8, 8, 5, 2, 'Maag kambuh, perut nyeri dan terasa kembung', '2 hari', 6, '116/76', 78, 36.7, 72.0, 175.0, 99, 'Gastritis Akut', 'K29.7', 'Pemeriksaan abdomen', 'Makan porsi kecil sering, hindari telat makan', '2025-01-28', '2025-01-14 09:25:00'),
  (9, 9, 4, 2, 'Flu, hidung tersumbat, dan bersin-bersin', '3 hari', 3, '110/70', 82, 37.2, 52.0, 158.0, 98, 'Rhinitis Akut', 'J00', 'Pemeriksaan nasal dan tenggorokan', 'Istirahat cukup, minum air hangat', '2025-01-22', '2025-01-15 08:25:00');

-- ============================================================ 
-- 10. RESEP
-- ============================================================
INSERT INTO resep (id, rekam_medis_id, pasien_id, dokter_id, catatan, status) VALUES
  (1, 1, 3, 2, 'Minum paracetamol jika demam di atas 38.5 derajat', 'selesai'),
  (2, 2, 4, 2, 'Habiskan obat meskipun sudah merasa sembuh',         'selesai'),
  (3, 3, 5, 2, 'Minum antasida 30 menit sebelum makan',              'selesai'),
  (4, 4, 6, 2, 'Minum obat hipertensi setiap pagi, jangan dilewati', 'selesai'),
  (5, 5, 7, 2, 'Konsumsi suplemen dan vitamin secara teratur',        'selesai'),
  (6, 6, 8, 2, 'Minum metformin bersamaan dengan makan',             'selesai'),
  (7, 7, 3, 2, 'Lanjutkan vitamin C untuk daya tahan tubuh',         'selesai'),
  (8, 8, 5, 2, 'Minum omeprazole malam sebelum tidur',               'selesai'),
  (9, 9, 4, 2, 'Minum cetirizine malam hari agar tidak mengantuk saat aktivitas', 'selesai');

-- 11. RESEP DETAIL
-- ============================================================
INSERT INTO resep_detail (resep_id, obat_id, dosis, aturan_pakai, jumlah, keterangan) VALUES
  (1, 3,  '500mg',   '3x sehari sesudah makan',              15, 'Minum jika demam'),
  (1, 5,  '1000mg',  '1x sehari pagi',                       10, NULL),
  (2, 1,  '500mg',   '3x sehari sesudah makan',              15, 'Wajib dihabiskan'),
  (2, 3,  '500mg',   '3x sehari jika perlu',                 10, 'Jika masih demam'),
  (3, 7,  '1 tablet','3x sehari 30 menit sebelum makan',     30, NULL),
  (3, 8,  '20mg',    '1x sehari malam sebelum tidur',        10, NULL),
  (4, 9,  '5mg',     '1x sehari pagi',                       30, 'Jangan dihentikan tanpa konsultasi dokter'),
  (5, 5,  '1000mg',  '1x sehari',                            30, NULL),
  (5, 6,  '1 tablet','1x sehari pagi',                       30, 'Untuk anemia'),
  (6, 11, '500mg',   '2x sehari bersama makan',              60, NULL),
  (6, 6,  '1 tablet','1x sehari pagi',                       30, NULL),
  (7, 5,  '1000mg',  '1x sehari pagi',                       10, NULL),
  (8, 7,  '1 tablet','3x sehari 30 menit sebelum makan',     15, NULL),
  (8, 8,  '20mg',    '1x sehari malam sebelum tidur',        10, NULL),
  (9, 13, '10mg',    '1x sehari malam',                      10, 'Bisa menyebabkan kantuk');

-- ============================================================
-- 12. RIWAYAT STOK
-- ============================================================
INSERT INTO riwayat_stok (obat_id, user_id, aksi, jumlah, stok_sebelum, stok_sesudah, keterangan) VALUES
  (1, 1, 'restok', 200, 0, 200, 'Pengadaan awal'),
  (2, 1, 'restok', 150, 0, 150, 'Pengadaan awal'),
  (3, 1, 'restok', 500, 0, 500, 'Pengadaan awal'),
  (4, 1, 'restok', 300, 0, 300, 'Pengadaan awal'),
  (5, 1, 'restok', 400, 0, 400, 'Pengadaan awal'),
  (6, 1, 'restok', 350, 0, 350, 'Pengadaan awal'),
  (7, 1, 'restok', 250, 0, 250, 'Pengadaan awal'),
  (8, 1, 'restok', 180, 0, 180, 'Pengadaan awal'),
  (9, 1, 'restok', 200, 0, 200, 'Pengadaan awal'),
  (11, 1, 'restok', 220, 0, 220, 'Pengadaan awal'),
  (13, 1, 'restok', 280, 0, 280, 'Pengadaan awal'),
  (1, 2, 'digunakan', 15, 200, 185, 'Resep #2 - Mersela Putri'),
  (3, 2, 'digunakan', 25, 500, 475, 'Resep #1 dan #2'),
  (7, 2, 'digunakan', 45, 250, 205, 'Resep #3 dan #8'),
  (8, 2, 'digunakan', 20, 180, 160, 'Resep #3 dan #8'),
  (9, 2, 'digunakan', 30, 200, 170, 'Resep #4'),
  (11, 2, 'digunakan', 60, 220, 160, 'Resep #6'),
  (13, 2, 'digunakan', 10, 280, 270, 'Resep #9');

-- ============================================================
-- 13. KONSULTASI DARING
-- ============================================================
INSERT INTO konsultasi (id, pendaftaran_id, pasien_id, dokter_id, status, mulai_at, selesai_at, durasi_menit, rating, ulasan) VALUES
  (1, 5, 7, 2, 'selesai', '2025-01-13 16:30:00', '2025-01-13 16:48:00', 18, 5, 'Dr. Dila sangat sabar dan penjelasannya mudah dimengerti, terima kasih!');

-- 14. PESAN KONSULTASI
-- ============================================================
INSERT INTO pesan_konsultasi (konsultasi_id, pengirim_id, tipe, isi, is_read) VALUES
  (1, 7, 'teks',  'Selamat sore Dok, saya Siti. Sudah 3 hari ini saya sering pusing dan badan terasa lemas sekali', 1),
  (1, 2, 'teks',  'Selamat sore Ibu Siti. Pusingnya seperti berputar atau hanya berat di kepala? Apakah disertai mual?', 1),
  (1, 7, 'teks',  'Terasa seperti berputar Dok, dan kadang mual. Kalau berdiri tiba-tiba langsung gelap sebentar', 1),
  (1, 2, 'teks',  'Baik Bu, dari gejala tersebut kemungkinan vertigo dan anemia. Saya akan kirimkan resep suplemen dan vitamin ya Bu.', 1),
  (1, 2, 'resep', '[Resep digital telah dikirimkan]', 1),
  (1, 7, 'teks',  'Baik Dok, terima kasih banyak!', 1);

-- ============================================================
-- 15. NOTIFIKASI
-- ============================================================
INSERT INTO notifikasi (user_id, judul, isi, tipe, is_read) VALUES
  (3, 'Pengingat Jadwal Kontrol',  'Anda memiliki jadwal kontrol dengan Dr. Dila pada 20 Jan 2025 pukul 08:00', 'reminder',   1),
  (4, 'Resep Siap Diambil',        'Resep Anda sudah diproses dan obat siap diambil di apotek klinik',           'resep',       1),
  (5, 'Pengingat Jadwal Kontrol',  'Anda memiliki jadwal kontrol dengan Dr. Dila pada 27 Jan 2025 pukul 08:00', 'reminder',   0),
  (6, 'Pengingat Jadwal Kontrol',  'Anda memiliki jadwal kontrol dengan Dr. Dila pada 15 Jan 2025 pukul 09:00', 'reminder',   0),
  (7, 'Konsultasi Selesai',        'Konsultasi daring dengan Dr. Dila telah selesai. Resep digital sudah tersedia','konsultasi', 1),
  (8, 'Pengingat Jadwal Kontrol',  'Kontrol gula darah rutin Anda dengan Dr. Dila pada 6 Feb 2025 pukul 08:00', 'reminder',   0),
  (2, 'Jadwal Pasien Hari Ini',    'Dr. Dila memiliki 3 pasien terdaftar pada 13 Jan 2025 sesi pagi',            'sistem',      1),
  (1, 'Stok Obat Perlu Perhatian', 'Stok OBH Combi Sirup tersisa 80 unit, mendekati batas minimum 10 unit',     'stok',        0),
  (1, 'Backup Otomatis Berhasil',  'Backup database harian berhasil pada 15 Jan 2025 pukul 06:00',              'sistem',      1);

-- ============================================================
-- 16. IZIN DATA
-- ============================================================
INSERT INTO izin_data (user_id, izin_peningkatan_layanan, izin_notifikasi, izin_berbagi_dokter_rujukan) VALUES
  (3, 1, 1, 1),
  (4, 1, 1, 0),
  (5, 1, 1, 1),
  (6, 0, 1, 0),
  (7, 1, 1, 1),
  (8, 1, 0, 0);

-- ============================================================
-- 17. AKSES LOG
-- ============================================================
INSERT INTO akses_log (actor_id, target_id, modul, aksi, deskripsi, ip_address, device) VALUES
  (1, NULL, 'auth',        'login',  'Zaki (Admin) login ke sistem',                     '192.168.1.1',  'Chrome/Windows'),
  (2, NULL, 'auth',        'login',  'Dr. Dila Andini login ke sistem',                  '192.168.1.10', 'Chrome/MacOS'),
  (2, 1,    'rekam_medis', 'create', 'Membuat rekam medis untuk Izzul Muttaqin',          '192.168.1.10', 'Chrome/MacOS'),
  (2, 2,    'rekam_medis', 'create', 'Membuat rekam medis untuk Mersela Putri',           '192.168.1.10', 'Chrome/MacOS'),
  (2, 3,    'rekam_medis', 'create', 'Membuat rekam medis untuk Verdi Kurniawan',         '192.168.1.10', 'Chrome/MacOS'),
  (1, 1,    'obat',        'create', 'Menambah stok Amoxicillin 200 unit',                '192.168.1.1',  'Chrome/Windows'),
  (3, NULL, 'auth',        'login',  'Pasien Izzul Muttaqin login ke aplikasi',           '10.0.0.3',     'Chrome/Android'),
  (2, NULL, 'auth',        'logout', 'Dr. Dila Andini logout dari sistem',                '192.168.1.10', 'Chrome/MacOS');

-- ============================================================
-- 18. JADWAL LIBUR DOKTER
-- ============================================================
INSERT INTO jadwal_libur (dokter_id, tanggal_mulai, tanggal_selesai, keterangan) VALUES
  (2, '2025-01-25', '2025-01-26', 'Libur akhir pekan'),
  (2, '2025-02-14', '2025-02-14', 'Keperluan pribadi'),
  (2, '2025-03-01', '2025-03-02', 'Seminar dan pelatihan dokter umum');

-- ============================================================
-- 19. BACKUP LOG
-- ============================================================
INSERT INTO backup_log (admin_id, tipe, ukuran_mb, status, keterangan) VALUES
  (1, 'otomatis', 12.50, 'berhasil', 'Backup rutin harian 15 Jan 2025'),
  (1, 'otomatis', 12.48, 'berhasil', 'Backup rutin harian 14 Jan 2025'),
  (1, 'manual',   12.45, 'berhasil', 'Backup manual sebelum update sistem'),
  (1, 'otomatis', 12.42, 'gagal',    'Gagal karena kapasitas disk hampir penuh');

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- SELESAI
-- Users      : 8  (1 admin: Zaki, 1 dokter: Dr. Dila, 6 pasien)
-- Pasien     : Izzul, Mersela, Verdi, Andi, Siti, Reza
-- Obat       : 15 item dari 3 supplier
-- Jadwal     : 12 slot (pagi & sore)
-- Pendaftaran: 10 entri
-- Rekam Medis: 9 entri dengan kode ICD-10
-- Resep      : 9 resep + 15 detail obat
-- Konsultasi : 1 sesi daring (Siti + Dr. Dila) + 6 pesan
-- Notifikasi : 9 entri
-- ============================================================