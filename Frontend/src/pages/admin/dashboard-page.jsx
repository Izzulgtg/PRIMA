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
    <div>

      <h1 className="text-3xl font-bold text-prima-text">
        Dashboard Admin
      </h1>

      <div className="mt-4">
        <Badge variant="success">
          System Active
        </Badge>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-6">

        <Button variant="primary">
          Simpan
        </Button>

        <Button variant="secondary">
          Edit
        </Button>

        <Button variant="danger">
          Hapus
        </Button>

        <Button variant="outline">
          Detail
        </Button>

      </div>

      {/* SEARCH */}
      <div className="mt-6 max-w-md">

        <Input
          placeholder="Cari data pasien..."
        />

      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-3 gap-6 mt-8">

        <Card>

          <h2 className="text-prima-muted text-sm">
            Total Pasien
          </h2>

          <p className="text-3xl font-bold text-prima-text mt-2">
            120
          </p>

        </Card>

        <Card>

          <h2 className="text-prima-muted text-sm">
            Konsultasi Hari Ini
          </h2>

          <p className="text-3xl font-bold text-prima-text mt-2">
            34
          </p>

        </Card>

        <Card>

          <h2 className="text-prima-muted text-sm">
            Maintenance Aktif
          </h2>

          <p className="text-3xl font-bold text-prima-text mt-2">
            2
          </p>

        </Card>

      </div>

      {/* MODAL BUTTON */}
      <div className="mt-8">

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Open Modal
        </Button>

      </div>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Data"
      >

        <p className="text-prima-muted">
          Ini isi modal PRIMA.
        </p>

      </Modal>

      {/* ADVANCED DASHBOARD */}
      <div className="grid grid-cols-2 gap-6 mt-10">

        {/* RECENT ACTIVITY */}
        <Card>

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-semibold text-prima-text">
              Recent Activity
            </h2>

            <Badge variant="info">
              Live
            </Badge>

          </div>

          <div className="mt-6 space-y-5">

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-prima-sand
                pb-4
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
                pb-4
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

          <h2 className="text-xl font-semibold text-prima-text">
            System Status
          </h2>

          <div className="mt-8 space-y-6">

            <div className="flex items-center justify-between">

              <p className="text-prima-text font-medium">
                Server Status
              </p>

              <Badge variant="success">
                Online
              </Badge>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-prima-text font-medium">
                Database
              </p>

              <Badge variant="success">
                Connected
              </Badge>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-prima-text font-medium">
                API Service
              </p>

              <Badge variant="warning">
                Delayed
              </Badge>

            </div>

            <div className="flex items-center justify-between">

              <p className="text-prima-text font-medium">
                Backup Service
              </p>

              <Badge variant="info">
                Scheduled
              </Badge>

            </div>

            <div className="mt-10">

  <Card>

    <div className="flex items-center justify-between">

      <h2 className="text-xl font-semibold text-prima-text">
        Data Pengguna
      </h2>

      <Button variant="primary">
        Tambah User
      </Button>

    </div>

    <div className="mt-8">

      <Table>

        <thead>

          <tr className="border-b border-prima-sand">

            <th className="text-left py-4 text-prima-muted font-medium">
              Nama
            </th>

            <th className="text-left py-4 text-prima-muted font-medium">
              Role
            </th>

            <th className="text-left py-4 text-prima-muted font-medium">
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
              izzul (2)
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
              izzul (3)
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

</div>

          </div>

        </Card>

      </div>

    </div>
  )
}

export default DashboardPage