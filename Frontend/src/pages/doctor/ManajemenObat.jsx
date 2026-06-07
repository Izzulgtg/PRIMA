import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertTriangle, XCircle, Plus, Edit2, X, Info } from 'lucide-react';

const ManajemenObat = () => {
  const [obatList, setObatList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [isLoading, setIsLoading] = useState(true);

  // State untuk form tambah obat (sesuai kolom database)
  const [formData, setFormData] = useState({
    nama: '',
    nama_generik: '',
    kategori_id: '',
    satuan: '',
    stok: '',
    batas_minimum: '',
    tanggal_kadaluarsa: '',
    supplier_id: '',
    harga_per_unit: ''
  });

  // Konfigurasi Token Auth
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); // Ambil token dari local storage
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // MENGAMBIL DATA DARI BACKEND
  const fetchObat = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/dokter/obat', getAuthHeaders());

      console.log("Cek Data dari Backend:", response.data);

      // Deteksi cerdas struktur data backend
      if (Array.isArray(response.data)) {
        setObatList(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setObatList(response.data.data);
      } else if (response.data && Array.isArray(response.data.obat)) {
        setObatList(response.data.obat);
      } else {
        console.warn("Format data backend tidak dikenali:", response.data);
        setObatList([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data obat! Detail Error:", error.response || error);
      setObatList([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil fetchObat saat komponen pertama kali dimuat
  useEffect(() => {
    fetchObat();
  }, []);

  // Fungsi helper untuk menentukan status obat
  const getStatus = (stok, batas_minimum, tgl_kadaluarsa) => {
    const today = new Date();
    const expDate = new Date(tgl_kadaluarsa);

    if (stok <= 0) return { label: 'HABIS', color: 'bg-red-100 text-red-600' };
    if (tgl_kadaluarsa && expDate < today) return { label: 'KADALUARSA', color: 'bg-gray-200 text-gray-600' };
    if (stok <= batas_minimum) return { label: 'HAMPIR HABIS', color: 'bg-yellow-100 text-yellow-600' };
    return { label: 'AMAN', color: 'bg-green-100 text-green-600' };
  };

  // Fungsi helper untuk format tanggal ke tampilan Indonesia
  const formatTanggal = (tanggal) => {
    if (!tanggal) return '-';
    return new Date(tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // MENGIRIM DATA KE BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Konversi format tanggal HTML agar ramah dengan MySQL (YYYY-MM-DD)
    let formattedDate = null;
    if (formData.tanggal_kadaluarsa) {
      const dateObj = new Date(formData.tanggal_kadaluarsa);
      if (!isNaN(dateObj.getTime())) {
        formattedDate = dateObj.toISOString().split('T')[0];
      }
    }

    // 2. Lakukan parsing tipe data agar angka dikirim sebagai Number, bukan string
    const payload = {
      nama: formData.nama,
      nama_generik: formData.nama_generik || null,
      kategori_id: formData.kategori_id ? parseInt(formData.kategori_id, 10) : null,
      supplier_id: formData.supplier_id ? parseInt(formData.supplier_id, 10) : null,
      satuan: formData.satuan,
      stok: parseInt(formData.stok, 10) || 0,
      batas_minimum: parseInt(formData.batas_minimum, 10) || 0,
      tanggal_kadaluarsa: formattedDate,
      harga_per_unit: parseFloat(formData.harga_per_unit) || 0
    };

    try {
      await axios.post('http://localhost:5000/api/dokter/obat', payload, getAuthHeaders());
      alert('Data obat berhasil ditambahkan!');
      setIsModalOpen(false);

      // Reset form
      setFormData({
        nama: '', nama_generik: '', kategori_id: '', satuan: '',
        stok: '', batas_minimum: '', tanggal_kadaluarsa: '',
        supplier_id: '', harga_per_unit: ''
      });

      // Refresh tabel setelah sukses menyimpan
      fetchObat();
    } catch (error) {
      console.error("Gagal menyimpan obat:", error);
      alert(error.response?.data?.message || 'Gagal menyimpan data obat. Periksa koneksi atau kelengkapan data.');
    }
  };

  // Filter data
  const filteredObat = obatList.filter(obat => {
    const status = getStatus(obat.stok, obat.batas_minimum, obat.tanggal_kadaluarsa).label;
    if (activeFilter === 'Semua') return true;
    if (activeFilter === 'Aman') return status === 'AMAN';
    if (activeFilter === 'Hampir Habis') return status === 'HAMPIR HABIS';
    if (activeFilter === 'Habis') return status === 'HABIS';
    if (activeFilter === 'Kadaluarsa') return status === 'KADALUARSA';
    return true;
  });

  // Hitung jumlah obat bermasalah untuk banner peringatan
  const jumlahHampirHabis = obatList.filter(o => getStatus(o.stok, o.batas_minimum, o.tanggal_kadaluarsa).label === 'HAMPIR HABIS').length;
  const jumlahHabis = obatList.filter(o => getStatus(o.stok, o.batas_minimum, o.tanggal_kadaluarsa).label === 'HABIS').length;

  return (
    <div className="flex-1 p-8 bg-white font-sans relative h-full">

      {/* WARNING BANNERS */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-yellow-700">
            <AlertTriangle size={20} />
            <span className="text-sm font-semibold">{jumlahHampirHabis} obat hampir habis — segera lakukan restok</span>
          </div>
          <button onClick={() => setActiveFilter('Hampir Habis')} className="text-sm font-bold text-yellow-700 hover:underline">Lihat</button>
        </div>
        <div className="flex-1 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-red-600">
            <XCircle size={20} />
            <span className="text-sm font-semibold">{jumlahHabis} obat stok habis — tidak bisa diresepkan</span>
          </div>
          <button onClick={() => setActiveFilter('Habis')} className="text-sm font-bold text-red-600 hover:underline">Lihat</button>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">Filter:</span>
          {['Semua', 'Aman', 'Hampir Habis', 'Habis', 'Kadaluarsa'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${activeFilter === filter
                ? 'bg-[#2A4736] text-white border-[#2A4736]'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#2A4736] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1f3528] transition shadow-sm"
        >
          <Plus size={16} />
          Tambah Obat Baru
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Obat</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stok</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Satuan</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kadaluarsa</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500 text-sm">
                  Memuat data obat...
                </td>
              </tr>
            ) : filteredObat.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500 text-sm">
                  Tidak ada data obat yang ditemukan.
                </td>
              </tr>
            ) : (
              filteredObat.map((obat) => {
                const status = getStatus(obat.stok, obat.batas_minimum, obat.tanggal_kadaluarsa);
                return (
                  <tr key={obat.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4">
                      <p className="text-sm font-bold text-gray-800">{obat.nama}</p>
                      <p className="text-[11px] text-gray-400">Generic: {obat.nama_generik || '-'}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {obat.nama_kategori || (obat.kategori_id ? `Kategori ${obat.kategori_id}` : '-')}
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-800">{obat.stok}</td>
                    <td className="p-4 text-sm text-gray-600 capitalize">{obat.satuan}</td>
                    <td className="p-4 text-sm text-gray-600">{formatTanggal(obat.tanggal_kadaluarsa)}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={async () => {
                            // 1. Prompt pertama untuk menanyakan Stok baru
                            const stokBaru = prompt(`Masukkan jumlah stok baru untuk ${obat.nama}:`, obat.stok);
                            if (stokBaru === null) return;

                            const angkaStok = parseInt(stokBaru, 10);
                            if (isNaN(angkaStok) || angkaStok < 0) {
                              alert("Masukkan jumlah stok yang valid (angka positif)!");
                              return;
                            }

                            // Ambil tanggal lama sebagai default value format YYYY-MM-DD
                            const tanggalLama = obat.tanggal_kadaluarsa ? obat.tanggal_kadaluarsa.substring(0, 10) : "";

                            // 2. Prompt kedua untuk menanyakan Tanggal Kadaluarsa baru
                            const tglKadaluarsaBaru = prompt(
                              `Masukkan tanggal kadaluarsa baru untuk ${obat.nama} (Format: YYYY-MM-DD):`,
                              tanggalLama
                            );
                            if (tglKadaluarsaBaru === null) return;

                            try {
                              // 3. Kirim data update (stok & tanggal_kadaluarsa) ke backend
                              const response = await axios.put(
                                `http://localhost:5000/api/dokter/obat/${obat.id}`,
                                {
                                  stok: angkaStok,
                                  tanggal_kadaluarsa: tglKadaluarsaBaru.trim() === "" ? null : tglKadaluarsaBaru
                                },
                                getAuthHeaders()
                              );

                              if (response.data.success) {
                                alert("Data obat berhasil diperbarui!");
                                fetchObat(); // Refresh data tabel biar sinkron
                              }
                            } catch (error) {
                              console.error("Gagal update data obat:", error);
                              alert(error.response?.data?.message || "Terjadi kesalahan saat memperbarui data.");
                            }
                          }}
                          className="text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
                        >
                          Update Obat
                        </button>
                        <button className="text-gray-400 hover:text-[#2A4736]">
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL TAMBAH OBAT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">

            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Tambah Obat Baru</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-left">

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Obat *</label>
                  <input type="text" name="nama" value={formData.nama} onChange={handleInputChange} placeholder="Contoh: Amoxicillin 500mg" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A4736]" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Generik</label>
                  <input type="text" name="nama_generik" value={formData.nama_generik} onChange={handleInputChange} placeholder="Contoh: Amoxicillin Trihydrate" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A4736]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Kategori ID</label>
                  <input type="number" name="kategori_id" value={formData.kategori_id} onChange={handleInputChange} placeholder="ID Kategori (Contoh: 1)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A4736]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Satuan *</label>
                  <select name="satuan" value={formData.satuan} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A4736]" required>
                    <option value="">Pilih Satuan</option>
                    <option value="kapsul">Kapsul</option>
                    <option value="tablet">Tablet</option>
                    <option value="botol">Botol</option>
                    <option value="sirup">Sirup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stok Awal *</label>
                  <input type="number" name="stok" value={formData.stok} onChange={handleInputChange} placeholder="Jumlah stok" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A4736]" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Batas Minimum Stok *
                  </label>
                  <input type="number" name="batas_minimum" value={formData.batas_minimum} onChange={handleInputChange} placeholder="Peringatan jika stok di bawah ini" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A4736]" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tanggal Kadaluarsa</label>
                  <input type="date" name="tanggal_kadaluarsa" value={formData.tanggal_kadaluarsa} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A4736]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Supplier ID</label>
                  <input type="number" name="supplier_id" value={formData.supplier_id} onChange={handleInputChange} placeholder="ID Supplier (Contoh: 1)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2A4736]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Harga per Unit *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2.5 text-sm text-gray-400">Rp</span>
                    <input type="number" name="harga_per_unit" value={formData.harga_per_unit} onChange={handleInputChange} placeholder="0" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#2A4736]" required />
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-[#f4f7f5] rounded-xl p-4 flex gap-3 items-start border border-[#e6eee8] text-left">
                <Info size={18} className="text-[#6B8F71] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#5a765f] leading-relaxed">
                  Pastikan data obat yang dimasukkan sudah sesuai dengan fisik farmasi. Sistem akan otomatis memperbarui tabel setelah disimpan.
                </p>
              </div>

              <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700">
                  Batal
                </button>
                <button type="submit" className="bg-[#2A4736] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1f3528] transition shadow-sm">
                  Simpan Obat
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManajemenObat;