import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileDokter = () => {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data dari Backend saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ambil token yang tersimpan pas login
        const token = localStorage.getItem("token"); 
        
        // 📑 PERBAIKAN 1: Ambil data objek user dan parse dari localStorage agar user.id bisa dibaca
        const storageUser = localStorage.getItem("user");
        if (!storageUser) {
          setError("Sesi login tidak ditemukan. Silakan login kembali.");
          setLoading(false);
          return;
        }
        const user = JSON.parse(storageUser);

        // 2. Kirimkan token ke endpoint profil dokter
        // 📑 PERBAIKAN 2: Memastikan url menembak id dokter dengan benar
        const res = await axios.get(`http://localhost:5000/api/dokter/profil/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("Data masuk dari backend:", res.data);

        // 📑 PERBAIKAN 3: Ganti 'response.data' menjadi 'res.data.data' (sesuai variabel res & bungkus data dari backend)
        if (res.data && res.data.data) {
          setProfil(res.data.data);
        } else {
          setError("Format data profil salah atau tidak ditemukan.");
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setError("Gagal memuat data profil dokter.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Memuat profil...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!profil) return <div className="p-6 text-center">Data profil tidak ditemukan.</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        
        {/* Header Section */}
        <div className="flex items-center p-6 border-b">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-gray-600 text-3xl font-bold">
            {profil.nama_lengkap ? profil.nama_lengkap.charAt(0) : 'D'}
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold">{profil.nama_lengkap}</h2>
            <p className="text-gray-600">{profil.spesialisasi}</p>
            <p className="text-sm text-green-600 font-medium mt-1">SIP: {profil.nomor_sip}</p>
          </div>
          <button className="ml-auto text-blue-600 font-medium hover:underline">Edit Profil</button>
        </div>

        {/* Data Pribadi Section */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Data Pribadi</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nama Lengkap</p>
              <p className="font-medium">{profil.nama_lengkap}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tanggal Lahir</p>
              <p className="font-medium">
                {profil.tanggal_lahir ? new Date(profil.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jenis Kelamin</p>
              <p className="font-medium capitalize">{profil.jenis_kelamin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{profil.email || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">NIK</p>
              <p className="font-medium">{profil.nik}</p>
            </div>
          </div>
        </div>

        {/* Informasi Praktik Section */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Informasi Praktik</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Spesialisasi</p>
              <p className="font-medium">{profil.spesialisasi}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nomor SIP</p>
              <p className="font-medium">{profil.nomor_sip}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Institusi</p>
              <p className="font-medium">{profil.institusi}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jam Praktik Default</p>
              <p className="font-medium">{profil.jam_praktik_default}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Masa Berlaku SIP</p>
              <p className="font-medium text-red-600">
                {profil.sip_expired_at ? new Date(profil.sip_expired_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileDokter;