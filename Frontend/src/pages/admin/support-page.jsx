  import Card from "../../components/ui/card"
  import Badge from "../../components/ui/badge"
  import Table from "../../components/ui/table"
  import Button from "../../components/ui/button"
  import { useState } from "react"  
  import {
  Database,
  Globe,
  Folder,
  UserCog
} from "lucide-react"

  function SupportPage() {
    const [activeTab, setActiveTab] =
    useState("troubleshoot")
    return (
      <div className="space-y-10">

        {/* HEADER */}
        <div className="flex items-start justify-between">

          <div>

            <div className="flex items-center gap-4">

              <h1
                className="
                  text-5xl font-bold
                  font-bold
                  text-prima-text
                "
              >
                System Support
              </h1>

              <Badge variant="danger">
                Error Baru 3
              </Badge>

            </div>

            <p
              className="
                text-prima-muted
                mt-4
                text-lg
              "
            >
              Monitoring error sistem,
              API, database,
              dan penanganan support PRIMA.
            </p>

          </div>

          <div className="flex items-center gap-4">

            <Badge variant="success">
              Updated 1 minute ago
            </Badge>

          </div>

        </div>

        {/* TABS */}
        {/* TABS */}
<div className="flex gap-8 border-b border-prima-sand pb-5">

  <button
    onClick={() => setActiveTab("troubleshoot")}
    className={
      activeTab === "troubleshoot"
        ? "text-prima-green font-semibold border-b-2 border-prima-green pb-3"
        : "text-prima-muted pb-3"
    }
  >
    Troubleshoot
  </button>

  <button
    onClick={() => setActiveTab("error")}
    className={
      activeTab === "error"
        ? "text-prima-green font-semibold border-b-2 border-prima-green pb-3"
        : "text-prima-muted pb-3"
    }
  >
    Penanganan Error
  </button>

  <button
    onClick={() => setActiveTab("reset")}
    className={
      activeTab === "reset"
        ? "text-prima-green font-semibold border-b-2 border-prima-green pb-3"
        : "text-prima-muted pb-3"
    }
  >
    Reset Password User
  </button>

</div>

{activeTab === "troubleshoot" && (
  <>
        {/* HEALTH DASHBOARD */}
        <div>

          <div className="flex items-center justify-between">

            <h2
              className="
                text-3xl
                font-bold
                text-prima-text
              "
            >
              System Health Dashboard
            </h2>

            <p className="text-prima-muted">
              Updated 1 minute ago
            </p>

          </div>

          {/* HEALTH CARDS */}
          <div className="grid grid-cols-3 gap-6 mt-4">

            {/* CARD */}
            <Card>

              <div className="flex items-center justify-between">

                <p className="text-prima-muted">
                  API Response
                </p>

                <Badge variant="success">
                  Optimal
                </Badge>

              </div>

              <h2
                className="
                  text-3xl
                  font-bold
                  text-prima-text
                  mt-6
                "
              >
                124ms
              </h2>

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-[#E5DED2]
                  mt-8
                "
              >

                <div
                  className="
                    w-[82%]
                    h-full
                    rounded-full
                    bg-prima-green
                  "
                />

              </div>

            </Card>

            {/* CARD */}
            <Card>

              <div className="flex items-center justify-between">

                <p className="text-prima-muted">
                  Memory Usage
                </p>

                <Badge variant="info">
                  Stable
                </Badge>

              </div>

              <h2
                className="
                  text-4xl
                  font-bold
                  text-prima-text
                  mt-6
                "
              >
                4.2GB
              </h2>

              <p className="text-prima-muted mt-2">
                / 8GB
              </p>

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-[#E5DED2]
                  mt-8
                "
              >

                <div
                  className="
                    w-[52%]
                    h-full
                    rounded-full
                    bg-[#4B8196]
                  "
                />

              </div>

            </Card>

            {/* CARD */}
            <Card>

              <div className="flex items-center justify-between">

                <p className="text-prima-muted">
                  CPU Load
                </p>

                <Badge variant="warning">
                  Moderate
                </Badge>

              </div>

              <h2
                className="
                  text-4xl
                  font-bold
                  text-prima-text
                  mt-6
                "
              >
                68%
              </h2>

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-[#E5DED2]
                  mt-8
                "
              >

                <div
                  className="
                    w-[68%]
                    h-full
                    rounded-full
                    bg-[#D6A319]
                  "
                />

              </div>

            </Card>

            {/* CARD */}
            <Card>

              <div className="flex items-center justify-between">

                <p className="text-prima-muted">
                  Active DB Queries
                </p>

                <Badge variant="success">
                  Optimal
                </Badge>

              </div>

              <h2
                className="
                  text-4xl
                  font-bold
                  text-prima-text
                  mt-6
                "
              >
                12
              </h2>

              <p className="text-prima-muted mt-2">
                queries/s
              </p>

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-[#E5DED2]
                  mt-8
                "
              >

                <div
                  className="
                    w-[30%]
                    h-full
                    rounded-full
                    bg-prima-green
                  "
                />

              </div>

            </Card>

            {/* CARD */}
            <Card>

              <div className="flex items-center justify-between">

                <p className="text-prima-muted">
                  Active Sessions
                </p>

                <Badge variant="info">
                  Normal
                </Badge>

              </div>

              <h2
                className="
                  text-4xl
                  font-bold
                  text-prima-text
                  mt-6
                "
              >
                1,204
              </h2>

              <p className="text-prima-muted mt-2">
                users
              </p>

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-[#E5DED2]
                  mt-8
                "
              >

                <div
                  className="
                    w-[60%]
                    h-full
                    rounded-full
                    bg-[#4B8196]
                  "
                />

              </div>

            </Card>

            {/* CARD */}
            <Card>

              <div className="flex items-center justify-between">

                <p className="text-prima-muted">
                  Error Rate (24h)
                </p>

                <Badge variant="danger">
                  Critical
                </Badge>

              </div>

              <h2
                className="
                  text-4xl
                  font-bold
                  text-prima-text
                  mt-6
                "
              >
                2.4%
              </h2>

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-[#E5DED2]
                  mt-8
                "
              >

                <div
                  className="
                    w-[24%]
                    h-full
                    rounded-full
                    bg-[#D9534F]
                  "
                />

              </div>

            </Card>

          </div>

        </div>

        {/* QUICK DIAGNOSTIC */}
        <Card>

          <h2
            className="
              text-3xl
              font-bold
              text-prima-text
            "
          >
            Quick Diagnostic Tools
          </h2>

          <p className="text-prima-muted mt-2">
            Klik untuk menjalankan pengecekan sistem secara instan.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-10">

            <div
              className="
                rounded-3xl
                border
                border-prima-sand
                p-8
                text-center
              "
            >

              <h3 className="font-semibold text-prima-text">
                DB Connection
              </h3>

              <p className="text-prima-green mt-4 text-sm">
                SUCCESS
              </p>

            </div>

            <div
              className="
                rounded-3xl
                border
                border-prima-sand
                p-8
                text-center
              "
            >

              <h3 className="font-semibold text-prima-text">
                API Endpoint
              </h3>

              <p className="text-prima-green mt-4 text-sm">
                SUCCESS
              </p>

            </div>

            <div
              className="
                rounded-3xl
                border
                border-red-300
                p-8
                text-center
              "
            >

              <h3 className="font-semibold text-prima-text">
                File Storage
              </h3>

              <p className="text-red-500 mt-4 text-sm">
                FAILED
              </p>

            </div>

            <div
              className="
                rounded-3xl
                border
                border-prima-sand
                p-8
                text-center
              "
            >

              <h3 className="font-semibold text-prima-text">
                Session System
              </h3>

              <p className="text-prima-green mt-4 text-sm">
                SUCCESS
              </p>

            </div>

          </div>

        </Card>

        {/* ERROR LOGS */}
        <Card>

          <div className="flex items-center justify-between">

            <h2
              className="
                text-3xl
                font-bold
                text-prima-text
              "
            >
              Recent Error Logs
            </h2>

            <Button variant="outline">
              View Full Logs
            </Button>

          </div>

          <div className="mt-8">

            <Table>

               <thead>

  <tr className="border-b border-prima-sand">

    <th className="text-left py-4 text-prima-muted">
      Timestamp
    </th>

    <th className="text-left py-4 text-prima-muted">
      Type
    </th>

    <th className="text-left py-4 text-prima-muted">
      Message
    </th>

    <th className="text-left py-4 text-prima-muted">
      Severity
    </th>

    <th className="text-left py-4 text-prima-muted">
      Action
    </th>

  </tr>

</thead>

              <tbody>

                <tr className="border-b border-prima-sand">

                  <td className="py-5 text-prima-text">
                    2026-05-24
                  </td>

                  <td className="py-5 text-[#4B8196]">
                    FileSystemException
                  </td>

                  <td className="py-5 text-prima-text">
                    Unable to write uploads.
                  </td>

                  <td className="py-5">

                    <Badge variant="danger">
                      Critical
                    </Badge>

                  </td>
                  <td className="py-5">

<Button
  variant="outline"
  onClick={() =>
    alert("Detail log ditampilkan")
  }
>
  View
</Button>

</td>

                </tr>

                <tr className="border-b border-prima-sand">

                  <td className="py-5 text-prima-text">
                    2026-05-24
                  </td>

                  <td className="py-5 text-[#4B8196]">
                    AuthTimeout
                  </td>

                  <td className="py-5 text-prima-text">
                    User session expired unexpectedly.
                  </td>

                  <td className="py-5">

                    <Badge variant="warning">
                      Medium
                    </Badge>

                  </td>

                  <td className="py-5">

  <Button variant="outline">
    View
  </Button>

</td>

                </tr>

                <tr>

                  <td className="py-5 text-prima-text">
                    2026-05-24
                  </td>

                  <td className="py-5 text-[#4B8196]">
                    DatabaseDeadlock
                  </td>

                  <td className="py-5 text-prima-text">
                    Deadlock detected during update.
                  </td>

                  <td className="py-5">

                    <Badge variant="danger">
                      High
                    </Badge>

                  </td>
                  <td className="py-5">

  <Button variant="outline">
    View
  </Button>

</td>

                </tr>

              </tbody>

            </Table>

          </div>

        </Card>
  </>
)}
{activeTab === "error" && (

  <div className="space-y-6">

    {/* ALERT */}
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5">

      <div className="flex items-center justify-between">

        <div>

          <h3 className="font-bold text-red-600 text-lg">
            2 Error Kritis Belum Ditangani
          </h3>

          <p className="text-prima-muted mt-1">
            Segera periksa sistem untuk mencegah gangguan layanan pasien.
          </p>

        </div>

        <Button
          variant="primary"
          onClick={() =>
            alert("Error berhasil ditangani")
          }
        >
          Tangani Sekarang
        </Button>

      </div>

    </div>

    {/* STATS */}
    <div className="grid grid-cols-3 gap-6">

      <Card>

        <p className="text-prima-muted">
          Total Error Hari Ini
        </p>

        <h2 className="text-4xl font-bold mt-3">
          12
        </h2>

      </Card>

      <Card>

        <p className="text-prima-muted">
          Sudah Ditangani
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-3">
          10
        </h2>

      </Card>

      <Card>

        <p className="text-prima-muted">
          Belum Ditangani
        </p>

        <h2 className="text-4xl font-bold text-red-600 mt-3">
          2
        </h2>

      </Card>

    </div>

    {/* ERROR CARD */}
    <Card>

      <div className="flex items-start justify-between">

        <div>

          <Badge variant="danger">
            CRITICAL
          </Badge>

          <h3 className="text-2xl font-bold mt-4">
            Database Connection Failed
          </h3>

          <p className="text-prima-muted mt-2">
            SQLSTATE[HY000] Connection refused
          </p>

        </div>

        <p className="text-prima-muted">
          2 menit lalu
        </p>

      </div>

      <div className="flex gap-4 mt-8">

        <Button variant="primary">
          Tandai Ditangani
        </Button>

        <Button variant="outline">
          Abaikan
        </Button>

      </div>

    </Card>

    {/* WARNING CARD */}
    <Card>

      <div className="flex items-center justify-between">

        <div>

          <Badge variant="warning">
            WARNING
          </Badge>

          <h3 className="text-xl font-semibold mt-3">
            API Latency Tinggi
          </h3>

          <p className="text-prima-muted mt-2">
            Response API melebihi batas normal.
          </p>

        </div>

        <p className="text-prima-muted">
          15 menit lalu
        </p>

      </div>

    </Card>

  </div>

)}
{activeTab === "reset" && (

  <Card>

    <div className="space-y-6">

      <h2 className="text-3xl font-bold text-prima-text">
        Reset Password User
      </h2>

      <Table>

        <thead>

          <tr>

            <th className="text-left py-4">
              Nama
            </th>

            <th className="text-left py-4">
              Role
            </th>

            <th className="text-left py-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td className="py-4">
              Dr. Aris Setiawan
            </td>

            <td className="py-4">
              Dokter
            </td>

            <td className="py-4">

              <Button
                variant="outline"
                onClick={() =>
                  alert("Password berhasil direset")
                }
              >
                Reset Password
              </Button>

            </td>

          </tr>

          <tr>

            <td className="py-4">
              Budi Santoso
            </td>

            <td className="py-4">
              Pasien
            </td>

            <td className="py-4">

              <Button
                variant="outline"
              >
                Reset Password
              </Button>

            </td>

          </tr>

        </tbody>

      </Table>

    </div>

  </Card>

)}
      </div>
    )
  }

  export default SupportPage