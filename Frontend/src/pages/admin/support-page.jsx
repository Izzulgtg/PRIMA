import Card from "../../components/ui/card"
import Badge from "../../components/ui/badge"
import Table from "../../components/ui/table"
import Button from "../../components/ui/button"

function SupportPage() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-4">

            <h1
              className="
                text-5xl
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

          <Button variant="primary">
            Refresh System
          </Button>

        </div>

      </div>

      {/* TABS */}
      <div className="flex gap-8 border-b border-prima-sand pb-5">

        <button className="text-prima-green font-semibold">
          Troubleshoot
        </button>

        <button className="text-prima-muted">
          Penanganan Error
        </button>

        <button className="text-prima-muted">
          Reset Password User
        </button>

      </div>

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
        <div className="grid grid-cols-3 gap-6 mt-8">

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
                text-5xl
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
                text-5xl
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
                text-5xl
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
                text-5xl
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
                text-5xl
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
                text-5xl
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

        <div className="grid grid-cols-4 gap-6 mt-10">

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

              </tr>

            </tbody>

          </Table>

        </div>

      </Card>

    </div>
  )
}

export default SupportPage