import Card from "../../components/ui/card"
import Badge from "../../components/ui/badge"
import Table from "../../components/ui/table"
import Button from "../../components/ui/button"

function DataManagerPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold text-prima-text">
        Data Manager
      </h1>

      <p className="text-prima-muted mt-2">
        Monitoring data, backup, dan validasi integritas sistem PRIMA.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-10">

  <Card>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-prima-muted text-sm">
          Total Records
        </p>

        <h2 className="text-3xl font-bold text-prima-text mt-2">
          12.540
        </h2>

      </div>

      <Badge variant="info">
        Synced
      </Badge>

    </div>

  </Card>

  <Card>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-prima-muted text-sm">
          Backup Status
        </p>

        <h2 className="text-3xl font-bold text-prima-text mt-2">
          Active
        </h2>

      </div>

      <Badge variant="success">
        Safe
      </Badge>

    </div>

  </Card>

  <Card>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-prima-muted text-sm">
          Validation Errors
        </p>

        <h2 className="text-3xl font-bold text-prima-text mt-2">
          3
        </h2>

      </div>

      <Badge variant="warning">
        Review
      </Badge>

    </div>

  </Card>

</div>

<div className="grid grid-cols-2 gap-6 mt-10">

  <Card>

    <h2 className="text-xl font-semibold text-prima-text">
      Backup System
    </h2>

    <p className="text-prima-muted mt-2">
      Kelola backup data sistem PRIMA.
    </p>

    <div className="flex gap-4 mt-8">

      <Button variant="primary">
        Backup Data
      </Button>

      <Button variant="outline">
        Restore
      </Button>

    </div>

  </Card>

  <Card>

    <h2 className="text-xl font-semibold text-prima-text">
      Data Validation
    </h2>

    <p className="text-prima-muted mt-2">
      Validasi integritas dan konsistensi data sistem.
    </p>

    <div className="mt-8 space-y-5">

      <div className="flex items-center justify-between">

        <p className="text-prima-text">
          Patient Records
        </p>

        <Badge variant="success">
          Valid
        </Badge>

      </div>

      <div className="flex items-center justify-between">

        <p className="text-prima-text">
          Consultation Logs
        </p>

        <Badge variant="success">
          Valid
        </Badge>

      </div>

      <div className="flex items-center justify-between">

        <p className="text-prima-text">
          Backup Integrity
        </p>

        <Badge variant="warning">
          Review
        </Badge>

      </div>

    </div>

  </Card>

</div>

<div className="mt-10">

  <Card>

    <div className="flex items-center justify-between">

      <h2 className="text-xl font-semibold text-prima-text">
        Audit Logs
      </h2>

      <Button variant="primary">
        Export Logs
      </Button>

    </div>

    <div className="mt-8">

      <Table>

        <thead>

          <tr className="border-b border-prima-sand">

            <th className="text-left py-4 text-prima-muted">
              Activity
            </th>

            <th className="text-left py-4 text-prima-muted">
              User
            </th>

            <th className="text-left py-4 text-prima-muted">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-b border-prima-sand">

            <td className="py-5 text-prima-text">
              Database Backup
            </td>

            <td className="py-5 text-prima-text">
              System Admin
            </td>

            <td className="py-5">

              <Badge variant="success">
                Completed
              </Badge>

            </td>

          </tr>

          <tr className="border-b border-prima-sand">

            <td className="py-5 text-prima-text">
              Data Validation
            </td>

            <td className="py-5 text-prima-text">
              Admin PRIMA
            </td>

            <td className="py-5">

              <Badge variant="warning">
                Review
              </Badge>

            </td>

          </tr>

          <tr>

            <td className="py-5 text-prima-text">
              Restore Backup
            </td>

            <td className="py-5 text-prima-text">
              System Service
            </td>

            <td className="py-5">

              <Badge variant="info">
                Running
              </Badge>

            </td>

          </tr>

        </tbody>

      </Table>

    </div>

  </Card>

</div>

    </div>
  )
}

export default DataManagerPage