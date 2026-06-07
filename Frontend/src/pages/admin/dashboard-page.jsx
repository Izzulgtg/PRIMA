

import { useEffect, useState } from "react";

import Input from "../../components/ui/input"
import Button from "../../components/ui/button"
import Card from "../../components/ui/card"
import Badge from "../../components/ui/badge"
import Modal from "../../components/ui/modal"
import Table from "../../components/ui/table"
import api from "../../services/api";
import { Stethoscope } from "lucide-react"
import { Wrench } from "lucide-react"
import {
  Users,
  Activity,
  ShieldCheck
} from "lucide-react"
function DashboardPage() {

  const [users, setUsers] = useState([]);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stats, setStats] = useState({
  totalPasien: 0,
  totalKonsultasi: 0,
}); 
useEffect(() => {
  fetchStats();
  fetchUsers();
}, []);

const fetchStats = async () => {

  try {

    const response =
      await api.get(
        "/admin/dashboard-stats"
      );

    setStats(response.data);

  } catch (error) {

    console.error(error);

  }

};

  const fetchUsers = async () => {

  try {

    const response =
      await api.get(
        "/admin/users"
      );

    setUsers(
      response.data.data
    );

  } catch (error) {

    console.error(error);

  }

};

  const handleCreateUser = async () => {

  try {

    await api.post(
      "/admin/users",
      {
        nama_lengkap: nama,
        email,
        password,
        role,
      }
    );

    alert("User berhasil dibuat");

    setNama("");
    setEmail("");
    setPassword("");
    setRole("");

    setIsModalOpen(false);

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Gagal membuat user"
    );

  }

};

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
  <div className="flex justify-between items-start">

    <div>
      <p className="text-prima-muted">
        Total Pasien  
      </p>

      <h2 className="text-6xl font-bold mt-4">
        {stats.totalPasien}
      </h2>

      <p className="text-prima-green mt-4">
        +12% bulan ini
      </p>
    </div>

    <div className="w-20 h-20 rounded-3xl bg-[#DDE8D7] flex items-center justify-center">
      <Users
        size={36}
        className="text-prima-green"
      />
    </div>

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
                {stats.totalKonsultasi}
              </h2>

              <p className="text-prima-teal mt-4 text-sm">
                +8% hari ini
              </p>

            </div>

<div
  className="
    w-20
    h-20
    rounded-3xl
    bg-[#DCE9EE]
    flex
    items-center
    justify-center
  "
>
<Stethoscope
  size={36}
  className="text-[#4B8196]"
/>
</div>

</div> {/* tutup flex */}

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
    w-20
    h-20
    rounded-3xl
    bg-[#F3DDD4]
    flex
    items-center
    justify-center
  "
>
  <Wrench
    size={36}
    className="text-[#C4846A]"
  />
</div>

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

  {users.map((user) => (

    <tr
      key={user.id}
      className="border-b border-prima-sand"
    >

      <td className="py-5 text-prima-text">
        {user.nama_lengkap}
      </td>

      <td className="py-5">

        <Badge
          variant={
            user.role === "admin"
              ? "info"
              : user.role === "dokter"
              ? "warning"
              : "secondary"
          }
        >
          {user.role}
        </Badge>

      </td>

      <td className="py-5">

        <Badge
          variant={
            user.is_active
              ? "success"
              : "danger"
          }
        >
          {user.is_active
            ? "Active"
            : "Inactive"}
        </Badge>

      </td>

    </tr>

  ))}

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

<Input
  placeholder="Nama User"
  value={nama}
  onChange={(e) =>
    setNama(e.target.value)
  }
/>

<Input
  placeholder="Email"
  className="mt-4"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
/>

<select
  value={role}
  onChange={(e) =>
    setRole(e.target.value)
  }
  className="
    w-full
    mt-4
    px-4
    py-3
    rounded-2xl
    border
    border-prima-sand
    bg-white
  "
>
  <option value="">Pilih Role</option>
  <option value="admin">Admin</option>
  <option value="pasien">Pasien</option>
</select>

<Input
  type="password"
  placeholder="Password"
  className="mt-4"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
/>

<Button
  className="mt-4"
  variant="primary"
  onClick={handleCreateUser}
>
  Simpan
</Button>

      </Modal>

    </div>
  )
}

export default DashboardPage