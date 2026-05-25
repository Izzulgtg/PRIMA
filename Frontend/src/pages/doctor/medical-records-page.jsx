import { useState } from "react";

function MedicalRecordsPage() {
  const medicalRecords = [
    {
      id: 1,
      patientName: "Budi Santoso",
      age: 35,
      gender: "Laki-laki",
      visitDate: "12 Mei 2026",
      complaint: "Demam dan sakit kepala",
      diagnosis: "Infeksi saluran pernapasan atas ringan",
      prescription: "Paracetamol 500mg, 3x sehari setelah makan",
      doctorNote: "Istirahat cukup dan perbanyak minum air putih.",
    },
    {
      id: 2,
      patientName: "Siti Aminah",
      age: 28,
      gender: "Perempuan",
      visitDate: "10 Mei 2026",
      complaint: "Batuk kering selama 3 hari",
      diagnosis: "Iritasi tenggorokan ringan",
      prescription: "OBH sirup dan vitamin C",
      doctorNote: "Hindari minuman dingin dan kontrol ulang jika batuk memburuk.",
    },
    {
      id: 3,
      patientName: "Raka Pratama",
      age: 42,
      gender: "Laki-laki",
      visitDate: "8 Mei 2026",
      complaint: "Nyeri perut bagian bawah",
      diagnosis: "Gangguan pencernaan ringan",
      prescription: "Antasida, 3x sehari sebelum makan",
      doctorNote: "Jaga pola makan dan hindari makanan pedas.",
    },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredRecords = medicalRecords.filter((record) =>
    record.patientName.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <section className="p-6">
      <div>
        <h1 className="text-2xl font-semibold text-prima-black">
          Rekam Medis Pasien
        </h1>

        <p className="mt-2 text-sm text-prima-gray">
          Lihat riwayat pemeriksaan, diagnosis, resep, dan catatan medis pasien.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-prima-gray">Total Pasien</p>

          <h2 className="mt-2 text-3xl font-semibold text-prima-black">
            {medicalRecords.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-prima-gray">Total Rekam Medis</p>

          <h2 className="mt-2 text-3xl font-semibold text-prima-black">
            {medicalRecords.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-prima-gray">Pemeriksaan Bulan Ini</p>

          <h2 className="mt-2 text-3xl font-semibold text-prima-black">
            {medicalRecords.length}
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-prima-black">
                Daftar Rekam Medis
              </h2>

              <p className="mt-1 text-sm text-prima-gray">
                Cari pasien dan pilih rekam medis untuk melihat detail.
              </p>
            </div>

            <input
              type="text"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              className="rounded-xl border border-prima-sand px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
              placeholder="Cari nama pasien..."
            />
          </div>

          <div className="mt-5 space-y-3">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="rounded-2xl border border-prima-sand p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-prima-black">
                      {record.patientName}
                    </p>

                    <p className="mt-1 text-sm text-prima-gray">
                      {record.age} tahun • {record.gender}
                    </p>

                    <p className="mt-1 text-sm text-prima-gray">
                      Kunjungan: {record.visitDate}
                    </p>

                    <p className="mt-2 text-sm text-prima-black">
                      Keluhan: {record.complaint}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedRecord(record)}
                    className="rounded-xl bg-prima-green px-4 py-2 text-sm font-medium text-white"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}

            {filteredRecords.length === 0 && (
              <div className="rounded-2xl border border-prima-sand p-4">
                <p className="text-sm text-prima-gray">
                  Data rekam medis tidak ditemukan.
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-prima-black">
            Detail Rekam Medis
          </h2>

          {!selectedRecord && (
            <p className="mt-4 text-sm text-prima-gray">
              Pilih salah satu rekam medis untuk melihat diagnosis, resep, dan
              catatan dokter.
            </p>
          )}

          {selectedRecord && (
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs text-prima-gray">Nama Pasien</p>
                <p className="font-medium text-prima-black">
                  {selectedRecord.patientName}
                </p>
              </div>

              <div>
                <p className="text-xs text-prima-gray">Tanggal Kunjungan</p>
                <p className="font-medium text-prima-black">
                  {selectedRecord.visitDate}
                </p>
              </div>

              <div>
                <p className="text-xs text-prima-gray">Diagnosis</p>
                <p className="font-medium text-prima-black">
                  {selectedRecord.diagnosis}
                </p>
              </div>

              <div>
                <p className="text-xs text-prima-gray">Resep Obat</p>
                <p className="font-medium text-prima-black">
                  {selectedRecord.prescription}
                </p>
              </div>

              <div>
                <p className="text-xs text-prima-gray">Catatan Dokter</p>
                <p className="font-medium text-prima-black">
                  {selectedRecord.doctorNote}
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

export default MedicalRecordsPage;