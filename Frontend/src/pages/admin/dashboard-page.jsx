import { useState } from "react"
import Input from "../../components/ui/input"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Badge from "../../components/ui/badge"
import Modal from "../../components/ui/modal"

function DashboardPage() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>

      <h1 className="text-3xl font-bold text-[#1E1E1E]">
        Dashboard Admin
      </h1>

      <div className="mt-4">
        <Badge variant="success">
          System Active
        </Badge>
      </div>

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

      <div className="grid grid-cols-3 gap-6 mt-8">

        <Card>
          <h2 className="text-[#6B7280] text-sm">
            Total Pasien
          </h2>

          <p className="text-3xl font-bold text-[#1E1E1E] mt-2">
            120
          </p>
        </Card>

        <Card>
          <h2 className="text-[#6B7280] text-sm">
            Konsultasi Hari Ini
          </h2>

          <p className="text-3xl font-bold text-[#1E1E1E] mt-2">
            34
          </p>
        </Card>

        <Card>
          <h2 className="text-[#6B7280] text-sm">
            Maintenance Aktif
          </h2>

          <p className="text-3xl font-bold text-[#1E1E1E] mt-2">
            2
          </p>
        </Card>

      </div>

      <div className="mt-8">

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Open Modal
        </Button>

      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tambah Data"
      >

        <p className="text-[#6B7280]">
          Ini isi modal PRIMA.
        </p>

      </Modal>
    <div className="mt-6 max-w-md">
    <Input
        placeholder="Cari data pasien..."
    />
    </div>
    </div>
  )
}

export default DashboardPage