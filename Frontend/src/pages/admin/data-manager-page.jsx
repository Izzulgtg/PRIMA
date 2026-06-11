import { useState } from "react"

import Card from "../../components/ui/card"
import Badge from "../../components/ui/badge"
import Button from "../../components/ui/button"
import Table from "../../components/ui/table"

function DataManagerPage() {
  const [showRestoreModal, setShowRestoreModal] =
  useState(false)

const [selectedBackup, setSelectedBackup] =
  useState(null)

  const [autoBackup, setAutoBackup] =
  useState(true)

  const [activeTab, setActiveTab] = useState("backup")
  const handleBackup = () => {

  const waktuBackup =
    new Date().toLocaleString()

  localStorage.setItem(
    "lastBackup",
    waktuBackup
  )

  alert("Backup berhasil dilakukan")
}

const handleRestore = (backupDate) => {

  setSelectedBackup(backupDate)

  setShowRestoreModal(true)

}

const confirmRestore = () => {

  alert(
    `Restore berhasil dari backup ${selectedBackup}`
  )

  setShowRestoreModal(false)

}
  const handleValidation = () => {

  alert(
    "Validasi berhasil. Tidak ditemukan data corrupt."
  )
}

  const downloadReport = () => {

  const report = `
LAPORAN SISTEM PRIMA

Tanggal:
${new Date().toLocaleString()}

Total Aktivitas: 156
Perubahan Data: 34
Akses Rekam Medis: 28
Aktivitas Mencurigakan: 0

Status Sistem:
- Database: Active
- API Service: Online
- Backup Service: Active

`;

  const blob = new Blob(
    [report],
    { type: "text/plain" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download = "laporan-sistem.txt";
  a.click();

  window.URL.revokeObjectURL(url);
};

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex items-start justify-between">

        <div>

          <p className="text-prima-teal font-medium">
            PRIMA Admin
          </p>

          <h1
            className="
              text-5xl
              font-bold
              text-prima-text
              mt-4
            "
          >
            Manajemen Data
          </h1>

        </div>

        <div className="text-right">

          <p className="text-prima-muted text-sm">
            Practice Status: Active
          </p>

          <p className="text-prima-teal mt-2 font-medium">
            Last Backup: Today, 04:00 AM
          </p>

        </div>

      </div>

      {/* TABS */}
      <div
        className="
          flex
          gap-6
          border-b
          border-prima-sand
          pb-5
        "
      >

        <button
          onClick={() => setActiveTab("backup")}
          className={`
            pb-3
            font-medium
            ${
              activeTab === "backup"
                ? "text-prima-green border-b-2 border-prima-green"
                : "text-prima-muted"
            }
          `}
        >
          Backup & Restore
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`
            pb-3
            font-medium
            ${
              activeTab === "audit"
                ? "text-prima-green border-b-2 border-prima-green"
                : "text-prima-muted"
            }
          `}
        >
          Audit Data
        </button>

        <button
          onClick={() => setActiveTab("validation")}
          className={`
            pb-3
            font-medium
            ${
              activeTab === "validation"
                ? "text-prima-green border-b-2 border-prima-green"
                : "text-prima-muted"
            }
          `}
        >
          Validasi & Integritas
        </button>

      </div>

      {/* BACKUP TAB */}
      {activeTab === "backup" && (

        <div className="space-y-8">

          {/* BACKUP STATUS */}
          <Card className="bg-[#E7F0E2]">

            <div className="flex items-center justify-between">

              <div>

                <h2
                  className="
                    text-3xl
                    font-bold
                    text-prima-text
                  "
                >
                  Backup Otomatis Aktif
                </h2>

                <p className="text-prima-muted mt-3">
                  Backup terakhir:
                  Minggu, 29 Apr 2026 · 06.00 WIB
                </p>

              </div>

              <Button
                variant="primary"
                onClick={handleBackup}
              >
                Backup Sekarang
              </Button>

            </div>

          </Card>

          {/* GRID */}
          <div className="grid grid-cols-3 gap-8">

            {/* LEFT */}
            <Card>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-prima-text
                "
              >
                Pengaturan Backup
              </h2>

              <div
              className="
                flex
                items-center
                justify-between
                mt-6
                mb-4
              "
            >

              <span className="font-medium">
                Backup Otomatis
              </span>

              <input
                type="checkbox"
                checked={autoBackup}
                onChange={() =>
                  setAutoBackup(!autoBackup)
                }
              />

            </div>


              <div className="space-y-6 mt-8">

                <div>

                  <p className="text-prima-muted mb-3">
                    Frekuensi
                  </p>

                  <div
                    className="
                      bg-prima-background
                      rounded-2xl
                      p-4
                    "
                  >
                    Harian
                  </div>

                </div>

                <div>

                  <p className="text-prima-muted mb-3">
                    Jam Backup
                  </p>

                  <div
                    className="
                      bg-prima-background
                      rounded-2xl
                      p-4
                    "
                  >
                    06.00 WIB
                  </div>

                </div>

                <div>

                  <p className="text-prima-muted mb-3">
                    Retensi Backup
                  </p>

                  <div
                    className="
                      bg-prima-background
                      rounded-2xl
                      p-4
                    "
                  >
                    30 Hari
                  </div>

                </div>

                <Button
                  variant="primary"
                  className="w-full"
                >
                  Simpan Pengaturan
                </Button>

              </div>

            </Card>

            {/* RIGHT */}
            <div className="col-span-2">

              <Card>

                <div className="flex items-center justify-between">

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-prima-text
                    "
                  >
                    Riwayat Backup
                  </h2>

                  <Badge variant="success">
                    Auto Backup
                  </Badge>

                </div>

                <div className="mt-8">

                  <Table>

                    <thead>

                      <tr className="border-b border-prima-sand">

                        <th className="text-left py-4 text-prima-muted">
                          Tanggal
                        </th>

                        <th className="text-left py-4 text-prima-muted">
                          Ukuran
                        </th>

                        <th className="text-left py-4 text-prima-muted">
                          Status
                        </th>

                        <th className="text-left py-4 text-prima-muted">
                          Aksi
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      <tr className="border-b border-prima-sand">

                        <td className="py-5">
                          29 Apr 2026
                        </td>

                        <td className="py-5">
                          245 MB
                        </td>

                       <td className="py-5">

                        <Badge variant="success">
                          Berhasil
                        </Badge>

                      </td>

                      <td className="py-5">

                        <div className="flex gap-2">

  <Button
    variant="outline"
    onClick={() =>
      handleRestore("29 Apr 2026")
    }
  >
    Restore
  </Button>

  <Button
    variant="outline"
    onClick={() =>
      alert("Download backup")
    }
  >
    Download
  </Button>

  <Button
    variant="outline"
    onClick={() =>
      alert("Backup dihapus")
    }
  >
    Delete
  </Button>

</div>

                      </td>

                      </tr>

                      <tr>

                        <td className="py-5">
                          28 Apr 2026
                        </td>

                        <td className="py-5">
                          242 MB
                        </td>

                        <td className="py-5">

                        <Badge variant="danger">
                          Gagal
                        </Badge>

                      </td>

                      <td className="py-5">

                        <Button
                          variant="outline"
                          disabled
                        >
                          Restore
                        </Button>

                      </td>

                      </tr>

                    </tbody>

                  </Table>

                </div>

              </Card>

            </div>

          </div>

                <Card>

  <h2
    className="
      text-2xl
      font-bold
      text-prima-text
    "
  >
    Backup Manual Sekarang
  </h2>

  <p className="text-prima-muted mt-2">
    Pilih data yang ingin dibackup.
  </p>

  <div className="flex gap-6 mt-6">

    <label className="flex items-center gap-2">
      <input type="checkbox" />
      <span>Data Pasien</span>
    </label>

    <label className="flex items-center gap-2">
      <input type="checkbox" />
      <span>Rekam Medis</span>
    </label>

    <label className="flex items-center gap-2">
      <input type="checkbox" />
      <span>Dokter</span>
    </label>

    <label className="flex items-center gap-2">
      <input type="checkbox" />
      <span>Audit Log</span>
    </label>

  </div>

  <Button
    variant="primary"
    className="mt-6"
    onClick={handleBackup}
  >
    Mulai Backup
  </Button>

</Card>

        </div>

      )}


      {/* AUDIT TAB */}
      {activeTab === "audit" && (

        <div className="space-y-8">

          <Card className="bg-[#DCECF5]">

            <p className="text-prima-text leading-relaxed">

              Audit log mencatat semua perubahan data penting
              dalam sistem untuk keamanan dan akuntabilitas.

            </p>

          </Card>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-6">

            <Card>

              <p className="text-prima-muted">
                Total Aktivitas
              </p>

              <h2 className="text-5xl font-bold mt-4">
                156
              </h2>

            </Card>

            <Card>

              <p className="text-prima-muted">
                Perubahan Data
              </p>

              <h2 className="text-5xl font-bold mt-4">
                34
              </h2>

            </Card>

            <Card>

              <p className="text-prima-muted">
                Akses Rekam Medis
              </p>

              <h2 className="text-5xl font-bold mt-4">
                28
              </h2>

            </Card>

            <Card>

              <p className="text-prima-muted">
                Aktivitas Mencurigakan
              </p>

              <h2 className="text-5xl font-bold mt-4">
                0
              </h2>

            </Card>

          </div>

          {/* TABLE */}
          <Card>

            <div className="flex items-center justify-between">

              <h2
                className="
                  text-2xl
                  font-bold
                  text-prima-text
                "
              >
                Audit Logs
              </h2>

              <Button variant="outline">
                Unduh Audit Log
              </Button>

            </div>

            <div className="mt-8">

              <Table>

                <thead>

                  <tr className="border-b border-prima-sand">

                    <th className="text-left py-4">
                      Waktu
                    </th>

                    <th className="text-left py-4">
                      Aktor
                    </th>

                    <th className="text-left py-4">
                      Aksi
                    </th>

                    <th className="text-left py-4">
                      Data
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-b border-prima-sand">

                    <td className="py-5">
                      14:25
                    </td>

                    <td className="py-5">
                      Izzul
                    </td>

                    <td className="py-5">

                      <Badge variant="info">
                        UPDATE
                      </Badge>

                    </td>

                    <td className="py-5">
                      Rekam Medis
                    </td>

                  </tr>

                  <tr>

                    <td className="py-5">
                      14:10
                    </td>

                    <td className="py-5">
                      Izzul 
                    </td>

                    <td className="py-5">

                      <Badge variant="success">
                        LOGIN
                      </Badge>

                    </td>

                    <td className="py-5">
                      Dashboard Admin
                    </td>

                  </tr>

                </tbody>

              </Table>

            </div>

          </Card>

        </div>

      )}

      {/* VALIDATION TAB */}
      {activeTab === "validation" && (

        <div className="space-y-8">

          <Card className="bg-[#ECE8DF]">

            <p className="text-prima-text leading-relaxed">

              Jalankan validasi secara berkala
              untuk memastikan tidak ada data
              corrupt atau tidak konsisten.

            </p>

          </Card>

          {/* VALIDATION CARDS */}
          <div className="space-y-6">

            <Card>

              <div className="flex items-center justify-between">

                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-prima-text
                    "
                  >
                    Integritas Relasi Data
                  </h2>

                  <p className="text-prima-muted mt-2">
                    Semua relasi data valid.
                  </p>

                </div>

                <Button
                  variant="outline"
                  onClick={handleValidation}
                >
                  Jalankan Validasi
                </Button>

              </div>

            </Card>

            <Card>

              <div className="flex items-center justify-between">

                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-prima-text
                    "
                  >
                    Validasi Data Pasien
                  </h2>

                  <p className="text-prima-muted mt-2">
                    Ditemukan 4 data tidak lengkap.
                  </p>

                </div>

                <Button
                  variant="primary"
                  onClick={handleValidation}
                >
                  Jalankan Validasi
                </Button>

              </div>

              <div className="space-y-4 mt-8">

                <div
                  className="
                    bg-[#FFF3F1]
                    rounded-2xl
                    p-5
                    flex
                    items-center
                    justify-between
                  "
                >

                  <p className="text-prima-text">
                    #PS-1029:
                    Alamat domisili tidak lengkap
                  </p>

                  <button
                    className="text-prima-green"
                    onClick={() =>
                      alert("Data berhasil diperbaiki")
                    }
                  >
                    Perbaiki
                  </button>

                </div>

                <div
                  className="
                    bg-[#FFF3F1]
                    rounded-2xl
                    p-5
                    flex
                    items-center
                    justify-between
                  "
                >

                  <p className="text-prima-text">
                    #PS-1102:
                    Format NIK tidak valid
                  </p>

                  <button className="text-prima-green">
                    Perbaiki
                  </button>

                </div>

              </div>

            </Card>

            <Card>

              <div className="flex items-center justify-between">

                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-prima-text
                    "
                  >
                    Deteksi Data Duplikat
                  </h2>

                  <p className="text-prima-muted mt-2">
                    Ditemukan 2 potensi data ganda.
                  </p>

                </div>

                <Button
                  variant="outline"
                  onClick={handleValidation}
                >
                  Deteksi Sekarang
                </Button>

              </div>

            </Card>

          </div>

          {/* ACTIONS */}
          <div className="flex gap-5">

            <Button
              variant="primary"
              onClick={handleValidation}
            >
              Jalankan Semua Validasi
            </Button>

            <Button
              variant="outline"
              onClick={downloadReport}
            >
              Unduh Laporan
            </Button>

          </div>

        </div>

      )}

    {showRestoreModal && (

  <div
    className="
      fixed inset-0
      bg-black/40
      flex items-center justify-center
      z-50
    "
  >

    <div
      className="
        bg-white
        rounded-3xl
        p-8
        w-[500px]
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          text-red-600
        "
      >
        PERHATIAN: Restore Data
      </h2>

      <p className="mt-4 text-prima-muted">

        Restore akan mengganti seluruh data
        sistem dengan backup yang dipilih.

      </p>

<div className="bg-red-50 border border-red-200 rounded-2xl p-4 mt-6">

  Backup Dipilih:
  <strong>
    {selectedBackup}
  </strong>

</div>

<div className="bg-red-50 border border-red-200 rounded-2xl p-4 mt-4">

  ⚠️ Restore akan mengganti seluruh data
  saat ini dan tidak bisa dibatalkan.

</div>

<div className="flex gap-4 mt-8">

  <Button
    onClick={confirmRestore}
  >
    Saya Mengerti, Restore
  </Button>

  <Button
    variant="outline"
    onClick={() =>
      setShowRestoreModal(false)
    }
  >
    Batal
  </Button>

</div>

</div> {/* tutup modal putih */}    

  </div>

)}

    </div>
  )
}

export default DataManagerPage