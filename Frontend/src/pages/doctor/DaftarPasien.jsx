import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaUser, FaArrowLeft, FaPrint, FaPlus, FaExclamationTriangle } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL ||
    "https://apiferdi.oktanio.dev"; // Sesuaikan port backend tim kamu

export default function DaftarPasien() {
    const [view, setView] = useState('list'); // 'list' atau 'detail'
    const [pasienList, setPasienList] = useState([]);
    const [selectedPasienId, setSelectedPasienId] = useState(null);
    const [detailData, setDetailData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // 1. Ambil Semua Daftar Pasien dari Backend
    useEffect(() => {
        fetchPasien();
    }, []);

    const fetchPasien = async () => {
        try {
            setLoading(true);
            // Ambil token yang disimpan di localStorage saat login
            const token = localStorage.getItem('token');

            const response = await axios.get(`${API_URL}/dokter/pasien`, {
                headers: {
                    Authorization: `Bearer ${token}` // Kirim kunci akses ke backend
                }
            });

            if (response.data.success) {
                setPasienList(response.data.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data pasien:", error);

            // TAMBAHKAN INI UNTUK MELIHAT PESAN ASLI DARI BACKEND
            if (error.response && error.response.data) {
                console.log("🚨 DETAIL EROR DARI SERVER:", error.response.data);
                alert("Pesan Eror Server: " + (error.response.data.message || JSON.stringify(error.response.data)));
            } else {
                alert("Tidak dapat terhubung ke server backend.");
            }

        } finally {
            setLoading(false);
        }
    };
    // 2. Ambil Detail Rekam Medis & Resep Pasien saat Klik "Lihat Detail"
    const handleLihatDetail = async (id) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const response = await axios.get(`${API_URL}/dokter/pasien/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Kirim kunci akses ke backend
                }
            });

            if (response.data.success) {
                setDetailData(response.data.data);
                setSelectedPasienId(id);
                setView('detail');
            }
        } catch (error) {
            console.error("Gagal mengambil detail pasien:", error);
            alert("Gagal memuat rekam medis pasien.");
        } finally {
            setLoading(false);
        }
    };

    // Filter Pencarian Pasien berdasarkan Nama atau NIK
    const filteredPasien = pasienList.filter(p =>
        (p.nama && p.nama.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.nik && p.nik.includes(searchTerm))
    );

    if (loading && !detailData && view === 'list') {
        return <div className="p-6 text-center text-gray-500">Memuat data pasien...</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {view === 'list' ? (
                /* =========================================================================
                   VIEW A: DAFTAR PASIEN (Sesuai Mockup Kiri)
                   ========================================================================= */
                <div>
                    <div className="mb-2 text-sm text-gray-400">PRIMA - Daftar Pasien (Doctor Dashboard)</div>

                    {/* Ringkasan Statistik */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase">Total Pasien</p>
                                <h3 className="text-2xl font-bold text-gray-700">{pasienList.length}</h3>
                            </div>
                            <div className="bg-orange-50 text-orange-400 p-3 rounded-lg font-bold">👤</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase">Bulan Ini</p>
                                <h3 className="text-2xl font-bold text-gray-700">23</h3>
                            </div>
                            <div className="bg-green-50 text-green-400 p-3 rounded-lg font-bold">📈</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase">Aktif Hari Ini</p>
                                <h3 className="text-2xl font-bold text-gray-700">8</h3>
                            </div>
                            <div className="bg-blue-50 text-blue-400 p-3 rounded-lg font-bold">📋</div>
                        </div>
                    </div>

                    {/* Filter Pencarian */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1">
                            <FaSearch className="absolute left-3 top-3.5 text-gray-300" />
                            <input
                                type="text"
                                placeholder="Cari nama atau NIK pasien..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-gray-50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 text-xs">
                            <button className="px-4 py-2 rounded-full bg-emerald-800 text-white font-medium">Semua</button>
                            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500 font-medium hover:bg-gray-200">Pasien Baru</button>
                            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500 font-medium hover:bg-gray-200">Pasien Lama</button>
                            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-500 font-medium hover:bg-gray-200">Hari Ini</button>
                        </div>
                    </div>

                    {/* List Pasien */}
                    <div className="space-y-3">
                        {filteredPasien.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">Tidak ada data pasien ditemukan.</div>
                        ) : (
                            filteredPasien.map((pasien) => (
                                <div key={pasien.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                            {pasien.nama ? pasien.nama.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RM'}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-gray-800 text-base">{pasien.nama}</h4>
                                                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-md font-semibold">Kunjungan</span>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                👤 {pasien.umur || 0} thn, {pasien.jenis_kelamin || '-'}  |  📅 {pasien.lastVisit ? new Date(pasien.lastVisit).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Belum pernah'}
                                            </p>
                                            {pasien.lastComplaint && (
                                                <div className="mt-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 text-xs text-gray-600 flex items-center gap-1.5">
                                                    💼 <span className="font-medium text-gray-400">Keluhan terakhir:</span> {pasien.lastComplaint}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleLihatDetail(pasien.id)}
                                        className="btn-detail-kamu"
                                    >
                                        Lihat Detail
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                /* =========================================================================
                   VIEW B: DETAIL RIWAYAT PASIEN (Sesuai Mockup Kanan)
                   ========================================================================= */
                detailData && (
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <button onClick={() => setView('list')} className="text-gray-500 hover:text-gray-800">
                                <FaArrowLeft />
                            </button>
                            <h2 className="text-lg font-bold text-gray-700">{detailData.profil.nama}</h2>
                        </div>

                        {/* Kotak Profil & Alergi */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div className="flex gap-4 items-center">
                                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-2xl">
                                    <FaUser />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{detailData.profil.nama}</h3>
                                    <p className="text-xs text-gray-400 font-medium uppercase mt-0.5">
                                        {detailData.profil.umur} THN • {detailData.profil.jenis_kelamin}
                                    </p>
                                </div>
                                <div className="ml-6 text-xs text-gray-500 space-y-1 border-l pl-6 border-gray-200">
                                    <p>🆔 <span className="font-semibold text-gray-700">NIK:</span> {detailData.profil.nik || '-'}</p>
                                    <p>💳 <span className="font-semibold text-gray-700">BPJS:</span> {detailData.profil.bpjs || '000123456789'}</p>
                                </div>
                            </div>
                            <div className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold">
                                <FaExclamationTriangle />
                                <div>
                                    <p className="text-[10px] text-red-400 uppercase tracking-wider">Alergi</p>
                                    <p>Penisilin</p>
                                </div>
                            </div>
                        </div>

                        {/* Riwayat Kunjungan Cards */}
                        <h3 className="font-bold text-gray-700 text-base mb-3">Riwayat Kunjungan</h3>
                        <div className="space-y-4 mb-6">
                            {detailData.rekamMedis.length === 0 ? (
                                <div className="bg-white p-4 rounded-xl text-center text-gray-400 text-xs">Belum ada riwayat pemeriksaan medis.</div>
                            ) : (
                                detailData.rekamMedis.map((rm, idx) => (
                                    <div key={rm.rekam_medis_id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-center border-b border-gray-50 pb-2 mb-3">
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="bg-orange-100 text-orange-700 font-bold px-2.5 py-0.5 rounded-full">
                                                    {new Date(rm.tanggal_periksa).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                                <span className="font-semibold text-gray-700">{rm.nama_dokter}</span>
                                            </div>
                                        </div>

                                        {/* Tampilkan Tanda Vital Jika Kunjungan Pertama/Sesuai Mockup */}
                                        {idx === 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 p-3 rounded-xl mb-4 text-center">
                                                <div className="bg-white p-2 rounded-lg border border-gray-100"><p className="text-[10px] text-gray-400 font-medium">TD</p><p className="text-sm font-bold text-gray-700">120/80 <span className="text-[10px] font-normal text-gray-400">mmHg</span></p></div>
                                                <div className="bg-white p-2 rounded-lg border border-gray-100"><p className="text-[10px] text-gray-400 font-medium">NADI</p><p className="text-sm font-bold text-gray-700">80 <span className="text-[10px] font-normal text-gray-400">bpm</span></p></div>
                                                <div className="bg-white p-2 rounded-lg border border-gray-100"><p className="text-[10px] text-gray-400 font-medium">SUHU</p><p className="text-sm font-bold text-gray-700">36.5 <span className="text-[10px] font-normal text-gray-400">°C</span></p></div>
                                                <div className="bg-white p-2 rounded-lg border border-gray-100"><p className="text-[10px] text-gray-400 font-medium">BERAT</p><p className="text-sm font-bold text-gray-700">70 <span className="text-[10px] font-normal text-gray-400">kg</span></p></div>
                                            </div>
                                        )}

                                        <div className="text-xs space-y-2 text-gray-600">
                                            <p><span className="font-bold text-gray-400 block md:inline md:w-24">Keluhan:</span> {rm.keluhan || '-'}</p>
                                            <p><span className="font-bold text-gray-400 block md:inline md:w-24">Diagnosis:</span> <span className="font-semibold text-gray-800">{rm.diagnosis}</span></p>
                                            <p><span className="font-bold text-gray-400 block md:inline md:w-24">Tindakan:</span> {rm.tindakan || '-'}</p>
                                            <div className="pt-2 flex items-center gap-1.5">
                                                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">KODE ICD-10: J06.9</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Tabel Pratinjau Rekam Medis */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-gray-700 text-sm">Pratinjau Rekam Medis</h3>
                                <button className="flex items-center gap-1.5 text-xs font-semibold border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600">
                                    <FaPrint /> Cetak Rekam Medis
                                </button>
                            </div>
                            <table className="w-full text-left text-xs text-gray-500 border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] border-b border-gray-100">
                                        <th className="py-2.5 px-3 font-semibold">Tanggal</th>
                                        <th className="py-2.5 px-3 font-semibold">Diagnosis</th>
                                        <th className="py-2.5 px-3 font-semibold">ICD-10</th>
                                        <th className="py-2.5 px-3 font-semibold">Dokter</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
                                    {detailData.rekamMedis.map((rm) => (
                                        <tr key={rm.rekam_medis_id}>
                                            <td className="py-2.5 px-3">{new Date(rm.tanggal_periksa).toLocaleDateString('id-ID')}</td>
                                            <td className="py-2.5 px-3 font-bold text-emerald-900">{rm.diagnosis}</td>
                                            <td className="py-2.5 px-3"><span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 text-[10px]">J06.9</span></td>
                                            <td className="py-2.5 px-3 text-gray-500">{rm.nama_dokter}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Tabel Riwayat Resep */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            <h3 className="font-bold text-gray-700 text-sm mb-3">Riwayat Resep</h3>
                            <table className="w-full text-left text-xs text-gray-500 border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] border-b border-gray-100">
                                        <th className="py-2.5 px-3 font-semibold">Tanggal</th>
                                        <th className="py-2.5 px-3 font-semibold">Obat</th>
                                        <th className="py-2.5 px-3 font-semibold">Dosis & Aturan</th>
                                        <th className="py-2.5 px-3 font-semibold">Qty</th>
                                        <th className="py-2.5 px-3 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
                                    {detailData.resepObat.length === 0 ? (
                                        <tr><td colSpan="5" className="py-4 text-center text-gray-400">Tidak ada pemberian resep obat.</td></tr>
                                    ) : (
                                        detailData.resepObat.map((resep, idx) => (
                                            <tr key={idx}>
                                                <td className="py-2.5 px-3">{new Date(resep.tanggal_kunjungan).toLocaleDateString('id-ID')}</td>
                                                <td className="py-2.5 px-3 font-bold text-gray-800">{resep.nama_obat}</td>
                                                <td className="py-2.5 px-3 text-gray-500">{resep.aturan_pakai || '3 x 1 sesudah makan'}</td>
                                                <td className="py-2.5 px-3">15</td>
                                                <td className="py-2.5 px-3">
                                                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">DIAMBIL</span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Floating Button Tambah Rekam Medis */}
                        <button className="fixed bottom-6 right-6 bg-emerald-800 text-white p-4 rounded-full shadow-lg hover:bg-emerald-900 transition-colors">
                            <FaPlus size={18} />
                        </button>
                    </div>
                )
            )}
        </div>
    );
}

 