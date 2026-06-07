import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, 
  Briefcase, ShieldCheck, LogOut, 
  Edit2, Image as ImageIcon, Star,
  Bell, Clock
} from 'lucide-react';

const ProfileDokter = () => {
  // State ini formatnya sudah disamakan dengan skema kolom di database
  const [profileData, setProfileData] = useState({
    // --- Data dari tabel `users` ---
    nama_lengkap: 'Dr. Dila Andini',
    email: 'dila.andini@prima.id',
    
    nomor_hp: '+62 81352602516',
    jenis_kelamin: 'Perempuan',
    tempat_lahir: 'Kediri',
    tanggal_lahir: '1998-05-30',
    spesialisasi: 'Penyakit Dalam',
    nomor_sip: '161/356/771/2026',
    institusi: 'Klinik PRIMA',
    jam_praktik: 'Senin-Jumat 08.00-12.00',
    
    // --- Data Agregasi (Hasil perhitungan query/opsional) ---
    stats: {
      pasien_bulan_ini: 145,
      durasi_konsultasi: '15 mnt',
      rating: 4.8
    }
  });

  // Contoh fungsi fetch API yang nanti bisa kamu jalankan:
  /*
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dokter/profil/2', {
          headers: { Authorization: `Bearer TOKEN_DISINI` }
        });
        setProfileData(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data profil", error);
      }
    };
    fetchProfile();
  }, []);
  */

  // Fungsi helper untuk merender tanggal lahir menjadi format yang lebih enak dibaca di UI
  const formatTanggal = (tanggal) => {
    const dateObj = new Date(tanggal);
    return dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#f9f8f4] p-6 font-sans flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        
        {/* HEADER SECTION */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-gray-400">
              <User size={40} />
            </div>
            <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100 text-gray-500 hover:text-green-700">
              <Edit2 size={14} />
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{profileData.nama_lengkap}</h1>
            <p className="text-gray-600 mb-2">Poli {profileData.spesialisasi}</p>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5 bg-[#eef5f0] text-[#2e6f40] px-3 py-1 rounded-full text-xs font-semibold">
                <ShieldCheck size={14} />
                <span>SIP: {profileData.nomor_sip}</span>
              </span>
              <button className="flex items-center space-x-1.5 text-[#2e6f40] text-sm font-medium hover:underline">
                <ImageIcon size={16} />
                <span>Edit Foto</span>
              </button>
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Pasien Bulan Ini</p>
            <p className="text-2xl font-semibold text-gray-800 border-b-2 border-green-200 inline-block px-2 pb-1">
              {profileData.stats.pasien_bulan_ini}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Durasi Konsultasi</p>
            <p className="text-2xl font-semibold text-gray-800 border-b-2 border-green-200 inline-block px-2 pb-1">
              {profileData.stats.durasi_konsultasi}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm text-center">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Rating Kepuasan</p>
            <p className="text-2xl font-semibold text-gray-800 border-b-2 border-green-200 inline-block px-2 pb-1 flex items-center justify-center space-x-1">
              <span>{profileData.stats.rating}</span>
              <Star size={18} className="text-amber-700 fill-amber-700" />
            </p>
          </div>
        </div>

        {/* DATA PRIBADI */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <div className="flex items-center space-x-2 text-[#2e6f40]">
              <User size={18} />
              <h2 className="font-semibold">Data Pribadi</h2>
            </div>
            <button className="text-[#2e6f40] text-sm font-semibold hover:underline">Edit</button>
          </div>
          <div className="p-5 grid grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-[11px] text-gray-500 mb-1">Nama Lengkap</p>
              <p className="text-sm font-medium text-gray-800">{profileData.nama_lengkap}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 mb-1">Tempat, Tanggal Lahir</p>
              <p className="text-sm font-medium text-gray-800">
                {profileData.tempat_lahir}, {formatTanggal(profileData.tanggal_lahir)}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 mb-1">Jenis Kelamin</p>
              <p className="text-sm font-medium text-gray-800">{profileData.jenis_kelamin}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 mb-1">Email</p>
              <p className="text-sm font-medium text-gray-800">{profileData.email}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 mb-1">Nomor HP</p>
              <p className="text-sm font-medium text-gray-800">{profileData.nomor_hp}</p>
            </div>
          </div>
        </div>

        {/* INFORMASI PRAKTIK */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <div className="flex items-center space-x-2 text-[#2e6f40]">
              <Briefcase size={18} />
              <h2 className="font-semibold">Informasi Praktik</h2>
            </div>
            <button className="border border-gray-200 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50">
              Edit Jadwal
            </button>
          </div>
          <div className="p-5 grid grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="text-[11px] text-gray-500 mb-1">Spesialisasi</p>
              <p className="text-sm font-medium text-gray-800">{profileData.spesialisasi}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 mb-1">Nomor SIP</p>
              <p className="text-sm font-medium text-gray-800">{profileData.nomor_sip}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 mb-1">Institusi</p>
              <p className="text-sm font-medium text-gray-800">{profileData.institusi}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 mb-1">Jam Praktik Default</p>
              <p className="text-sm font-medium text-gray-800">{profileData.jam_praktik}</p>
            </div>
          </div>
        </div>

        {/* KEAMANAN AKUN */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-5 border-b border-gray-100 flex items-center space-x-2 text-[#2e6f40]">
            <ShieldCheck size={18} />
            <h2 className="font-semibold">Keamanan Akun</h2>
          </div>
          <div className="p-5 flex items-center justify-between">
            <div className="flex space-x-6">
              <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                <Clock size={16} />
                <span>Ubah Password</span>
              </button>
              <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                <Bell size={16} />
                <span>Kelola Notifikasi</span>
              </button>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Clock size={12} />
              <span>Terakhir masuk: 29 Apr 2026, 08.12</span>
            </div>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <div className="flex justify-center pb-8 pt-4">
          <button className="flex items-center space-x-2 text-red-600 font-semibold hover:text-red-700 transition-colors">
            <LogOut size={18} />
            <span>Keluar</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileDokter;