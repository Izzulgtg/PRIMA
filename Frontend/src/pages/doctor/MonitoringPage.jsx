import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MonitoringPage = () => {
  const [activeTab, setActiveTab] = useState('pasien'); // Default tab ke Ringkasan Pasien sesuai UI Figma
  const [summaryData, setSummaryData] = useState(null);
  const [dataObat, setDataObat] = useState(null);
  const [dataKunjungan, setDataKunjungan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // Eksekusi 3 API secara paralel
        const [resSummary, resObat, resKunjungan] = await Promise.all([
          axios.get("https://apiferdi.oktanio.dev/api/dokter/monitoring/summary", { headers }),
          axios.get("https://apiferdi.oktanio.dev/api/dokter/monitoring/obat", { headers }),
          axios.get("https://apiferdi.oktanio.dev/api/dokter/monitoring/kunjungan", { headers })
        ]);

        setSummaryData(resSummary.data.data);
        setDataObat(resObat.data.data);
        setDataKunjungan(resKunjungan.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal memuat data analitik:", error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div className="p-6 text-center text-gray-600">Memuat data analitik sistem...</div>;

  // Mencari nilai tertinggi untuk skala grafik batangan
  const maxTrenValue = summaryData?.tren?.length > 0 
    ? Math.max(...summaryData.tren.map(t => t.jumlah), 5) 
    : 10;

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Monitoring Dashboard</h1>
          <p className="text-sm text-gray-500">Pantau statistik klinik, tren pasien, dan rekap log obat secara real-time.</p>
        </div>
        <button className="bg-green-700 text-white px-4 py-2 rounded-lg shadow hover:bg-green-800 font-medium transition-all">
          Unduh Laporan (.PDF)
        </button>
      </div>

      {/* 📊 SEKSI CARD STATISTIK UTAMA (ATAS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Pasien Ditangani</span>
          <span className="text-3xl font-bold text-gray-800 mt-2">{summaryData?.cards?.totalPasien || 0}</span>
          <span className="text-xs text-green-600 mt-1 font-medium"> Orang Terdaftar</span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Konsultasi Bulan Ini</span>
          <span className="text-3xl font-bold text-gray-800 mt-2">{summaryData?.cards?.konsultasiBulanIni || 0}</span>
          <span className="text-xs text-blue-600 mt-1 font-medium">Selesai Diperiksa</span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Resep Dibuat</span>
          <span className="text-3xl font-bold text-gray-800 mt-2">{summaryData?.cards?.totalResep || 0}</span>
          <span className="text-xs text-amber-600 mt-1 font-medium">Log Farmasi Tersimpan</span>
        </div>
      </div>

      {/* 📑 NAVIGASI TAB */}
      <div className="flex space-x-2 mb-6 bg-gray-200/60 p-1.5 rounded-xl w-max">
        {[
          { key: 'pasien', label: 'Ringkasan Pasien' },
          { key: 'konsultasi', label: 'Tren Konsultasi' },
          { key: 'resep', label: 'Rekap Resep' },
          { key: 'kunjungan', label: 'Laporan Kunjungan' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.key 
                ? 'bg-white text-green-800 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 📦 KONTEN UTAMA TAB */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        
        {/* TAB 1: RINGKASAN PASIEN */}
        {activeTab === 'pasien' && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Demografi & Karakteristik Pasien</h2>
            <p className="text-sm text-gray-500 mb-6">Distribusi kelompok pasien berdasarkan data rekam medis.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border p-4 rounded-xl bg-gray-50/50">
                <h3 className="text-sm font-bold text-gray-600 mb-4 uppercase">Berdasarkan Jenis Kelamin</h3>
                <div className="space-y-4">
                  {summaryData?.demografi?.map((demo, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm font-medium mb-1 capitalize">
                        <span>{demo.jenis_kelamin}</span>
                        <span className="font-bold">{demo.jumlah} Pasien</span>
                      </div>
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${demo.jenis_kelamin === 'laki-laki' ? 'bg-blue-500' : 'bg-pink-500'}`} 
                          style={{ width: `${(demo.jumlah / (summaryData.cards.totalPasien || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  {(!summaryData?.demografi || summaryData?.demografi.length === 0) && (
                    <p className="text-sm text-gray-400">Belum ada data demografi pasien.</p>
                  )}
                </div>
              </div>

              <div className="border p-4 rounded-xl bg-gray-50/50 flex flex-col justify-center items-center text-center">
                <span className="text-gray-400 text-sm font-semibold uppercase mb-2">Pasien Paling Aktif Hari Ini</span>
                <p className="text-2xl font-black text-green-700">{dataKunjungan[0]?.nama_pasien || '-'}</p>
                <span className="text-xs text-gray-500 mt-1">Terakhir diperiksa dengan keluhan: "{dataKunjungan[0]?.keluhan || '-'}"</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TREN KONSULTASI (GRAFIK) */}
        {activeTab === 'konsultasi' && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">Grafik Tren Kunjungan Pasien</h2>
            <p className="text-sm text-gray-500 mb-8">Jumlah pasien yang ditangani per bulan (6 bulan terakhir).</p>
            
            {/* Visual Chart Batangan Indah Menggunakan Tailwind */}
            <div className="flex items-end justify-between h-64 border-b border-l px-4 pb-2 pt-4 bg-gray-50/30 rounded-lg">
              {summaryData?.tren?.map((item, index) => {
                const barHeightPercentage = (item.jumlah / maxTrenValue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center flex-1 group">
                    {/* Tooltip jumlah saat di-hover */}
                    <span className="opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded mb-2 transition-all shadow absolute transform -translate-y-10">
                      {item.jumlah} Pasien
                    </span>
                    {/* Batang Grafik */}
                    <div 
                      className="w-12 bg-green-700 hover:bg-green-600 rounded-t-md transition-all duration-500"
                      style={{ height: `${Math.max(barHeightPercentage, 5)}%` }}
                    ></div>
                    {/* Label Bulan */}
                    <span className="text-xs font-semibold text-gray-500 mt-3 rotate-12 md:rotate-0">
                      {item.bulan}
                    </span>
                  </div>
                );
              })}
              {(!summaryData?.tren || summaryData?.tren.length === 0) && (
                <div className="w-full text-center py-20 text-gray-400">Belum ada data riwayat bulanan untuk dibuatkan tren grafik.</div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: REKAP RESEP */}
        {activeTab === 'resep' && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">Detail Penggunaan & Stok Obat</h2>
            <p className="text-sm text-gray-500 mb-4">Daftar obat yang paling sering diresepkan beserta sisa stok gudang.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-sm text-gray-500 font-semibold bg-gray-50">
                    <th className="py-3 px-4">Nama Obat</th>
                    <th className="py-3 px-4">Total Terpakai di Resep</th>
                    <th className="py-3 px-4">Sisa Stok Apotek</th>
                    <th className="py-3 px-4">Status Batas Minimum</th>
                  </tr>
                </thead>
                <tbody>
                  {dataObat?.topObat?.map((obat, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-700">{obat.nama}</td>
                      <td className="py-3 px-4 text-gray-600">{obat.total_penggunaan || 0} Unit</td>
                      <td className="py-3 px-4 text-gray-600 font-mono">{obat.stok} Unit</td>
                      <td className="py-3 px-4">
                        {obat.stok <= 20 ? (
                          <span className="px-2.5 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full">⚠️ Menipis / Restock</span>
                        ) : (
                          <span className="px-2.5 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full">✓ Aman</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: LAPORAN KUNJUNGAN */}
        {activeTab === 'kunjungan' && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">Log Histori Kunjungan Medis</h2>
            <p className="text-sm text-gray-500 mb-4">Menampilkan catatan riwayat pemeriksaan medis teratas yang ditangani oleh Anda.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-sm text-gray-500 font-semibold bg-gray-50">
                    <th className="py-3 px-4">Tanggal & Waktu</th>
                    <th className="py-3 px-4">Nama Lengkap Pasien</th>
                    <th className="py-3 px-4">Keluhan Utama</th>
                    <th className="py-3 px-4">Diagnosis Utama</th>
                  </tr>
                </thead>
                <tbody>
                  {dataKunjungan.map((log, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(log.tanggal).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-700">{log.nama_pasien}</td>
                      <td className="py-3 px-4 text-gray-600 italic">"{log.keluhan}"</td>
                      <td className="py-3 px-4 font-medium text-blue-700 bg-blue-50/30">{log.diagnosis}</td>
                    </tr>
                  ))}
                  {dataKunjungan.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-400">Belum ada log kunjungan medis tercatat.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MonitoringPage;