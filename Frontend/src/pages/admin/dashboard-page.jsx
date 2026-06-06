import { useState } from "react"

import Input from "../../components/ui/input"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Badge from "../../components/ui/badge"
import Modal from "../../components/ui/modal"
import Table from "../../components/ui/table"

function DashboardPage() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div
        className="
          flex
          items-start
          justify-between
          gap-10
        "
      >

        <div>

          <p className="text-prima-teal font-medium">
            PRIMA Configuration
          </p>

          <h1
            className="
              text-5xl
              font-bold
              text-prima-text
              mt-4
            "
          >
            Dashboard Admin
          </h1>

          <p
            className="
              text-prima-muted
              mt-5
              text-lg
              leading-relaxed
              max-w-2xl
            "
          >
            Kelola konfigurasi sistem,
            monitoring layanan,
            keamanan platform,
            dan pengaturan PRIMA.
          </p>

        </div>

        <div className="flex gap-4">

          <Badge variant="success">
            System Active
          </Badge>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
          >
            + Tambah User
          </Button>

        </div>

      </div>

      {/* SEARCH */}
      <div className="max-w-xl">

        <Input
          placeholder="Cari data pasien..."
        />

      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-3 gap-8">

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <p className="text-prima-muted text-sm">
                Total Pasien
              </p>

              <h2
                className="
                  text-5xl
                  font-bold
                  text-prima-text
                  mt-4
                "
              >
                120
              </h2>

              <p className="text-prima-green mt-4 text-sm">
                +12% bulan ini
              </p>

            </div>

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-[#DDE8D7]
              "
            />

          </div>

        </Card>

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <p className="text-prima-muted text-sm">
                Konsultasi Hari Ini
              </p>

              <h2
                className="
                  text-5xl
                  font-bold
                  text-prima-text
                  mt-4
                "
              >
                34
              </h2>

              <p className="text-prima-teal mt-4 text-sm">
                +8% hari ini
              </p>

            </div>

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-[#DCE9EE]
              "
            />

          </div>

        </Card>

        <Card>

          <div className="flex items-center justify-between">

            <div>

              <p className="text-prima-muted text-sm">
                Maintenance Aktif
              </p>

              <h2
                className="
                  text-5xl
                  font-bold
                  text-prima-text
                  mt-4
                "
              >
                2
              </h2>

              <p className="text-[#C4846A] mt-4 text-sm">
                Perlu pengecekan
              </p>

            </div>

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-[#F3DDD4]
              "
            />

          </div>

        </Card>

      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-2 gap-8">

        {/* RECENT ACTIVITY */}
        <Card>

          <div className="flex items-center justify-between">

            <h2
              className="
                text-2xl
                font-semibold
                text-prima-text
              "
            >
              Recent Activity
            </h2>

            <Badge variant="info">
              Live
            </Badge>

          </div>

          <div className="space-y-6 mt-8">

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-prima-sand
                pb-5
              "
            >

              <div>

                <p className="font-medium text-prima-text">
                  Pasien Baru Terdaftar
                </p>

                <p className="text-sm text-prima-muted mt-1">
                  5 menit yang lalu
                </p>

              </div>

              <Badge variant="success">
                Success
              </Badge>

            </div>

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-prima-sand
                pb-5
              "
            >

              <div>

                <p className="font-medium text-prima-text">
                  Maintenance Sistem
                </p>

                <p className="text-sm text-prima-muted mt-1">
                  20 menit yang lalu
                </p>

              </div>

              <Badge variant="warning">
                Pending
              </Badge>

            </div>

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p className="font-medium text-prima-text">
                  Backup Database
                </p>

                <p className="text-sm text-prima-muted mt-1">
                  1 jam yang lalu
                </p>

              </div>

              <Badge variant="info">
                Running
              </Badge>

            </div>

          </div>

        </Card>

        {/* SYSTEM STATUS */}
        <Card>

          <div className="flex items-center justify-between">

            <h2
              className="
                text-2xl
                font-semibold
                text-prima-text
              "
            >
              System Status
            </h2>

            <Badge variant="success">
              Online
            </Badge>

          </div>

          <div className="space-y-6 mt-8">

            <div className="flex items-center justify-between">

              <p className="text-prima-text">
                Server Status
              </p>

              <Badge variant="success">
                Connected
              </Badge>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-prima-text">
                Database
              </p>

              <Badge variant="success">
                Active
              </Badge>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-prima-text">
                API Service
              </p>

              <Badge variant="warning">
                Delayed
              </Badge>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-prima-text">
                Backup Service
              </p>

              <Badge variant="info">
                Scheduled
              </Badge>

            </div>

          </div>

        </Card>

      </div>

      {/* TABLE */}
      <Card>

        <div className="flex items-center justify-between">

          <h2
            className="
              text-2xl
              font-semibold
              text-prima-text
            "
          >
            Data Pengguna
          </h2>

          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Tambah User
          </Button>

        </div>

        <div className="mt-8">

          <Table>

            <thead>

              <tr className="border-b border-prima-sand">

                <th className="text-left py-4 text-prima-muted">
                  Nama
                </th>

                <th className="text-left py-4 text-prima-muted">
                  Role
                </th>

                <th className="text-left py-4 text-prima-muted">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b border-prima-sand">

                <td className="py-5 text-prima-text">
                  izzul
                </td>

                <td className="py-5">

                  <Badge variant="info">
                    Admin
                  </Badge>

                </td>

                <td className="py-5">

                  <Badge variant="success">
                    Active
                  </Badge>

                </td>

              </tr>

              <tr className="border-b border-prima-sand">

                <td className="py-5 text-prima-text">
                  dr. Prima
                </td>

                <td className="py-5">

                  <Badge variant="warning">
                    Dokter
                  </Badge>

                </td>

                <td className="py-5">

                  <Badge variant="success">
                    Active
                  </Badge>

                </td>

              </tr>

              <tr>

                <td className="py-5 text-prima-text">
                  pasien01
                </td>

                <td className="py-5">

                  <Badge variant="secondary">
                    Pasien
                  </Badge>

                </td>

                <td className="py-5">

                  <Badge variant="danger">
                    Offline
                  </Badge>

                </td>

              </tr>

            </tbody>

          </Table>

        </div>

      </Card>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Data"
      >

<Input placeholder="Nama User" />

<Input
  placeholder="Email"
  className="mt-4"
/>

<Input
  placeholder="Role"
  className="mt-4"
/>

<Button
  className="mt-4"
  variant="primary"
>
  Simpan
</Button>

      </Modal>

    </div>
  )
}

export default DashboardPage